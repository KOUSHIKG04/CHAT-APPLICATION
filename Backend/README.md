# Chat App Backend API Documentation

## User Authentication Endpoints

### 1. User Signup Endpoint

- **URL:** `/signup`
- **Method:** `POST`
- **Description:** This endpoint registers a new user. It requires an email, full name, and password.

### Request Body

The request body should be a JSON object containing the following fields:

- `email` (string, required): The email address of the user. Must be a valid email format.
- `fullName` (string, required): The full name of the user.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

### Response

- `201 Created`: The user was successfully created.
  - Body: A JSON object containing user details and an authentication token.
- `400 Bad Request`: The request was invalid, possibly due to missing fields or validation errors.
  - Body: A JSON object containing the validation errors.
- `500 Internal Server Error`: A server error occurred.

### Example Request

```json
{
  "email": "user@example.com",
  "fullName": "John Doe",
  "password": "password123"
}
```

### Example Response

```json
{
  "user": {
    "_id": "60c72b2f9b1d8c001c8e4b8e",
    "email": "user@example.com",
    "fullName": "John Doe",
    "profilePic": "",
    "createdAt": "2024-02-05T12:34:56.789Z",
    "updatedAt": "2024-02-05T12:34:56.789Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. User Login Endpoint

- **URL:** `/login`
- **Method:** `POST`
- **Description:** This endpoint logs in an existing user using their email and password.

### Request Body

The request body should be a JSON object containing the following fields:

- `email` (string, required): The user's email address.
- `password` (string, required): The user's password.

### Response

- `200 OK`: The user was successfully logged in.
  - Body: A JSON object containing user details and an authentication token.
- `400 Bad Request`: Invalid request, possibly due to missing fields.
  - Body: A JSON object containing validation errors.
- `401 Unauthorized`: Incorrect email or password.
  - Body: A JSON object containing an error message.
- `500 Internal Server Error`: A server error occurred.

### Example Request

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Example Response

```json
{
  "user": {
    "_id": "60c72b2f9b1d8c001c8e4b8e",
    "email": "user@example.com",
    "fullName": "John Doe",
    "profilePic": "",
    "createdAt": "2024-02-05T12:34:56.789Z",
    "updatedAt": "2024-02-05T12:34:56.789Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. User Logout Endpoint

- **URL:** `/logout`
- **Method:** `POST`
- **Description:** Logs out the currently authenticated user.

### Request Headers

- `Authorization` (string, required): The authentication token in the format `Bearer <token>`.

### Response

- `200 OK`: Successfully logged out.
  - Body: A JSON object with a success message.
- `401 Unauthorized`: Invalid or missing authentication token.
  - Body: A JSON object with an error message.
- `500 Internal Server Error`: A server error occurred.

### Example Request

```http
POST /logout HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Example Response

```json
{
  "message": "Logged out successfully"
}
```

---

## User Profile Management

### 4. Update Profile Endpoint

- **URL:** `/update-profile`
- **Method:** `PUT`
- **Description:** Updates the user's profile picture.

### Request Headers

- `Authorization` (string, required): The authentication token in the format `Bearer <token>`.

### Request Body

- `profilePic` (string, required): The new profile picture as a base64-encoded string.

### Response

- `200 OK`: Successfully updated profile picture.
  - Body: A JSON object containing updated user details.
- `400 Bad Request`: The profile picture is missing.
  - Body: A JSON object with validation errors.
- `500 Internal Server Error`: A server error occurred.

### Example Request

```json
{
  "profilePic": "base64EncodedImageString"
}
```

### Example Response

```json
{
  "user": {
    "_id": "60c72b2f9b1d8c001c8e4b8e",
    "email": "user@example.com",
    "fullName": "John Doe",
    "profilePic": "base64EncodedImageString",
    "createdAt": "2024-02-05T12:34:56.789Z",
    "updatedAt": "2024-02-05T12:40:00.000Z"
  }
}
```

---

## User Authentication Check

### 5. Check Auth Endpoint

- **URL:** `/check-auth`
- **Method:** `GET`
- **Description:** Checks if the user is authenticated.

### Request Headers

- `Authorization` (string, required): The authentication token in the format `Bearer <token>`.

### Response

- `200 OK`: User is authenticated.
  - Body: A JSON object containing user details.
- `401 Unauthorized`: Invalid or missing authentication token.
  - Body: A JSON object containing an error message.
- `500 Internal Server Error`: A server error occurred.

### Example Request

```http
GET /check-auth HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Example Response

```json
{
  "user": {
    "_id": "60c72b2f9b1d8c001c8e4b8e",
    "email": "user@example.com",
    "fullName": "John Doe",
    "profilePic": "base64EncodedImageString",
    "createdAt": "2024-02-05T12:34:56.789Z",
    "updatedAt": "2024-02-05T12:40:00.000Z"
  }
}
```

---

## Message Endpoints

### 1. Get User for Sidebar

- **URL:** `/users/:id`
- **Method:** `GET`
- **Description:** Retrieves user information for the sidebar.

### Request Headers

- `Authorization` (string, required): The authentication token in the format `Bearer <token>`.

### Response

- `200 OK`: Successfully retrieved user information.
  - Body: A JSON object containing user details.
- `401 Unauthorized`: Invalid or missing authentication token.
  - Body: A JSON object containing an error message.
- `500 Internal Server Error`: A server error occurred.

### Example Request

```http
GET /users/60c72b2f9b1d8c001c8e4b8e HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Example Response

```json
{
  "user": {
    "_id": "60c72b2f9b1d8c001c8e4b8e",
    "email": "user@example.com",
    "fullName": "John Doe",
    "profilePic": "base64EncodedImageString",
    "createdAt": "2024-02-05T12:34:56.789Z",
    "updatedAt": "2024-02-05T12:40:00.000Z"
  }
}
```

---

### 2. Get Messages

- **URL:** `/:id`
- **Method:** `GET`
- **Description:** Retrieves messages between the logged-in user and another user.

### Request Headers

- `Authorization` (string, required): The authentication token in the format `Bearer <token>`.

### Response

- `200 OK`: Successfully retrieved messages.
  - Body: A JSON object containing messages.
- `401 Unauthorized`: Invalid or missing authentication token.
  - Body: A JSON object containing an error message.
- `500 Internal Server Error`: A server error occurred.

### Example Request

```http
GET /60c72b2f9b1d8c001c8e4b8e HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Example Response

```json
{
  "messages": [
    {
      "senderId": "60c72b2f9b1d8c001c8e4b8e",
      "receiverId": "60c72b2f9b1d8c001c8e4b8f",
      "text": "Hello!",
      "createdAt": "2024-02-05T12:34:56.789Z"
    },
    // ...more messages...
  ]
}
```

---

### 3. Send Message

- **URL:** `/send/:id`
- **Method:** `POST`
- **Description:** Sends a message to another user.

### Request Headers

- `Authorization` (string, required): The authentication token in the format `Bearer <token>`.

### Request Body

The request body should be a JSON object containing the following fields:

- `text` (string, required): The message text.
- `image` (string, optional): The message image as a base64-encoded string.

### Response

- `201 Created`: Successfully sent the message.
  - Body: A JSON object containing the sent message details.
- `400 Bad Request`: The request was invalid, possibly due to missing fields or validation errors.
  - Body: A JSON object containing the validation errors.
- `500 Internal Server Error`: A server error occurred.

### Example Request

```json
{
  "text": "Hello!",
  "image": "base64EncodedImageString"
}
```

### Example Response

```json
{
  "message": {
    "_id": "60c72b2f9b1d8c001c8e4b8e",
    "senderId": "60c72b2f9b1d8c001c8e4b8e",
    "receiverId": "60c72b2f9b1d8c001c8e4b8f",
    "text": "Hello!",
    "image": "base64EncodedImageString",
    "createdAt": "2024-02-05T12:34:56.789Z"
  }
}
```
