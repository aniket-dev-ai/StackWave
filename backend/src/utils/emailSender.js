import nodemailer from "nodemailer";
import doTenv from "dotenv";
doTenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "🔐 Your OTP Code - StackWave",
    html: `
      <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #ffffff; border-radius: 10px; border: 1px solid #ddd;">
        <table width="100%" style="border-spacing: 0;">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <h1 style="color: #008000; margin: 0;">StackWave</h1>
              <p style="color: #333; font-size: 16px;">Your Trusted Code Collaboration Platform</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 20px; text-align: center;">
              <h2 style="color: #008000;">🔑 Your OTP Code</h2>
              <p style="font-size: 18px; color: #333;">Use the code below to verify your email and complete your authentication.</p>
              <div style="background-color: #008000; color: #fff; padding: 15px; font-size: 22px; font-weight: bold; letter-spacing: 2px; border-radius: 5px; display: inline-block;">
                ${otp}
              </div>
              <p style="font-size: 14px; color: #777;">This OTP will expire in <strong>10 minutes</strong>. Please do not share it with anyone.</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 20px; text-align: center;">
              <a href="https://stackwave.com/verify-otp" style="background-color: #008000; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                Verify Now
              </a>
            </td>
          </tr>
  
          <tr>
            <td style="padding: 20px; text-align: center; color: #333; font-size: 14px;">
              <p>If you didn’t request this, please ignore this email or <a href="mailto:support@stackwave.com" style="color: #008000; text-decoration: none;">contact support</a>.</p>
            </td>
          </tr>
  
          <tr>
            <td style="background-color: #008000; color: #ffffff; text-align: center; padding: 10px 20px; border-radius: 0 0 10px 10px;">
              <p style="margin: 0; font-size: 14px;">© 2025 StackWave. All Rights Reserved.</p>
            </td>
          </tr>
        </table>
      </div>
    `,
  };

  console.log("Sending email to:", email);

  await transporter.sendMail(mailOptions);
};
export const SendAccountCreationConfirmation = async (email, Name) => {
  console.log("GMAIL_USER:", process.env.GMAIL_USER);
  console.log("GMAIL_PASS:", process.env.GMAIL_PASS);
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "🎉 Welcome to StackWave, " + Name + "!",
    html: `
      <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #ffffff; border-radius: 10px; border: 1px solid #ddd;">
        <table width="100%" style="border-spacing: 0;">
          
          <tr>
            <td align="center" style="padding: 20px 0;">
              <h1 style="color: #008000; margin: 0;">Welcome to StackWave! 🚀</h1>
              <p style="color: #333; font-size: 16px;">Hey <strong>${Name}</strong>, we're thrilled to have you here! 💚</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 20px; text-align: center;">
              <h2 style="color: #008000;">Your Account Details</h2>
              <p style="font-size: 16px; color: #333;">📧 <strong>Email:</strong> ${email}</p>
              <p style="font-size: 16px; color: #333;">🎯 <strong>Role:</strong> User</p>
              <p style="font-size: 16px; color: #777;">You can update your profile anytime from the dashboard.</p>
            </td>
          </tr>
  
          <tr>
            <td style="padding: 20px; text-align: center;">
              <h3 style="color: #008000;">💡 What’s Next?</h3>
              <p style="font-size: 16px; color: #333;">✅ Explore real-time coding collaboration</p>
              <p style="font-size: 16px; color: #333;">✅ Join the developer community</p>
              <p style="font-size: 16px; color: #333;">✅ Start building something amazing!</p>
            </td>
          </tr>
  
          <tr>
            <td style="padding: 20px; text-align: center;">
              <a href="https://stackwave.com/dashboard" style="background-color: #008000; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                Go to Dashboard
              </a>
            </td>
          </tr>
  
          <tr>
            <td style="padding: 20px; text-align: center; color: #333; font-size: 14px;">
              <p>If you need help, reach out to us at <a href="mailto:support@stackwave.com" style="color: #008000; text-decoration: none;">support@stackwave.com</a></p>
            </td>
          </tr>
  
          <tr>
            <td style="background-color: #008000; color: #ffffff; text-align: center; padding: 10px 20px; border-radius: 0 0 10px 10px;">
              <p style="margin: 0; font-size: 14px;">© 2025 StackWave. All Rights Reserved.</p>
            </td>
          </tr>
  
        </table>
      </div>
    `,
  };

  console.log("Sending email to:", email);

  await transporter.sendMail(mailOptions);
};

export const sentLoginOtp = async (email, otp, name) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "🔐 Login OTP for StackWave",
    html: `
          <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #ffffff; border-radius: 10px; border: 1px solid #ddd;">
            
            <table width="100%" style="border-spacing: 0;">
              
              <tr>
                <td align="center" style="padding: 20px 0;">
                  <h1 style="color: #008000; margin: 0;">StackWave Login OTP</h1>
                  <p style="color: #333; font-size: 16px;">Hey <strong>${name}</strong>, use this OTP to log in securely. 🔒</p>
                </td>
              </tr>
              
              <tr>
                <td style="padding: 20px; text-align: center;">
                  <h2 style="color: #008000;">Your OTP Code</h2>
                  <p style="font-size: 18px; color: #333;">Enter the OTP below to continue your login session.</p>
                  <div style="background-color: #008000; color: #fff; padding: 15px; font-size: 22px; font-weight: bold; letter-spacing: 2px; border-radius: 5px; display: inline-block;">
                    ${otp}
                  </div>
                  <p style="font-size: 14px; color: #777;">This OTP will expire in <strong>10 minutes</strong>. Please do not share it with anyone.</p>
                </td>
              </tr>
              
              <tr>
                <td style="padding: 20px; text-align: center;">
                  <a href="https://stackwave.com/login" style="background-color: #008000; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                    Login Now
                  </a>
                </td>
              </tr>
      
              <tr>
                <td style="padding: 20px; text-align: center; color: #333; font-size: 14px;">
                  <p>If you didn’t request this login, please ignore this email or <a href="mailto:support@stackwave.com" style="color: #008000; text-decoration: none;">contact support</a>.</p>
                </td>
              </tr>
      
              <tr>
                <td style="background-color: #008000; color: #ffffff; text-align: center; padding: 10px 20px; border-radius: 0 0 10px 10px;">
                  <p style="margin: 0; font-size: 14px;">© 2025 StackWave. All Rights Reserved.</p>
                </td>
              </tr>
      
            </table>
            
          </div>
        `,
  };

  console.log("Sending email to:", email);

  await transporter.sendMail(mailOptions);
};

export const successfullyLogin = async (email, name, time) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "✅ Successful Login to Your StackWave Account",
    html: `
            <div style="max-width: 650px; margin: auto; padding: 25px; font-family: Arial, sans-serif; background-color: #ffffff; border-radius: 10px; border: 1px solid #ddd;">
    
                <table width="100%" style="border-spacing: 0;">
    
                    <tr>
                        <td align="center" style="padding: 25px 0;">
                            <h1 style="color: #008000; margin: 0;">🎉 Welcome Back to StackWave!</h1>
                            <p style="color: #333; font-size: 18px;">Hello <strong>${name}</strong>,</p>
                            <p style="color: #333; font-size: 16px;">You have successfully logged into your StackWave account.</p>
                        </td>
                    </tr>
    
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <h2 style="color: #008000;">🔐 Account Security</h2>
                            <p style="font-size: 16px; color: #333;">Your account is secure, and you can continue using StackWave without any issues.</p>
                            <p style="font-size: 16px; color: #333;">Login Time: <strong>${time}</strong></p>
                        </td>
                    </tr>
    
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <h3 style="color: #d9534f;">❌ Didn't log in?</h3>
                            <p style="font-size: 16px; color: #333;">If you did not log in, please take immediate action to secure your account.</p>
                            <a href="https://stackwave.com/security" style="background-color: #d9534f; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                                Secure My Account
                            </a>
                        </td>
                    </tr>
    
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <h2 style="color: #008000;">✨ Explore New Features</h2>
                            <p style="font-size: 16px; color: #333;">We're constantly improving StackWave to enhance your experience. Check out the latest features now!</p>
                            <a href="https://stackwave.com/features" style="background-color: #008000; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                                Explore Features
                            </a>
                        </td>
                    </tr>
    
                    <tr>
                        <td style="padding: 20px; text-align: center; color: #333; font-size: 14px;">
                            <p>If you have any questions, feel free to contact us at <a href="mailto:support@stackwave.com" style="color: #008000; text-decoration: none;">support@stackwave.com</a></p>
                        </td>
                    </tr>
    
                    <tr>
                        <td style="background-color: #008000; color: #ffffff; text-align: center; padding: 15px; border-radius: 0 0 10px 10px;">
                            <p style="margin: 0; font-size: 14px;">© 2025 StackWave. All Rights Reserved.</p>
                        </td>
                    </tr>
    
                </table>
    
            </div>
        `,
  };

  console.log("Sending email to:", email);

  await transporter.sendMail(mailOptions);
};
