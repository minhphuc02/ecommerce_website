require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));
app.use('/user', require('./routers/userRouter'))
app.use('/api', require('./routers/categoryRouter'))
app.use('/api', require('./routers/productRouter'))
app.use('/api', require('./routers/upload'))


// Connect to MongoDB
const URI = process.env.MONGODB_URL;

mongoose.connect(URI)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });

app.get('/', (req, res) => {
    res.json({msg: 'welcome to the commerce world'});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server is up and running on port', PORT);
});
