# Messagify - Real-time Chat Application

A modern, full-stack real-time chat application built with React, Node.js, Socket.IO, and MongoDB. Features secure authentication, instant messaging, file sharing, and comprehensive error handling.

## Overview

Messagify is a production-ready chat application that demonstrates modern web development practices with real-time communication capabilities. The application consists of a React frontend and a Node.js backend, connected through Socket.IO for real-time messaging.

## Key Features

### **Authentication & Security**
- JWT-based authentication with HTTP-only cookies
- Secure password hashing with bcrypt
- Protected routes and middleware validation
- CORS configuration and security headers

### **Real-time Messaging**
- Instant messaging with Socket.IO
- Online user tracking and status indicators
- Message persistence in MongoDB
- Real-time user presence updates

### **Modern UI/UX**
- Responsive design for all devices
- Dark/Light theme support with DaisyUI
- Smooth animations and transitions
- Intuitive user interface

### **File Sharing**
- Image upload and sharing with Cloudinary
- Profile picture management
- Image preview and optimization
- File type validation

### **Enterprise-level Error Handling**
- Comprehensive error logging with structured messages
- User-friendly error notifications
- Network error detection and recovery
- Detailed debugging information

## Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS + DaisyUI** - Utility-first styling
- **Zustand** - Lightweight state management
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client with interceptors
- **React Hot Toast** - Beautiful notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB + Mongoose** - Database and ODM
- **JWT** - JSON Web Tokens for authentication
- **Cloudinary** - Cloud-based image management
- **bcrypt** - Password hashing

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Real-Time-ChatApp
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### 4. Access the Application
- **Frontend**: https://messagify-real-time-chat-app-green.vercel.app/
- **Backend**: https://messagify-real-time-chat-app-ciu4.onrender.com

## 📁 Project Structure

```
Real-Time-ChatApp/
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middlewares/     # Custom middleware
│   │   ├── lib/             # Utilities and config
│   │   └── index.js         # Entry point
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── store/           # State management
│   │   ├── lib/             # Utilities
│   │   └── App.jsx
│   ├── .env.example
│   ├── package.json
│   └── README.md
└── README.md               # This file
```

## Environment Configuration

### Backend (.env)
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/messagify
JWT_SECRET=your-super-secret-jwt-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5001
VITE_SOCKET_URL=http://localhost:5001
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status
- `PUT /api/auth/update-profile` - Update user profile

### Message Endpoints
- `GET /api/message/users` - Get users for sidebar
- `GET /api/message/:id` - Get messages with specific user
- `POST /api/message/send/:id` - Send message to user

### Socket Events
- `getOnlineUsers` - Receive list of online users
- `newMessage` - Receive new messages in real-time


> **Application Features:**
> 1. User registration and authentication flow
> 2. Real-time messaging between multiple users
> 3. Online user status and indicators
> 4. Image sharing and file upload
> 5. Responsive design across devices
> 6. Error handling and edge cases
> 
> **Technical Demonstrations:**
> 1. Socket.IO real-time events
> 2. JWT authentication flow
> 3. Database operations and data persistence
> 4. API endpoint testing
> 5. Error handling scenarios
> 6. Performance and scalability features

## Security Features

- **JWT Authentication** with secure HTTP-only cookies
- **Password Hashing** using bcrypt with salt rounds
- **Input Validation** and sanitization
- **CORS Configuration** for cross-origin requests
- **Protected Routes** with authentication middleware
- **Error Handling** without exposing sensitive information

## Deployment

### Backend Deployment
1. Set up MongoDB Atlas or cloud database
2. Configure environment variables for production
3. Deploy to platforms like Heroku, Railway, or DigitalOcean
4. Set up Cloudinary for image storage

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3
3. Configure environment variables for production API URLs
4. Set up custom domain and SSL certificates

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Add proper error handling and logging
- Test your changes thoroughly
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Socket.IO** for real-time communication
- **MongoDB** for flexible data storage
- **Cloudinary** for image management
- **Tailwind CSS** for beautiful styling
- **React** and **Node.js** communities for excellent documentation

---

*For detailed setup instructions, please refer to the individual README files in the `frontend/` and `backend/` directories.*
