import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import reviewRoutes from './routes/reviewRoutes.js'
import mongoose from 'mongoose';

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors())


app.use('/', reviewRoutes)



mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('App connected to database');
        app.listen(process.env.PORT, () => {
            console.log("App is listening");
        });
    })
    .catch((error) => {
        console.log(error);
    });

mongoose.set('strictQuery', true)
