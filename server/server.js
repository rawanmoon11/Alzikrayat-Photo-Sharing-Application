require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const erroHanadller = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

const authRouter = require('./routes/authRoutes');
const photoRoutes = require('./routes/photoRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Middlware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
//Routes
app.get('/', (req, res) => {
    res.send("welcome from alzikrayat project");
});
app.use('/api/auth/', authRouter);
app.use('/api/photo/', photoRoutes);
app.use('/api/comment/', commentRoutes);

app.use(erroHanadller);


const startServer = async function () {
    try {

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connection with mongodb  create Sucessfully")
        app.listen(port, '0.0.0.0', () => {
            console.log(`server is Running now .. on port ${port}`)
        });

    }
    catch (error) {
        console.log("Database conncection failed: " + error.message)
    }
}
startServer();



