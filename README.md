# Alzikrayat – Photo Sharing Application

## Project Description
Alzikrayat is a web-based photo-sharing application built using the MERN Stack. It allows users to share photos, add comments, and explore memories through a photo gallery.

Guests can browse photos, while registered users can upload photos and add comments. Only photo owners can delete their photos.

## Technologies Used
- MongoDB
- Express.js
- React.js
- Node.js
- Mongoose
- Bootstrap
- Axios

## Project Structure
- `client/`: React frontend.
- `server/`: Express backend, including controllers, models, routes, and middleware.

## Installation and Setup

Clone the repository:

```bash
git clone -b master https://github.com/rawanmoon11/Alzikrayat-Photo-Sharing-Application.git
cd Alzikrayat-Photo-Sharing-Application
```

Install dependencies:

```bash
npm install
cd client
npm install
```

## Environment Variables

Create a `.env` file inside the `server/` directory:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

Replace the example value with your MongoDB connection string. Do not upload the `.env` file to GitHub.

## How to Run

**1. Start the Backend**

From the project root:

```bash
node server/server.js
```

**2. Start the Frontend**

In a separate terminal:

```bash
cd client
npm.cmd run dev


Open the application at:

http://localhost:5173

## Author
Rawan Mamoon
