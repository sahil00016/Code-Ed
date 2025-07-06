# Code-Ed: AI Code Review Tool

[![Live Demo](https://img.shields.io/badge/Live%20Demo-code--ed--flax.vercel.app-brightgreen?style=flat-square)](https://code-ed-flax.vercel.app/)

A modern, full-stack AI-powered code review platform.  
- **Frontend:** React + Vite + Clerk Auth + React Toastify  
- **Backend:** Node.js + Express + Google Gemini AI + File-based DB  
- **Features:** Code review, improvise, history, shareable links, authentication, notifications, and more.

---

## ✨ Features

- **AI Code Review:** Get instant, high-quality code reviews powered by Google Gemini.
- **Improvise:** Guide the AI with custom prompts for tailored suggestions.
- **History:** All your reviews are saved locally for easy access and management.
- **Shareable Links:** Share reviews across devices and users with secure, backend-powered links.
- **Authentication:** Secure sign-in/sign-out with Clerk.
- **Notifications:** Beautiful toast notifications for all key actions.
- **Modern UI:** Professional, responsive, and user-friendly interface.

---

## 🚀 Project Flow

1. **Sign In:**  
   Users authenticate via Clerk for a secure, personalized experience.

2. **Code Review:**  
   - Paste or write your code in the editor.
   - Click **Review** to get an AI-generated review.
   - Optionally, add a prompt and click **Improvise** for custom feedback.

3. **History & Sharing:**  
   - All reviews are saved in your history.
   - Click the share icon to generate a unique, shareable link.
   - Anyone with the link (and who is signed in) can view the review in a read-only modal.

4. **Notifications:**  
   - Get instant feedback for actions like review generation, login, sign out, sharing, and more.

---
## 🎥 Demo Video

https://drive.google.com/file/d/1sKh6_Im-_2yXGhxtKQt2Qvof34dZVGOh/view?usp=sharing

---

## 🖼️ Screenshots

![image](https://github.com/user-attachments/assets/f6695c21-dda6-4e55-957b-6592669918fc)
![image](https://github.com/user-attachments/assets/11151caf-45ea-4eba-bc08-6821d506cb27)
![image](https://github.com/user-attachments/assets/1780aa8d-2ee8-47e6-8f8e-3fd319b78715)
![image](https://github.com/user-attachments/assets/1abe03a5-bbb4-49df-b075-d0b5249ebed4)
![image](https://github.com/user-attachments/assets/d119a588-bfb2-4b51-84bf-cf4cca931853)
![image](https://github.com/user-attachments/assets/cb0607df-6b85-4e55-adfd-4d514aba2138)
![image](https://github.com/user-attachments/assets/ce5e19d3-4e91-4ed4-9959-83f1dba40f53)
![image](https://github.com/user-attachments/assets/0f74a1af-cfc2-40dd-aae9-f98dc99de6c6)

---

## 🛠️ Getting Started (Local Development)

### **1. Clone the Repository**
```sh
git clone https://github.com/sahil00016/Code-Ed.git
cd Code-Ed
```

### **2. Setup the Backend**
```sh
cd server
npm install
# Create a .env file with your Google Gemini API key and any other secrets:
# Example:
# GEMINI_API_KEY=your-gemini-api-key
npm run dev
# The backend will run on http://localhost:5000
```

### **3. Setup the Frontend**
```sh
cd ../client
npm install
# Create a .env file with your Clerk publishable key and backend URL:
# Example:
# VITE_CLERK_PUBLISHABLE_KEY=your-clerk-key
# VITE_API_URL=http://localhost:5000
npm run dev
# The frontend will run on http://localhost:5173
```

### **4. Open in Browser**
- Visit [http://localhost:5173](http://localhost:5173)
- Sign in, and start reviewing code!

---

## 🌐 Deployment

- **Live Demo:** [https://code-ed-flax.vercel.app/](https://code-ed-flax.vercel.app/)
- **Frontend:** Deploy the `client` folder to [Vercel](https://vercel.com/).
- **Backend:** Deploy the `server` folder to [Render](https://render.com/).
- Set environment variables in both platforms as described above.
- For Vercel, ensure you have a `vercel.json` file in `client` for SPA routing.

---

## 📝 Customization & Contribution

- Fork the repo, make your changes, and submit a pull request!
- You can easily swap out the AI provider, add new features, or connect to a real database.

---

## 🙏 Credits

- [Clerk](https://clerk.com/) for authentication
- [Google Gemini](https://ai.google.dev/) for AI reviews
- [React Toastify](https://fkhadra.github.io/react-toastify/) for notifications
- [Vercel](https://vercel.com/) and [Render](https://render.com/) for deployment

---

## 📧 Contact

For questions, suggestions, or collaboration, open an issue or reach out via [your preferred contact method].

---

> _Star ⭐ this repo if you found it helpful!_




