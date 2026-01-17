# 🛡️ AuthEngine v1

**AuthEngine** is a robust, full-stack Authentication and User Management system. Built with a focus on security and modern UI/UX, it provides a seamless experience for user registration, secure login, profile management, and account recovery.

The project features a sleek **Glassmorphism** design on the frontend and a production-ready **Node.js/Express** backend.

---

## ✨ Key Features

### 🔐 Authentication & Security
* **Secure Registration:** User signup with hashed passwords and email verification.
* **JWT-Based Auth:** Secure access using Access and Refresh tokens stored in cookies.
* **Protected Routes:** Frontend routes are guarded; only verified, logged-in users can access the dashboard.
* **Public Route Guard:** Logged-in users are automatically redirected away from Login/Register pages.

### 👤 User Management
* **Dynamic Dashboard:** View user profile details and account status.
* **Profile Editing:** Update personal info, including username and email.
* **Media Uploads:** Change Avatar and Cover Images powered by **Cloudinary**.
* **Password Management:** Securely change passwords from within the app.
* **Account Deletion:** Permanent account removal with a safety confirmation modal.

### 📧 Account Recovery
* **Email Verification:** Integration with **Mailtrap** for sending verification links.
* **Password Reset:** "Forgot Password" flow with secure, time-limited reset tokens.

### 🎨 UI/UX Highlights
* **Modern Design:** Dark-themed UI with Glassmorphism effects.
* **Responsive Layout:** Fully optimized for Mobile, Tablet, and Desktop.
* **Graceful Errors:** Custom **404 "Not Found"** page for broken links.

---

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* TypeScript
* Tailwind CSS
* Lucide React (Icons)
* Axios (API Calls)

**Backend:**
* Node.js & Express.js
* MongoDB (Mongoose)
* Cloudinary (Image Storage)
* Mailgen & Nodemailer (Email Services)
* JWT & Bcrypt (Security)

---

## 🚀 Future Roadmap (v2.0)

I am committed to evolving **AuthEngine** into a comprehensive Enterprise-level Auth solution. Planned features include:

* **RBAC (Role-Based Access Control):** Implementation of granular permissions for `Admin`, `Moderator`, and `User` roles.
* **Social Auth:** One-click login using Google and GitHub (OAuth2).
* **Two-Factor Authentication (2FA):** Enhanced security via TOTP or SMS codes.
* **Activity Logs:** A dedicated section for users to track their login history and active sessions.
* **Toast Notifications:** Sleek, real-time feedback for UI actions using `react-hot-toast`.

---

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/AuthEngine.git](https://github.com/your-username/AuthEngine.git)
```
```bash
cd AuthEngine
```

### 2. Backend Setup
The root directory serves as the backend server.

Install Backend Dependencies: Ensure you are in the root folder **(AuthEngine)**, then run:
```bash
npm install
```

Configure Environment Variables: Create a **.env** file in the root directory and add the following credentials:
```bash
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service (Mailtrap)
MAILTRAP_SMTP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your_mailtrap_user
MAILTRAP_SMTP_PASS=your_mailtrap_password

# Client URLs (For Redirects)
CLIENT_URL=http://localhost:5173
FORGOT_PASSWORD_REDIRECT_URL=http://localhost:5173/reset-password
```

Start the Backend Server:
```bash
npm run dev
```
You should see "Server running on port 8000" and "MongoDB Connected".

### 3. Frontend Setup
Open a New Terminal.

Navigate to the Client Folder:
```bash
cd client
```
Install Frontend Dependencies:
```bash
npm install
```
**Configure Environment Variables:** Create a **.env** file in the client folder to point to your backend:
```bash
VITE_SERVER_URL=http://localhost:8000/api/v1
```
Start the React App:
```bash
npm run dev
```

### Access the App: 
Open your browser and visit http://localhost:5173

## 👤 Author

### Ashish Kumar Shrivastva
- A passionate **Full Stack Developer** focused on building scalable web applications.
- [GitHub Profile](https://github.com/ashish-shrivastva)

## 📝 Notes

**v1 Status:** This project is currently in version 1.0. All core authentication features are fully functional.

**Environment:** Ensure you have Node.js and MongoDB installed locally or use MongoDB Atlas.

**Testing:** Email features are currently configured for testing via Mailtrap.