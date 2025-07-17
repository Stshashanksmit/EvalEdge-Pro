const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Security middleware
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 500 requests per window
  standardHeaders: true,
  legacyHeaders: false
}));

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100kb' }));

// =================== Middleware ===================

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).send({ error: "Forbidden" });
  }
  next();
};

// =================== User Auth ===================

app.post("/api/register", async (req, res) => {
  const { name, email, password, organizationName } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ error: "User already exists" });
    }

    let organization = await prisma.organization.findUnique({
      where: { name: organizationName },
    });

    if (!organization) {
      organization = await prisma.organization.create({
        data: { name: organizationName, revenue: 0, headcount: 0, geographies: 0, industry: 'Not Specified' },
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "owner", // First user is owner
        isActive: true, // Auto-approved for simplicity
        organizationId: organization.id,
      },
    });

    res.status(201).send({ message: "Registration successful." });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Registration failed" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).send({ error: "User not found" });
    if (!user.isActive) return res.status(403).send({ error: "Access not approved yet" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).send({ error: "Invalid password" });

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role, 
        organizationId: user.organizationId,
        iss: 'evaledge-server',
        aud: 'evaledge-client'
      },
      SECRET_KEY,
      { 
        expiresIn: "15m",
        algorithm: "HS256"
      }
    );
    
    // Set secure, HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });
    res.send({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Login failed" });
  }
});

// =================== Admin Routes ===================

app.get("/api/users", authenticateToken, authorizeRole(["owner", "admin"]), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { organizationId: req.user.organizationId },
      select: { id: true, name: true, email: true, role: true, isActive: true },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.put("/api/users/:id", authenticateToken, authorizeRole(["owner", "admin"]), async (req, res) => {
  const { id } = req.params;
  const { role, isActive } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { role, isActive },
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});


// =================== Organization Routes ===================

const calculateOrgScore = (revenue, headcount, geographies) => {
  let revenuePoints = 0;
  if (revenue < 5) revenuePoints = 1;
  else if (revenue <= 25) revenuePoints = 2;
  else if (revenue <= 250) revenuePoints = 3;
  else if (revenue <= 1000) revenuePoints = 4;
  else if (revenue <= 5000) revenuePoints = 5;
  else revenuePoints = 6;

  let headcountPoints = 0;
  if (headcount < 50) headcountPoints = 1;
  else if (headcount <= 249) headcountPoints = 2;
  else if (headcount <= 999) headcountPoints = 3;
  else if (headcount <= 4999) headcountPoints = 4;
  else if (headcount <= 19999) headcountPoints = 5;
  else headcountPoints = 6;

  let geoPoints = 0;
  if (geographies === 1) geoPoints = 1;
  else if (geographies <= 3) geoPoints = 2;
  else if (geographies <= 5) geoPoints = 3;
  else if (geographies <= 10) geoPoints = 4;
  else if (geographies <= 15) geoPoints = 5;
  else geoPoints = 6;

  return revenuePoints + headcountPoints + geoPoints;
};

const getOrgTag = (score) => {
  if (score <= 4) return "Lean Local";
  if (score <= 6) return "Stable National";
  if (score <= 9) return "Expanding Enterprise";
  if (score <= 12) return "Global Player";
  return "Complex Conglomerate";
};

app.post("/api/organizations", authenticateToken, authorizeRole(["owner", "admin"]), async (req, res) => {
  const { name, revenue, headcount, geographies, industry } = req.body;
  const score = calculateOrgScore(revenue, headcount, geographies);
  const tag = getOrgTag(score);

  try {
    const org = await prisma.organization.upsert({
      where: { id: req.user.organizationId },
      update: { revenue, headcount, geographies, industry, score, tag },
      create: { name, revenue, headcount, geographies, industry, score, tag },
    });
    res.json(org);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving organization details" });
  }
});

app.get("/api/organizations/:id", authenticateToken, async (req, res) => {
  if (req.user.organizationId !== parseInt(req.params.id)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  try {
    const org = await prisma.organization.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!org) return res.status(404).json({ error: "Organization not found" });
    res.json(org);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch organization" });
  }
});

// =================== Position Routes ===================

const calculateEvalScore = (factors, orgScore) => {
  const weights = {
    factor1Score: 0.1, factor2Score: 0.1, factor3Score: 0.1,
    factor4Score: 0.1, factor5Score: 0.1, factor6Score: 0.1,
    factor7Score: 0.2, factor8Score: 0.1, factor9Score: 0.1,
  };
  const totalWeightedScore = Object.keys(weights).reduce((acc, key) => {
    return acc + (factors[key] || 0) * weights[key];
  }, 0);
  return totalWeightedScore * orgScore;
};

app.post("/api/positions", authenticateToken, authorizeRole(["owner", "admin", "editor"]), async (req, res) => {
  try {
    const { organizationId } = req.user;
    const organization = await prisma.organization.findUnique({ where: { id: organizationId } });
    if (!organization) return res.status(404).json({ error: "Organization not found" });

    const evalScore = calculateEvalScore(req.body, organization.score);

    const positionData = { ...req.body, organizationId, evalScore };
    const newPosition = await prisma.position.create({ data: positionData });
    res.json(newPosition);
  } catch (err) {
    res.status(500).json({ error: "Failed to create position" });
  }
});

app.get("/api/positions", authenticateToken, async (req, res) => {
  try {
    const positions = await prisma.position.findMany({
      where: { organizationId: req.user.organizationId },
    });
    res.json(positions);
  } catch (err) {
    res.status(500).json({ error: "Failed to load positions" });
  }
});

app.put("/api/positions/:id", authenticateToken, authorizeRole(["owner", "admin", "editor"]), async (req, res) => {
  const { id } = req.params;
  try {
    const organization = await prisma.organization.findUnique({ where: { id: req.user.organizationId } });
    const evalScore = calculateEvalScore(req.body, organization.score);
    const updatedPosition = await prisma.position.update({
      where: { id: parseInt(id) },
      data: { ...req.body, evalScore },
    });
    res.json(updatedPosition);
  } catch (err) {
    res.status(500).json({ error: "Failed to update position" });
  }
});

app.delete("/api/positions/:id", authenticateToken, authorizeRole(["owner", "admin"]), async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.position.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete position" });
  }
});

// =================== Band Routes ===================

app.post("/api/bands", authenticateToken, authorizeRole(["owner", "admin"]), async (req, res) => {
  const { name, minScore, maxScore } = req.body;
  try {
    const newBand = await prisma.band.create({
      data: { name, minScore, maxScore, organizationId: req.user.organizationId },
    });
    res.json(newBand);
  } catch (err) {
    res.status(500).json({ error: "Failed to create band" });
  }
});

app.get("/api/bands", authenticateToken, async (req, res) => {
  try {
    const bands = await prisma.band.findMany({
      where: { organizationId: req.user.organizationId },
    });
    res.json(bands);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bands" });
  }
});

app.put("/api/bands/:id", authenticateToken, authorizeRole(["owner", "admin"]), async (req, res) => {
  const { id } = req.params;
  const { name, minScore, maxScore } = req.body;
  try {
    const updatedBand = await prisma.band.update({
      where: { id: parseInt(id) },
      data: { name, minScore, maxScore },
    });
    res.json(updatedBand);
  } catch (err) {
    res.status(500).json({ error: "Failed to update band" });
  }
});

app.delete("/api/bands/:id", authenticateToken, authorizeRole(["owner", "admin"]), async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.band.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete band" });
  }
});

// =================== Demo Request ===================

app.post("/api/demo-request", async (req, res) => {
  const { firstName, lastName, workEmail, companySize } = req.body;
  try {
    await prisma.demoRequest.create({
      data: { firstName, lastName, workEmail, companySize },
    });
    res.status(201).send({ message: "Demo request submitted successfully." });
  } catch (err) {
    res.status(500).send({ error: "Failed to submit demo request" });
  }
});

// =================== Server ===================

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
