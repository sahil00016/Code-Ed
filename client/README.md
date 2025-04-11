# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Description : This is an ai-based code editor for development can also be used for programming this project allows users to get a review of their code using google gemini model and also get suggestions to fix and improve the performance of their existing code.

dependencies to install before running the project:
prismjs (in client)
react-simple-code-editor (in client)
react-markdown (in client)
rehype-highlight(in client)
axios (in client)
cors (in server)
@google/generative-ai (in server)

#TO access the project:
firstly run the server:
Open the server folder with integrated terminal then type: npx nodemon

secondly run the client:
Open the client folder with another integrated terminal then type: npm run dev

Congratulations!! Your project is live on localhost.

Gemini api key used you might need to change it if it expires in future
to chaange api key go to server -> .env there change the key retreived from https://aistudio.google.com/apikey choose model mentioned
GEMINI model used : gemini-2.0-flash then run the server and client again 

Project design and working:
![image](https://github.com/user-attachments/assets/61a32b26-f259-4340-9dba-818fa51c4de7)
![image](https://github.com/user-attachments/assets/43a68aed-5415-445b-8370-af592b162a0f)




