const AWS = require('aws-sdk');
require("dotenv").config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION,
});

const s3 = new AWS.S3();
const getImages = async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const images = data.Contents.map(item => {
      return { key: item.Key, url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${item.Key}` };
    });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving images from S3',details: err.message });
  }
};

module.exports = { getImages };

