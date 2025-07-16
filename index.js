const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

app.use(cors());
app.use(bodyParser.json());

/* ============== User Auth ============== */

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).send({ error: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: "user",
        isActive: false,
      },
    });
    res.send({ message: "Registration successful. Await admin approval." });
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

    const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    res.send({
      message: "Login successful",
      token,
      organizationId: user.organizationId || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Login failed" });
  }
});

/* ============== Admin ============== */

app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { email: true, isActive: true, role: true },
    });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to load users" });
  }
});

app.post("/api/admin/approve-user", async (req, res) => {
  const { email, action, organizationId } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).send({ error: "User not found" });

    const updateData = { isActive: action === "approve" };
    if (action === "approve" && organizationId) {
      updateData.organizationId = parseInt(organizationId);
    }

    await prisma.user.update({ where: { email }, data: updateData });
    res.send({ message: `User ${updateData.isActive ? "approved" : "revoked"}` });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Admin action failed" });
  }
});

/* ============== Organizations ============== */

app.post("/api/organizations", async (req, res) => {
  try {
    const existing = await prisma.organization.findUnique({ where: { name: req.body.name } });

    if (existing) {
      const updatedOrg = await prisma.organization.update({
        where: { name: req.body.name },
        data: {
          revenue: parseFloat(req.body.revenue),
          headcount: parseInt(req.body.headcount),
          geographies: parseInt(req.body.geographies),
          industry: req.body.industry,
          tag: req.body.tag,
          score: req.body.score ? parseInt(req.body.score) : null,
        },
      });
      return res.json(updatedOrg);
    } else {
      const newOrg = await prisma.organization.create({
        data: {
          name: req.body.name,
          revenue: parseFloat(req.body.revenue),
          headcount: parseInt(req.body.headcount),
          geographies: parseInt(req.body.geographies),
          industry: req.body.industry,
          tag: req.body.tag,
          score: req.body.score ? parseInt(req.body.score) : null,
        },
      });
      return res.json(newOrg);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating or updating organization" });
  }
});

app.get("/api/organizations/by-id/:id", async (req, res) => {
  try {
    const org = await prisma.organization.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!org) return res.status(404).json({ error: "Organization not found" });

    res.json(org);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch organization" });
  }
});


/* ============== Positions ============== */

app.post("/api/positions", async (req, res) => {
  try {
    const {
      positionId, title, department, team, reportingId, reportingTitle,
      currentBand, currentSalary, jdText, jdUpload,
      factor1Score, factor2Score, factor3Score, factor4Score, factor5Score,
      factor6Score, factor7Score, factor8Score, factor9Score,
      evalScore, organizationId,
    } = req.body;

    const newPosition = await prisma.position.create({
      data: {
        positionId,
        title,
        department,
        team,
        reportingId,
        reportingTitle,
        currentBand,
        currentSalary: currentSalary ? parseFloat(currentSalary) : null,
        jdText,
        jdUpload,
        factor1Score: factor1Score ? parseInt(factor1Score) : null,
        factor2Score: factor2Score ? parseInt(factor2Score) : null,
        factor3Score: factor3Score ? parseInt(factor3Score) : null,
        factor4Score: factor4Score ? parseInt(factor4Score) : null,
        factor5Score: factor5Score ? parseInt(factor5Score) : null,
        factor6Score: factor6Score ? parseInt(factor6Score) : null,
        factor7Score: factor7Score ? parseInt(factor7Score) : null,
        factor8Score: factor8Score ? parseInt(factor8Score) : null,
        factor9Score: factor9Score ? parseInt(factor9Score) : null,
        evalScore,
        organizationId: parseInt(organizationId),
      },
    });

    res.json(newPosition);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create position" });
  }
});

app.get("/api/positions/:orgId", async (req, res) => {
  try {
    const orgId = parseInt(req.params.orgId);
    const positions = await prisma.position.findMany({
      where: { organizationId: orgId },
    });
    res.json(positions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load positions" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
