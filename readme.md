# Appointment Scheduler API

This project is a robust backend API for an appointment scheduling application designed for businesses like doctor's offices, salons, or clinics. It allows users to register, book and manage appointments, while enabling businesses to manage their services and availability.

---

## ✨ Features

- **User Authentication**: Secure user registration and login (signup, login, logout) with JWT for both clients and businesses.
- **Business Management**: Full CRUD operations for business profiles, including managing working hours.
- **Service Management**: Businesses can create, update, delete, and view the services they offer.
- **Appointment Booking**: Clients can book appointments for specific services at available time slots.
- **Availability Checking**: Shows available time slots based on working hours and existing appointments.
- **Appointment Management**: Supports rescheduling and cancellation of appointments.
- **Notifications**: Integrated email notifications for events like appointment confirmations or reminders.
- **Health Check**: Public endpoint to verify the API's operational status.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **File Handling**: Multer
- **Emailing**: Nodemailer
- **Environment Management**: dotenv

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm
- MongoDB (local or cloud)
- Postman (for API testing)

### Installation & Setup

1. Clone the repository:
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd appointment-scheduler
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory:
    ```env
    PORT=3000
    CORS_ORIGIN=*

    MONGODB_URI=mongodb://localhost:27017
    DB_NAME=appointment-scheduler

    ACCESS_TOKEN_SECRET=your_super_secret_access_token
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=your_super_secret_refresh_token
    REFRESH_TOKEN_EXPIRY=10d

    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_gmail_app_password
    ```

### Running the Application

- **Development Mode**:
    ```bash
    npm run dev
    ```

- **Production Mode**:
    ```bash
    npm start
    ```

---

## 🧪 API Endpoints Guide

**Base URL**: `http://localhost:3000/api/v1`

### Authentication Workflow

1. **Register** → receive credentials.
2. **Login** → get accessToken.
3. For protected routes → use Bearer Token in Postman.

---

### 1. Healthcheck

- **GET `/healthcheck`**
    - **Response**:
        ```json
        { "message": "Health Check Passed" }
        ```

---

### 2. User Routes `/users`

- **POST `/register`**
    ```json
    {
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "password": "password123",
        "role": "client"
    }
    ```

- **POST `/login`**
    ```json
    {
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```

- **GET `/me`** *(Protected)*

- **PATCH `/update-account`**
    ```json
    { "fullName": "Johnathan Doe" }
    ```

- **DELETE `/delete-account`**

- **POST `/logout`**

---

### 3. Business Routes `/businesses`

*(Protected, `role: business`)*

- **POST `/`**
    ```json
    {
        "name": "The Grand Salon",
        "businessType": "salon",
        "address": "123 Main St, Anytown"
    }
    ```

- **GET `/:businessId`**

- **PUT `/:businessId`**

- **DELETE `/:businessId`**

---

### 4. Service Routes `/services`

*(Protected)*

- **POST `/`**
    ```json
    {
        "name": "Haircut",
        "duration": 30,
        "price": 25,
        "business": "<BUSINESS_ID>"
    }
    ```

- **GET `/:serviceId`**

- **PUT `/:serviceId`**

- **DELETE `/:serviceId`**

---

### 5. Availability Routes `/availability`

*(Protected)*

- **GET `/?businessId=<...>&date=<...>&serviceId=<...>`**

    - **Response**:
        ```json
        [
            "2024-08-15T10:00:00Z",
            "2024-08-15T10:30:00Z"
        ]
        ```

---

### 6. Appointment Routes `/appointments`

*(Protected)*

- **POST `/`**
    ```json
    {
        "business": "<BUSINESS_ID>",
        "service": "<SERVICE_ID>",
        "startTime": "2024-08-15T10:00:00Z",
        "endTime": "2024-08-15T10:30:00Z"
    }
    ```

- **GET `/:appointmentId`**

- **PUT `/:appointmentId`**
    ```json
    { "status": "completed" }
    ```

- **PATCH `/:appointmentId/reschedule`**
    ```json
    {
        "startTime": "2024-08-16T11:00:00Z",
        "endTime": "2024-08-16T11:30:00Z"
    }
    ```

- **PATCH `/:appointmentId/cancel`**

---

### 7. Notification Routes `/notifications`

*(Protected)*

- **POST `/`**
    ```json
    {
        "to": "customer@example.com",
        "subject": "Appointment Reminder",
        "text": "Your appointment is tomorrow at 10 AM."
    }
    ```

---
