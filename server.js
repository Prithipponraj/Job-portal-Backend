require('dotenv').config({ path: './config/config.env' });
// console.log("Loaded SECRET:", process.env.SECRET);
const app = require('./app')
const databaseConnection = require('./config/database')
const cloudinary  = require('cloudinary')



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}) 

databaseConnection()



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running @ http://localhost:${5000}`);
});