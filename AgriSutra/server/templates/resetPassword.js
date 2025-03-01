function resetPasswordMailTemplate(resetLink) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Request</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            .container {
                max-width: 500px;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
                text-align: center;
                display: block;
            }
            .content h2 {
                color: #333;
                font-size: 24px;
                margin-bottom: 10px;
            }
            .content p {
                font-size: 16px;
                color: #666;
                line-height: 1.5;
            }
            .reset-button {
                background-color: #28a745;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                text-decoration: none;
                font-size: 18px;
                display: inline-block;
                margin: 15px 0;
            }
            .footer {
                margin-top: 20px;
                font-size: 15px;
                color: #555;
                border-top: 1px solid #ddd;
                padding-top: 15px;
                display: block;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h3 style="margin: 5px 0;">AgriSutra</h3>
            </div>
            <div class="content">
                <h2>Reset Your Password</h2>
                <p>We received a request to reset your password. Click the button below to proceed:</p>
                <a href="${resetLink}" class="reset-button">Reset Password</a>
                <p>If you did not request a password reset, please ignore this email or contact our support team.</p>
            </div>
            <div class="footer">
                <p>&copy; 2025 AgriSutra Inc. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

module.exports = { resetPasswordMailTemplate };
