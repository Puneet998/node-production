const e = require("express");
const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// home page
app.get("/", (req, res) => {
  res.render("index", { msg: null });
});

// form submit
app.post("/send", async (req, res) => {
  const { email } = req.body;

  try {
   const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "a0a39e001@smtp-brevo.com",
    pass: process.env.BREVO_SMTP_KEY
  }
});


    await transporter.sendMail({
      from: `"Test App" <${process.env.BREVO_EMAIL}>`,
        //   from: `"Test App" ${email}`,
      to: "puneetprajapati9937@gmail.com",
      subject: "Test Email ✅",
      html: `<p>Hello bhai! Nodemailer + Express + EJS working 🎉
             Email sent to ${email}</p>`
    });

    res.render("index", { msg: "✅ Email sent successfully" });

  } catch (error) {
    console.log(error);
    res.render("index", { msg: "❌ Email failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
