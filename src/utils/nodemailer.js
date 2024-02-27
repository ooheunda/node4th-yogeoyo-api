import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.SMTP_ID,
    pass: process.env.SMTP_PW,
  },
});

export const sendMail = async (userEmail, emailToken) => {
  const mailOptions = {
    from: "yogeoyo@gmail.com",
    to: userEmail,
    subject: "요거요 회원 가입 인증을 해주세요.",
    html: `<h1>🎉 환영합니다! 🎉</h1> <p>어서 메일 인증을 진행해주세요. 링크는 12시간 뒤 만료됩니다.</p> 👉 <a href="${process.env.HOST + "/auth/verify-email/" + emailToken}">인증하러 가기</a> 👈`,
  };

  await transporter.sendMail(mailOptions);
};
