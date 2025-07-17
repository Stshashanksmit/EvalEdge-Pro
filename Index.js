const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

// Register
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).send({ error: "User already exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { email, passwordHash, role: "user", isActive: false },
  });
  res.send({ message: "Registration successful. Await admin approval." });
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).send({ error: "User not found" });
  if (!user.isActive) return res.status(403).send({ error: "Access not approved yet" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).send({ error: "Invalid password" });

  const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
  res.send({ message: "Login successful", token });
});

// List all users
app.get("/api/users", async (req, res) => {
  const users = await prisma.user.findMany({ select: { email: true, isActive: true, role: true } });
  res.send(users);
});

// Approve user
app.post("/api/approve", async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).send({ error: "User not found" });

  await prisma.user.update({ where: { email }, data: { isActive: true } });
  res.send({ message: `User ${email} approved.` });
});

// Revoke user
app.post("/api/revoke", async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).send({ error: "User not found" });

  await prisma.user.update({ where: { email }, data: { isActive: false } });
  res.send({ message: `User ${email} access revoked.` });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));