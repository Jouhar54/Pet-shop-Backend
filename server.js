const { config } = require('dotenv');
const cors = require('cors')
const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRouter');
const router = require('./routes/adminRouter');

const app = express();

config();
connectDB();

app.use(cors());

app.use(express.json())

app.use('/api/users', userRouter);

app.use('/api/admin', router)

const PORT = process.env.PORT || 3000 ;

app.listen(PORT, ()=>console.log(`server running on ${PORT}`));