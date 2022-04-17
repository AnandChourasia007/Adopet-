const cloudinary=require('cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

console.log("API KEY", process.env.CLOUD_NAME);
module.exports = cloudinary;