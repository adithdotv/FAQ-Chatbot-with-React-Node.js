require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Fuse = require("fuse.js")

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

// Pre-load FAQs and create a fuzzy search index
let fuse;
const loadFAQs = async () => {
  const faqs = await FAQ.find();
  fuse = new Fuse(faqs, {
    keys: ["question"],
    includeScore: true,
    threshold: 0.7,
    distance: 50,
    minMatchCharLength: 3,
    ignoreLocation: true,
  });
};
loadFAQs(); // Load FAQs on startup

// API Endpoint: Handle user questions
app.post("/ask", async (req, res) => {
  const { question } = req.body;

  const result = fuse.search(question);
  console.log(result)
  if (result.length > 0){
    res.json({ answer: result[0].item.answer });
  } else {
    res.json({ answer: "Sorry, I don’t know the answer." });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
