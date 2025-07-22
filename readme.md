````markdown
# Appointment Scheduler API

This project is a robust backend API for an appointment scheduling application designed for businesses like doctor's offices, salons, or clinics. It allows users to register, book and manage appointments, while enabling businesses to manage their services and availability.

## ✨ Features

* **User Authentication**: Secure user registration and login (signup, login, logout) with JWT (JSON Web Tokens) for both clients and businesses.
* **Business Management**: Full CRUD (Create, Read, Update, Delete) operations for business profiles, including managing working hours.
* **Service Management**: Businesses can create, update, delete, and view the services they offer, including details like duration and price.
* **Appointment Booking**: Clients can book appointments for specific services at available time slots.
* **Availability Checking**: Automatically checks a business's working hours and existing appointments to show available time slots for a given service and date.
* **Appointment Management**: Supports rescheduling and cancellation of appointments.
* **Notifications**: Integrated email notifications for events like appointment confirmations or reminders.
* **Health Check**: A public endpoint to verify the API's operational status.

---

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose ODM
* **Authentication**: JSON Web Token (JWT), bcrypt for password hashing
* **File Handling**: Multer for file uploads
* **Emailing**: Nodemailer
* **Environment Management**: dotenv

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### **Prerequisites**

* Node.js (v18.x or higher recommended)
* npm (Node Package Manager)
* MongoDB (local installation or a cloud instance like MongoDB Atlas)
* Postman (for API testing)

### **Installation & Setup**

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd appointment-scheduler
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following variables. This file is ignored by Git for security.

    ```env
    # Server Configuration
    PORT=3000
    CORS_ORIGIN=*

    # Database Configuration
    MONGODB_URI=mongodb://localhost:27017
    DB_NAME=appointment-scheduler

    # JWT Secrets
    ACCESS_TOKEN_SECRET=your_super_secret_access_token
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=your_super_secret_refresh_token
    REFRESH_TOKEN_EXPIRY=10d

    # Email Configuration (for Nodemailer)
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_gmail_app_password
    ```

### **Running the Application**

* **Development Mode**: To run the server with `nodemon` for automatic restarts on file changes:
    ```bash
    npm run dev
    ```

* **Production Mode**: To run the server in a production environment:
    ```bash
    npm start
    ```

The server will start on the port specified in your `.env` file (e.g., `http://localhost:3000`).

---

## 🧪 API Endpoints Guide (Postman)

Here is a comprehensive guide to testing the API endpoints.

**Base URL**: `http://localhost:3000/api/v1`

### **Authentication Workflow**

1.  **Register** a new user to get their credentials.
2.  **Login** with those credentials. The response will contain an `accessToken`.
3.  For all protected routes, go to the **Authorization** tab in Postman, select **Bearer Token**, and paste the `accessToken` into the token field.

### **1. Healthcheck**

* **GET `/healthcheck`**: Checks the API status.
    * **Response (200 OK)**:
        ```json
        { "message": "Health Check Passed" }
        ```

### **2. User Routes (`/users`)**

* **POST `/register`**: Creates a new user.
    * **Body**:
        ```json
        {
            "fullName": "John Doe",
            "email": "john.doe@example.com",
            "password": "password123",
            "role": "client"
        }
        ```

* **POST `/login`**: Logs in a user.
    * **Body**:
        ```json
        {
            "email": "john.doe@example.com",
            "password": "password123"
        }
        ```
    * **Response (200 OK)**: Returns user data and tokens.

* **GET `/me`**: *(Protected)* Gets the current logged-in user's details.

* **PATCH `/update-account`**: *(Protected)* Updates user details.
    * **Body**:
        ```json
        { "fullName": "Johnathan Doe" }
        ```

* **DELETE `/delete-account`**: *(Protected)* Deletes the user's account.

* **POST `/logout`**: *(Protected)* Logs out the user.

### **3. Business Routes (`/businesses`)**

*(Protected, user role must be "business")*

* **POST `/`**: Creates a new business profile.
    * **Body**:
        ```json
        {
            "name": "The Grand Salon",
            "businessType": "salon",
            "address": "123 Main St, Anytown"
        }
        ```

* **GET `/:businessId`**: Fetches a business by its ID.

* **PUT `/:businessId`**: Updates a business's details.

* **DELETE `/:businessId`**: Deletes a business profile.

### **4. Service Routes (`/services`)**

*(Protected)*

* **POST `/`**: Creates a new service for a business.
    * **Body**:
        ```json
        {
            "name": "Haircut",
            "duration": 30,
            "price": 25,
            "business": "<BUSINESS_ID>"
        }
        ```

* **GET `/:serviceId`**: Fetches a service by its ID.

* **PUT `/:serviceId`**: Updates a service's details.

* **DELETE `/:serviceId`**: Deletes a service.

### **5. Availability Routes (`/availability`)**

*(Protected)*

* **GET `/?businessId=<...>&date=<...>&serviceId=<...>`**: Gets available time slots.
    * **Query Params**: `businessId`, `date` (YYYY-MM-DD), `serviceId`.
    * **Response (200 OK)**: An array of available date-time strings.

### **6. Appointment Routes (`/appointments`)**

*(Protected)*

* **POST `/`**: Books a new appointment.
    * **Body**:
        ```json
        {
            "business": "<BUSINESS_ID>",
            "service": "<SERVICE_ID>",
            "startTime": "2024-08-15T10:00:00Z",
            "endTime": "2024-08-15T10:30:00Z"
        }
        ```

* **GET `/:appointmentId`**: Fetches an appointment by its ID.

* **PUT `/:appointmentId`**: Updates an appointment (e.g., status).
    * **Body**:
        ```json
        { "status": "completed" }
        ```

* **PATCH `/:appointmentId/reschedule`**: Reschedules an appointment.
    * **Body**:
        ```json
        {
            "startTime": "2024-08-16T11:00:00Z",
            "endTime": "2024-08-16T11:30:00Z"
        }
        ```

* **PATCH `/:appointmentId/cancel`**: Cancels an appointment.

### **7. Notification Routes (`/notifications`)**

*(Protected)*

* **POST `/`**: Sends an email notification.
    * **Body**:
        ```json
        {
            "to": "customer@example.com",
            "subject": "Appointment Reminder",
            "text": "Your appointment is tomorrow at 10 AM."
        }
        ```
````