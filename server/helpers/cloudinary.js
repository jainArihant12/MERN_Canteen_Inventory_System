const cloudinary = require('cloudinary').v2
const multer = require('multer')
require('dotenv').config();
const crypto = require('crypto');

 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY , 
        api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });


const storage =  new multer.memoryStorage();
const upload = multer({storage});


async function ImageUploadUtils(base64Data) {
  // Cloudinary config should be done once globally, with your credentials from env
  const result = await cloudinary.uploader.upload(base64Data, {
    resource_type: 'auto'
  });
  return result;
}


module.exports = {upload , ImageUploadUtils}