# 🚗 GarageFlow — Garage Management System

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC)

**GarageFlow** is a full-stack MERN web application designed to simplify daily operations of an automobile repair workshop.
It helps garage owners manage **job cards, spare parts inventory, repair history, and billing** in a single system.

The platform ensures accurate tracking of spare parts usage while allowing mechanics and staff to quickly create repair jobs and generate professional invoices for customers.

---

## ✨ Key Features

### 🔧 Job Card Management

* Create and manage repair job cards
* Assign vehicle details and repair description
* Add spare parts used in repair
* Close jobs after repair completion
* Reopen and edit job cards if additional work is required

### 📦 Inventory Management

* Add and update spare parts
* Track **available, reserved, and total stock**
* Prevent job creation when spare parts are unavailable
* Automatic stock deduction when job is completed

### 🧾 Billing & Invoice Generation

* Generate invoices from completed job cards
* Prevent duplicate invoices
* Automatically regenerate invoice when a job card is reopened and updated
* Download or print invoices as PDF

### 📊 Dashboard Insights

* View active and completed jobs
* Monitor low stock spare parts
* Track recent repair activities

---

## 🛠 Tech Stack

**Frontend**

* React.js
* Tailwind CSS
* React Router
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose

**Other Tools**

* jsPDF
* jspdf-autotable
* Vite

---

## 📂 Project Structure

```id="g5v5v1"
GarageFlow
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   └── App.jsx
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash id="9l7sgg"
git clone https://github.com/yourusername/garageflow.git
cd garageflow
```

### 2️⃣ Setup Backend

```bash id="bscm9h"
cd backend
npm install
npm run backend
```

Create `.env` file:

```id="8f9l8q"
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start server:

```bash id="ryhmh7"
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash id="wxfiy4"
cd ../frontend
npm install
npm run dev
```

---

## 🔁 Application Workflow

```id="x59l5l"
Create Job Card
      ↓
Add Spare Parts
      ↓
Close Job
      ↓
Generate Invoice
      ↓
Customer Payment
```

If a job is reopened:

```id="o4h8ye"
Reopen Job
   ↓
Update Repair Details
   ↓
Close Job Again
   ↓
Invoice Regenerated
```

