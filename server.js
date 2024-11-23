const { config } = require('dotenv');
const cors = require('cors')
const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRouter');
const router = require('./routes/adminRouter');
const rateLimit = require('express-rate-limit');

const app = express();

const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 50,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false, 
  });
  
config();
connectDB();

app.use(apiLimiter);
app.use(cors());
app.use(express.json())

app.use('/api/users', userRouter);
app.use('/api/admin', router)

const PORT = process.env.PORT || 3000 ;

app.listen(PORT, ()=>console.log(`server running on ${PORT}`));