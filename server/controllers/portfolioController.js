

import nodemailer from 'nodemailer';

export const sendEmailController = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { name, email, msg } = req.body;

    if (!name || !email || !msg) {
      return res.status(400).send({
        success: false,
        message: "Var vänlig och fyll i alla fält",
      });
    }

    // Skapa en transportör med SMTP-uppgifter för Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Gmail som tjänst
      auth: {
        user: process.env.EMAIL_USER, // Din Gmail-adress, exempel: 'your-email@gmail.com'
        pass: process.env.EMAIL_PASS, // Ditt Gmail-lösenord eller en app-specifik lösenord
      },
      tls: {
        rejectUnauthorized: false, // Tillåter osäkra certifikat om du använder utvecklingsmiljö
      },
      debug: false, // Aktiverar felsökningsutdata
      logger: false, // Aktiverar loggutdata
    });

    const mailOptions = {
      from: `"${name}" <${email}>`, // Avsändare
      to: process.env.EMAIL_USER, // Mottagare, vilket är din Gmail-adress
      subject: "Angående Mern Portfolio App",
      html: `
        <h5>Detaljerad information</h5>
        <ul>
          <li><p>Namn: ${name}</p></li>
          <li><p>E-post: ${email}</p></li>
          <li><p>Meddelande: ${msg}</p></li>
        </ul>
      `,
    };

    // Skicka e-post
    await transporter.sendMail(mailOptions);

    return res.status(200).send({
      success: true,
      message: "Ditt meddelande har skickats framgångsrikt",
    });
  } catch (error) {
    console.log("Error sending email:", error);
    return res.status(500).send({
      success: false,
      message: "Fel vid att skicka e-post",
      error,
    });
  }
};
 

