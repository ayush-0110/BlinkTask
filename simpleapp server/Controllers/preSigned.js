const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const s3 = new AWS.S3();

const generatePresignedUrl = async (req, res) => {
    const { fileName, fileType } = req.query;
  
    const s3Params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Expires: 60, 
      ContentType: fileType,
      //ACL: 'public-read',
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log('Error getting presigned URL from AWS S3:', err);
        return res.status(500).send('Cannot create S3 signed URL');
      }
      res.json({
        signedRequest: data,
        url: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${encodeURIComponent(fileName)}`
      });
    });
  };
  
  module.exports = { generatePresignedUrl };