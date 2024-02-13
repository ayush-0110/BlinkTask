const AWS = require('aws-sdk');
require('dotenv').config();


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION,
});

const s3 = new AWS.S3();


exports.generateGetSignedUrl = async (req, res) => {
    const { fileName } = req.params;

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Expires: 60 * 5, 
    };

    try {
        const signedUrl = s3.getSignedUrl('getObject', params);
        res.json({ url: signedUrl });
    } catch (err) {
        console.error('Error generating signed URL', err);
        res.status(500).send('Error generating signed URL');
    }
};

