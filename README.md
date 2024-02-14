# Web Application for Image Upload

_A note: I deployed backend on Render. Since I chose the free service, backend service might be slower sometimes as Render spins down a Free web service that goes 15 minutes without receiving inbound traffic. So kindly reload the page once if register/login doesn't work. Once backend starts serving requests, navigation is seamless_
### Deployed link: https://blinkitdemo.netlify.app/

This project is a simple web application that allows users to sign up, log in, and upload images securely. It implements basic authentication and authorization mechanisms to ensure secure access to user data.

## Features

- User authentication (sign up and log in).
- Image upload functionality with secure access alongwith AWS S3 storage
- Basic user profile management.
- Securely store and retrieve images using AWS S3 (with pre-signed URLs for upload and access).
- JWT-based session management.

## Technology Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Storage:** AWS S3 for image uploads
- **Authentication:** JWT for session management

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- AWS Account (for S3 storage)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install backend dependencies.
     ```javascript
     npm install
     ```
3. Install frontend dependencies.
     ```javascript
     npm install
     ```
4. Set up your environment variables in `.env` files for both frontend and backend according to the `.env.example` provided in each directory.

5. Start the backend server with npm run dev.
6. Start the frontend application in another terminal with npm start

The application should now be running on `http://localhost:3000`.

## Usage
1. Visit `http://localhost:3000` on your browser.
2. Sign up for a new account or log in if you already have an account.
3. Once logged in, you can upload images using the upload form.
4. View all uploaded images in the gallery section.

## Contributing

Feel free to fork the project and submit pull requests with new features or fixes.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.

## Acknowledgments

- Thanks to all the open-source libraries and tools used in this project.
