require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Import FAQ model
const FAQ = require("./Faq");

// API Endpoint: Handle user questions
app.post("/ask", async (req, res) => {
  const { question } = req.body;

  // Find matching question in the database
  const faq = await FAQ.findOne({ question: { $regex: new RegExp(question, "i") } });

  if (faq) {
    res.json({ answer: faq.answer });
  } else {
    res.json({ answer: "Sorry, I don’t know the answer." });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
