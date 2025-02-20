# Gen-Image

Gen-Image is a web application that generates images from text using AI. Built with the MERN stack, it offers user authentication via JWT, smooth animations with Framer Motion, and seamless image generation using the **ClickDrop API**. The project is fully deployed on **Vercel**.

## Features
- **Text-to-Image Generation**: Enter text and generate images using the **ClickDrop API**.
- **User Authentication**: Secure login and signup using JWT.
- **Database**: MongoDB for storing user data.
- **Frontend**: React with Tailwind CSS and Framer Motion for animations.
- **Backend**: Express.js with Node.js for API handling.
- **Deployment**: Both frontend and backend are hosted on **Vercel**.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Image Generation**: ClickDrop API
- **Deployment**: Vercel

## Installation & Setup

### Backend
1. Clone the repository:
   ```sh
   [git clone https://github.com/yourusername/imagify.git](https://github.com/Farooq722/Gen-Image.git)
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   CLICKDROP_API_KEY=your_api_key
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Change constant file in utils folder to connect with BE
   ```env
   VITE_BACKEND_URL=<YOUR_BACKEND_URL_HERE>
   ```
4. Start the frontend:
   ```sh
   npm run dev
   ```

## Usage
1. Sign up or log in to Imagify.
2. Enter a text prompt to generate an image.
3. Download or share your generated image.

## Contributing
Feel free to fork this repository and submit pull requests.
```` ▋
