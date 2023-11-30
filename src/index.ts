import express from 'express';
import {AppDataSource} from "./db"
import app from "./app"



app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized')

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    });