# 🧠 MERN Job Application Tracker

A full-stack **MERN (MongoDB, Express, React, Node.js)** application that helps users manage and track their job applications efficiently.

---

## 🚀 Live Demo

- **Frontend:** [https://jobtra.netlify.app/](https://jobtra.netlify.app/)
- **Backend API:** [https://job-tracker-backend-ailr.onrender.com/api](https://job-tracker-backend-ailr.onrender.com/api)
- **GitHub Repo:** [https://github.com/praga-16/job-tracker](https://github.com/praga-16/job-tracker)

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (Hooks + Functional Components) |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Cloud) |
| Authentication | JSON Web Token (JWT) |
| Hosting | Netlify (Frontend), Render (Backend) |

---

## 🧩 Features

✅ Add, view, edit, and delete job applications  
✅ User authentication (Register/Login with JWT)  
✅ Input validation (both frontend & backend)  
✅ Filter jobs by application status  
✅ Responsive, clean UI  
✅ Secure backend with protected routes  

---

## 🛠️ How to Run Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/praga-16/job-tracker.git
cd job-tracker
```
### 2️⃣ Setup Backend
```
cd backend
npm install

```
Create a .env file inside the /backend folder:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/job-tracker?retryWrites=true&w=majority
JWT_SECRET=mysupersecretkey
PORT=5000
```

### 💡 Replace <username> and <password> with your MongoDB Atlas credentials.

Run the backend server:
```
npm run dev

```
Backend runs at: http://localhost:5000

### 3️⃣ Setup Frontend
```
cd ../frontend
npm install

```
Create a .env file inside /frontend:
```
REACT_APP_API_BASE=http://localhost:5000/api

```
Run the frontend:
```
npm start

```
Frontend runs at: http://localhost:3000

## 📡 API Endpoints (Brief)

| Method | Endpoint | Description | Auth Required |
|---------|-----------|-------------|----------------|
| **POST** | `/api/auth/register` | Register a new user | ❌ |
| **POST** | `/api/auth/login` | Login and get JWT token | ❌ |
| **GET** | `/api/jobs` | Get all jobs for logged-in user | ✅ |
| **GET** | `/api/jobs/:id` | Get job by ID | ✅ |
| **POST** | `/api/jobs` | Create new job | ✅ |
| **PUT** | `/api/jobs/:id` | Update a job | ✅ |
| **DELETE** | `/api/jobs/:id` | Delete a job | ✅ |

### Example Request

```bash
POST /api/jobs
Headers: Authorization: Bearer <token>
Body:
{
  "companyName": "Amazon",
  "jobTitle": "SDE Intern",
  "applicationDate": "2025-10-18",
  "status": "Applied"
}
```

### 📸 Screenshots:
<img width="1919" height="1022" alt="image" src="https://github.com/user-attachments/assets/14fc758f-d3ed-4dfe-9e14-0beedc2defef" />

<img width="1919" height="1025" alt="image" src="https://github.com/user-attachments/assets/a259e30a-be10-48d3-963a-96d2f3ea6df6" />
<img width="1919" height="1021" alt="image" src="https://github.com/user-attachments/assets/f5060f29-4e93-47e2-aa27-e87a521e45cf" />
<img width="1918" height="1026" alt="image" src="https://github.com/user-attachments/assets/b037cc4c-2f47-42b2-b05c-4c5c55ee0665" />
<img width="1919" height="1027" alt="image" src="https://github.com/user-attachments/assets/cf451e19-c379-49bb-a495-072dc5068803" />
<img width="1919" height="1026" alt="image" src="https://github.com/user-attachments/assets/296bc42b-c096-42d1-a198-1c372668541b" />

## backend:

<img width="1919" height="1021" alt="image" src="https://github.com/user-attachments/assets/b7547349-eceb-4416-b40f-7169ccb6ce0d" />

<img width="1919" height="1016" alt="image" src="https://github.com/user-attachments/assets/4f61673e-9aaf-4258-a4c1-65aaeb8909e7" />

### 💻 Deployment
Backend (Render)

Connect your GitHub repo → Root Directory: backend

Add Environment Variables:
```
MONGO_URI

JWT_SECRET

PORT
```
Build Command: npm install

Start Command: npm start

Frontend (Netlify)

Import repo from GitHub

Root Directory: frontend

Build Command: npm run build

Publish Directory: build

Environment Variable:
```
REACT_APP_API_BASE=https://job-tracker-backend-ailr.onrender.com/api
```
### 🧾 Author

Pragatheesvaran A B
Email: pragatheesvaranab@gmail.com

GitHub: https://github.com/praga-16
