require("dotenv").config();
const mongoose = require("mongoose");
const FAQ = require("./Faq");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Sample FAQs
const faqs = [
  { question: "What is your name?", answer: "I am an FAQ chatbot!" },
  { question: "How do I reset my password?", answer: "Go to the settings page and click 'Reset Password'." },
  { question: "What are your support hours?", answer: "Our support is available 24/7." }
];

// Insert into DB
FAQ.insertMany(faqs)
  .then(() => {
    console.log("FAQs added successfully");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
