require("dotenv").config();   //  sabse upar
// console.log("Brevo API Key:", process.env.BREVO_API_KEY); // Test line to check if env variable is loaded
const express = require("express");
const axios = require("axios");


const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { msg: null });
});

app.post("/send", async (req, res) => {
  const { email } = req.body;

  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Email Test App",
          email: process.env.SENDER_EMAIL
        },
        to: [{ email: process.env.SENDER_EMAIL }],
        subject: "Brevo API Test Email ",
        htmlContent: `
          <h3>Hello Bhai </h3>
          <p>Email Brevo API se successfully aa gaya  email ${email}</p>
        `
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.render("index", { msg: " Email sent successfully" });
  } catch (err) {
    console.log(err.response?.data || err.message);
    res.render("index", { msg: " Email failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});












