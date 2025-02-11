# CHAT-APP (convo!)

## About This Project

This project is a chat application built using React and Vite. It aims to provide real-time communication features with a modern frontend stack.

## Project Structure

The project structure is as follows:

```
/e:/4.MY PROJECTS WEB/CHAT-APP/
├── Backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── app.js
│   └── server.js
├── Frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── stores
│   │   │   └── socketStore.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   └── index.html
├── package.json
└── README.md
```

- `Backend`: Contains the server-side code.

  - `controllers`: Contains the logic for handling requests.
  - `models`: Contains the database models.
  - `routes`: Contains the route definitions.
  - `app.js`: The main application file.
  - `server.js`: The entry point for the server.

- `Frontend`: Contains the client-side code.
  - `public`: Contains static assets.
  - `src`: Contains the source code for the React application.
    - `assets`: Contains images, styles, and other assets.
    - `components`: Contains reusable React components.
    - `pages`: Contains page components for different routes.
    - `stores`: Contains store files for state management.
      - `socketStore.js`: Manages the connection to the backend using `socket.io-client`.
    - `App.jsx`: The main application component.
    - `main.jsx`: The entry point for the React application.

## How to Use This Project

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```

2. Install dependencies for both frontend and backend:

   ```sh
   cd Frontend
   npm install
   # or
   yarn install
   cd ../Backend
   npm install
   # or
   yarn install
   ```

### Running the Development Server

To start the development server for both frontend and backend:

1. Start the backend server:

   ```sh
   cd Backend
   npm run dev
   # or
   yarn dev
   ```

2. Start the frontend server:

   ```sh
   cd ../Frontend
   npm run dev
   # or
   yarn dev
   ```

### Building for Production

To build the project for production:

1. Build the frontend:

   ```sh
   cd Frontend
   npm run build
   # or
   yarn build
   ```

2. The backend does not require a build step, but ensure all dependencies are installed.

### Linting

To lint the project using ESLint:

1. Lint the frontend:

   ```sh
   cd Frontend
   npm run lint
   # or
   yarn lint
   ```

2. Lint the backend:

   ```sh
   cd ../Backend
   npm run lint
   # or
   yarn lint
   ```

### Connecting to Backend with Socket.IO

The project uses `socket.io` on the backend and `socket.io-client` on the frontend to enable real-time communication.

#### Backend Setup

In the `Backend/server.js` file, initialize `socket.io`:

```javascript
// filepath: /e:/4.MY PROJECTS WEB/CHAT-APP/Backend/server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// ...existing code...

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

#### Frontend Setup

In the `Frontend/src/stores/socketStore.js` file, connect to the backend using `socket.io-client`:

```javascript
// filepath: /e:/4.MY PROJECTS WEB/CHAT-APP/Frontend/src/stores/socketStore.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default socket;
```

Use the `socket` instance in your React components to communicate with the backend:

```javascript
// filepath: /e:/4.MY PROJECTS WEB/CHAT-APP/Frontend/src/components/ChatComponent.jsx
import React, { useEffect, useState } from "react";
import socket from "../stores/socketStore";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
};

export default ChatComponent;
```

### Additional Scripts

Refer to the `package.json` files in both the `Frontend` and `Backend` directories for additional scripts and configurations.

### License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
