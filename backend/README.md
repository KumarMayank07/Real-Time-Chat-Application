# Chatty Backend - Real-time Chat Application API

A robust Node.js backend API for a real-time chat application built with Express.js, Socket.IO, and MongoDB. Features comprehensive authentication, real-time messaging, file uploads, and enterprise-level error handling.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Socket Events](#socket-events)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [Demo Video](#demo-video)
- [Contributing](#contributing)

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with HTTP-only cookies
- **Secure password hashing** using bcrypt
- **Protected routes** with middleware validation
- **User profile management** with image uploads

### 💬 Real-time Messaging
- **Socket.IO integration** for instant messaging
- **Online user tracking** and status updates
- **Message persistence** in MongoDB
- **Image sharing** with Cloudinary integration

### 🛡️ Security & Error Handling
- **Comprehensive error logging** with structured messages
- **Input validation** and sanitization
- **CORS configuration** for cross-origin requests
- **Rate limiting** and security headers

### 📁 File Management
- **Cloudinary integration** for image uploads
- **Profile picture management**
- **Chat image sharing**
- **Automatic image optimization**

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.IO
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **Security**: bcrypt, CORS, cookie-parser
- **Development**: Nodemon

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Cloudinary Account** (for image uploads)
- **npm** or **yarn** package manager

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the development server**
```bash
npm run dev
```

The server will start on `http://localhost:5001`

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/chatty
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatty

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user | ❌ |
| POST | `/login` | User login | ❌ |
| POST | `/logout` | User logout | ✅ |
| GET | `/check` | Check auth status | ✅ |
| PUT | `/update-profile` | Update user profile | ✅ |

### Message Routes (`/api/message`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get users for sidebar | ✅ |
| GET | `/:id` | Get messages with user | ✅ |
| POST | `/send/:id` | Send message to user | ✅ |

### Request/Response Examples

#### User Signup
```javascript
// POST /api/auth/signup
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

// Response
{
  "_id": "user_id",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": "default_avatar_url"
}
```

#### Send Message
```javascript
// POST /api/message/send/:userId
{
  "text": "Hello there!",
  "image": "base64_image_string" // optional
}

// Response
{
  "_id": "message_id",
  "senderId": "sender_id",
  "receiverId": "receiver_id",
  "text": "Hello there!",
  "image": "cloudinary_url",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## Socket Events

### Client → Server Events
- **Connection**: Automatic on socket connect with `userId` query

### Server → Client Events
- **`getOnlineUsers`**: Array of online user IDs
- **`newMessage`**: New message object for real-time delivery

### Socket Connection Example
```javascript
// Client connection
const socket = io('http://localhost:5001', {
  query: { userId: 'user_id_here' }
});

// Listen for online users
socket.on('getOnlineUsers', (userIds) => {
  console.log('Online users:', userIds);
});

// Listen for new messages
socket.on('newMessage', (message) => {
  console.log('New message:', message);
});
```

## 🗄️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  fullName: String (required),
  password: String (required, hashed),
  profilePic: String (default: ""),
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model
```javascript
{
  _id: ObjectId,
  senderId: ObjectId (ref: 'User', required),
  receiverId: ObjectId (ref: 'User', required),
  text: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The application implements comprehensive error handling with structured logging:

### Error Response Format
```javascript
{
  "success": false,
  "message": "User-friendly error message",
  "error": "ERROR_CODE"
}
```

### Error Codes
- `MISSING_FIELDS` - Required fields not provided
- `PASSWORD_TOO_SHORT` - Password validation failed
- `EMAIL_EXISTS` - Email already registered
- `INVALID_CREDENTIALS` - Wrong email/password
- `NOT_AUTHENTICATED` - User not logged in
- `INTERNAL_ERROR` - Server-side error

### Logging Format
```
[AUTH] 📝 Signup attempt for email: user@example.com
[AUTH] ✅ User created successfully: user@example.com (ID: 123...)
[MESSAGE] 💬 Getting messages between users
[SOCKET] 🔌 User Connected: socket_id
```

## Demo Video

> **📹 Demo Video Placeholder**
> 
> *A comprehensive demo video will be added here showcasing:*
> - API endpoint testing with Postman/Thunder Client
> - Real-time messaging functionality
> - Socket.IO connection and events
> - Error handling demonstrations
> - Database operations and data flow
> 
> **Video Topics:**
> 1. Authentication flow (signup/login/logout)
> 2. Message sending and receiving
> 3. Real-time online user tracking
> 4. Image upload functionality
> 5. Error handling scenarios
> 6. Socket.IO real-time events

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Node.js, Express.js, and Socket.IO**
