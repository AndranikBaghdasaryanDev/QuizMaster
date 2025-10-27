import { env } from "../../config/env.ts";

export const getForgotPasswordTemplate = (name: string, resetToken: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Reset Your Password</title>
<style>
  body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa; margin: 0; padding: 0; color: #333333; }
  .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); overflow: hidden; }
  .header { background: linear-gradient(90deg, #5813C1 0%, #C45037 100%); color: #ffffff; text-align: center; padding: 24px; font-size: 24px; font-weight: 700; letter-spacing: 0.5px; }
  .content { padding: 32px 28px; line-height: 1.7; }
  .content h2 { margin-top: 0; color: #111; font-size: 20px; font-weight: 700; }
  .content p { margin-bottom: 16px; }
  .button { display: inline-block; margin-top: 20px; padding: 12px 28px; background: linear-gradient(90deg, #5813C1 0%, #C45037 100%); color: #fff !important; text-decoration: none; border-radius: 6px; font-weight: 600; letter-spacing: 0.3px; }
  .button:hover { opacity: 0.9; }
  .link { font-size: 13px; color: #5813C1; word-break: break-all; }
  .footer { text-align: center; padding: 20px; background: #fafafa; font-size: 12px; color: #777777; border-top: 1px solid #eeeeee; }
  @media only screen and (max-width: 600px) { .container { margin: 20px; } .content { padding: 24px 20px; } }
</style>
</head>
<body>
<div class="container">
  <div class="header">Quiz Master</div>
  <div class="content">
    <h2>Hello, ${name}!</h2>
    <p>We received a request to reset your password. Click the button below to set a new password for your account.</p>
    <a href="${env.FRONT_URL}/forgot?token=${resetToken}" class="button">Reset Password</a>
    <p style="margin-top: 25px;">If the button doesn’t work, copy and paste this link into your browser:</p>
    <p class="link">${env.FRONT_URL}/forgot?token=${resetToken}</p>
    <p style="margin-top: 16px; font-size: 13px; color: #999;">If you did not request a password reset, you can safely ignore this email.</p>
  </div>
  <div class="footer">
    &copy; ${new Date().getFullYear()} Quiz Master. All rights reserved.
  </div>
</div>
</body>
</html>
`;
