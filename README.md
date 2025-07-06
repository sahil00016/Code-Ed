# Code-Ed: AI Code Review Tool

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

## 🖼️ Screenshots

> _Add your screenshots here!_  
> Example:
> ![Code Editor Screenshot](./screenshots/editor.png)
> ![Review Modal Screenshot](./screenshots/review-modal.png)

---

## 🎥 Demo Video

> _Coming soon!_  
> _You can embed your YouTube/Vimeo demo here:_
> [![Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

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




