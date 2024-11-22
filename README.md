  
# Basic Notes App (MERN Stack)

A simple **Notes Management Application** built using the **MERN stack** (MongoDB, Express, React, Node.js). This app allows users to create, view, edit, delete, and search for notes with support for categories and Markdown formatting.

---

## Features

- **CRUD Operations**: Create, Read, Update, and Delete notes.
- **Markdown Support**: Write and view notes in Markdown format.
- **Search and Filter**: Search notes by title or filter them by category.
- **Responsive Design**: Mobile-friendly user interface.
- **MERN Stack**: MongoDB, Express.js, React, and Node.js.

---

## Demo

[Live Demo](https://basic-notes-app-mern.onrender.com/)  

---

## Technologies Used

### Frontend
- **React**: Component-based frontend framework.
- **Axios**: For making HTTP requests to the backend.
- **Bootstrap**: For responsive styling.

### Backend
- **Node.js**: JavaScript runtime for the server.
- **Express.js**: Lightweight backend framework.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.

### Database
- **MongoDB**: NoSQL database for storing notes.

---

## Installation

### Prerequisites
- Node.js and npm installed on your system.
- MongoDB instance (local or cloud-based like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).

### 1. Clone the Repository
```bash
git clone https://github.com/pavan6476252/basic-notes-app-MERN.git
cd basic-notes-app-MERN
```

### 2. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and configure the following:
   ```env
   MONGODB_URL="your_mongodb_connection_string"
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` directory and configure the following:
   ```env
   VITE_BACKEND_URL="http://localhost:5000/"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Usage

1. Navigate to `http://localhost:3000` to access the application.
2. Use the interface to create, view, edit, and delete notes.
3. Use the search bar to find notes by title or filter them by category.

---

## Folder Structure

```
basic-notes-app-MERN/
├── client/            
│   ├── public/          
│   ├── src/             
│   ├── .env             
│   └── vite.config.js   
├── server/              
│   ├── config/         
│   ├── models/          
│   ├── routes/          
│   ├── .env             
│   └── index.js         
├── README.md          
└── package.json        
```

---

## API Endpoints

### Base URL: `/api`

| Method | Endpoint          | Description                     |
|--------|-------------------|---------------------------------|
| GET    | `/notes`          | Fetch all notes (supports search and filtering). |
| POST   | `/notes`          | Create a new note.              |
| PUT    | `/notes/:id`      | Update a specific note by ID.   |
| DELETE | `/notes/:id`      | Delete a specific note by ID.   |

---
 
 
