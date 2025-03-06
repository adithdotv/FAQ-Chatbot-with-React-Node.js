require("dotenv").config();
const mongoose = require("mongoose");
const FAQ = require("./Faq");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Sample FAQs
const faqs = [
  // 🛠️ Account Management
  { question: "How do I reset my password?", answer: "Go to settings and click 'Reset Password'." },
  { question: "I forgot my password, how can I recover it?", answer: "Use the 'Forgot Password' option on the login page." },
  { question: "How do I change my email address?", answer: "Go to account settings and update your email under 'Personal Information'." },
  { question: "Can I delete my account?", answer: "Yes, go to settings and select 'Delete Account'. Note: This action is irreversible." },

  // 🚀 Troubleshooting & Technical Issues
  { question: "Why is my account locked?", answer: "Your account may be locked due to multiple failed login attempts. Try resetting your password." },
  { question: "I didn’t receive a verification email. What should I do?", answer: "Check your spam folder or request a new verification email from settings." },
  { question: "How do I update my profile picture?", answer: "Go to 'Profile Settings' and upload a new picture." },
  { question: "Why is my payment not going through?", answer: "Check if your card details are correct or contact your bank for more information." },

  // 🏢 General Information
  { question: "What are your support hours?", answer: "We are available 24/7 to assist you." },
  { question: "Do you offer refunds?", answer: "Yes, refunds are available within 14 days of purchase." },
  { question: "Where are you located?", answer: "Our headquarters are in San Francisco, but we operate globally." },
  { question: "How do I contact customer support?", answer: "You can reach us via email at support@example.com or call our 24/7 helpline." },

  // 💬 Chatbot & AI-related Questions
  { question: "Who are you?", answer: "I am a chatbot here to assist you with your queries." },
  { question: "What can you do?", answer: "I can answer FAQs, help with troubleshooting, and guide you through common tasks." },
  { question: "Are you a human?", answer: "No, I am an AI-powered chatbot designed to assist you." },
  { question: "Can you learn new things?", answer: "Currently, I rely on a predefined FAQ database, but I can improve over time with updates." },

  // 🌍 Miscellaneous
  { question: "Do you support multiple languages?", answer: "Currently, I support English, but we are working on adding more languages." },
  { question: "Is my data secure?", answer: "Yes, we use end-to-end encryption to ensure your data remains safe." },
  { question: "Do you have a mobile app?", answer: "Yes, our app is available on both iOS and Android platforms." },
  { question: "How do I report a bug?", answer: "You can report a bug through the 'Help & Support' section in your account." }
];


// Insert into DB
FAQ.insertMany(faqs)
  .then(() => {
    console.log("FAQs added successfully");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
