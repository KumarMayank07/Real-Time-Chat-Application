# 💬 Chatty Frontend - Real-time Chat Application

A modern, responsive React frontend for a real-time chat application. Built with React, Vite, Tailwind CSS, and Socket.IO client for seamless real-time communication.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Components](#components)
- [State Management](#state-management)
- [Styling](#styling)
- [Demo Video](#demo-video)
- [Contributing](#contributing)

## ✨ Features

### 🎨 Modern UI/UX

- **Responsive design** that works on all devices
- **Dark/Light theme** with DaisyUI components
- **Smooth animations** and transitions
- **Intuitive user interface** with modern design patterns

### 💬 Real-time Chat

- **Instant messaging** with Socket.IO
- **Online user indicators** with green dots
- **Real-time typing indicators** (coming soon)
- **Message status indicators** (sent/delivered/read)

### 🔐 Authentication

- **Secure login/signup** with form validation
- **JWT token management** with HTTP-only cookies
- **Protected routes** with authentication guards
- **Profile management** with image uploads

### 📱 User Experience

- **Auto-scroll** to latest messages
- **Image sharing** with preview and upload
- **User search and filtering**
- **Comprehensive error handling** with user-friendly messages

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Real-time**: Socket.IO Client
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Backend server** running (see backend README)

## 🚀 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd frontend
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

The application will start on `http://localhost:5173`

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Development
VITE_API_URL=http://localhost:5001
VITE_SOCKET_URL=http://localhost:5001

# Production (optional)
VITE_API_URL=https://your-backend-domain.com
VITE_SOCKET_URL=https://your-backend-domain.com
```

## 📁 Project Structure

```
frontend/
├── public/
│   ├── avatar.png          # Default avatar image
│   └── index.html
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ChatContainer.jsx
│   │   ├── ChatHeader.jsx
│   │   ├── MessageInput.jsx
│   │   ├── NoChatSelected.jsx
│   │   ├── Sidebar.jsx
│   │   └── skeletons/      # Loading skeletons
│   ├── lib/               # Utility functions
│   │   ├── axios.js       # API configuration
│   │   └── utils.js       # Helper functions
│   ├── pages/             # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── SignUpPage.jsx
│   ├── store/             # State management
│   │   ├── useAuthStore.js
│   │   └── useChatStore.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── package.json
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── README.md
```

## 🧩 Components

### Core Components

#### `ChatContainer.jsx`

- Main chat interface
- Message display with sender/receiver styling
- Auto-scroll to latest messages
- Loading states and error handling

#### `Sidebar.jsx`

- User list with online indicators
- Search and filter functionality
- Online-only toggle
- User selection handling

#### `MessageInput.jsx`

- Text message input with emoji support
- Image upload with preview
- Send button with validation
- File type validation

#### `ChatHeader.jsx`

- Selected user information
- Online/offline status
- Close chat functionality

### Authentication Components

#### `LoginPage.jsx` & `SignUpPage.jsx`

- Form validation with React Hook Form
- Error handling with user-friendly messages
- Loading states during authentication
- Responsive design

#### `ProfilePage.jsx`

- Profile image upload
- User information display
- Settings and preferences

## 🗄️ State Management

### Auth Store (`useAuthStore.js`)

```javascript
const useAuthStore = create((set, get) => ({
  // State
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // Actions
  checkAuth: async () => {
    /* ... */
  },
  signup: async (data) => {
    /* ... */
  },
  login: async (data) => {
    /* ... */
  },
  logout: async () => {
    /* ... */
  },
  updateProfile: async (data) => {
    /* ... */
  },
  connectSocket: () => {
    /* ... */
  },
  disconnectSocket: () => {
    /* ... */
  },
}));
```

### Chat Store (`useChatStore.js`)

```javascript
const useChatStore = create((set, get) => ({
  // State
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // Actions
  getUsers: async () => {
    /* ... */
  },
  getMessages: async (userId) => {
    /* ... */
  },
  sendMessage: async (messageData) => {
    /* ... */
  },
  subscribeToMessages: () => {
    /* ... */
  },
  unsubscribeFromMessages: () => {
    /* ... */
  },
  setSelectedUser: (selectedUser) => {
    /* ... */
  },
}));
```

## 🎨 Styling

### Tailwind CSS + DaisyUI

The application uses Tailwind CSS for utility-first styling and DaisyUI for pre-built components:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
```

### Key Design Features

- **Responsive Grid Layout**: Adapts to different screen sizes
- **Dark/Light Theme**: Automatic theme switching
- **Smooth Animations**: CSS transitions for better UX
- **Modern Color Palette**: Carefully chosen colors for accessibility

### Component Styling Examples

```jsx
// Message bubble styling
<div
  className={`chat ${
    message.senderId === authUser._id ? "chat-end" : "chat-start"
  }`}
>
  <div className="chat-bubble flex flex-col">
    {message.image && (
      <img
        src={message.image}
        alt="Attachment"
        className="sm:max-w-[200px] rounded-md mb-2"
      />
    )}
    {message.text && <p>{message.text}</p>}
  </div>
</div>;

// Online indicator
{
  onlineUsers.includes(user._id) && (
    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
  );
}
```

## 🛡️ Error Handling

### Comprehensive Error Management

The application implements robust error handling at multiple levels:

#### API Error Handling

```javascript
// Axios interceptors for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle authentication errors
    } else if (error.request) {
      // Handle network errors
      toast.error("Network error - please check your connection");
    }
    return Promise.reject(error);
  }
);
```

#### User-Friendly Error Messages

- Network connectivity issues
- Authentication failures
- Validation errors
- Server-side errors
- Socket connection problems

#### Error Logging

```javascript
// Structured console logging
console.log("[AUTH] 🔐 Starting login process...");
console.error("[CHAT] ❌ Error fetching messages:", errorMessage);
console.log("[SOCKET] ✅ Socket connected successfully");
```

## 🎥 Demo Video

> **📹 Demo Video Placeholder**
>
> _A comprehensive demo video will be added here showcasing:_
>
> - Complete user journey from signup to messaging
> - Real-time chat functionality
> - Responsive design across devices
> - Error handling and edge cases
> - Socket.IO real-time features
>
> **Video Topics:**
>
> 1. User registration and authentication
> 2. Profile setup and image upload
> 3. Real-time messaging with multiple users
> 4. Online user indicators and status
> 5. Image sharing functionality
> 6. Responsive design demonstration
> 7. Error handling scenarios
> 8. Socket.IO real-time events

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Testing (if configured)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Configuration

For production deployment, make sure to:

1. Set correct API URLs in environment variables
2. Configure CORS on the backend for your domain
3. Set up proper SSL certificates
4. Configure CDN for static assets (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow React best practices
- Use TypeScript for type safety (if migrating)
- Write meaningful commit messages
- Add proper error handling
- Test on multiple devices/browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
