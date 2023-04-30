const AWS = require('aws-sdk');
const keys = require('../../config/keys');
const uuid = require('uuid/v1');

async function upload(req, res) {
    const s3 = new AWS.S3({
        credentials: {
            accessKeyId: keys.accessKeyId,
            secretAccessKey: keys.secretAccessKey,
        },
        region: keys.region,
    })

    const key = `${req.user.id}/${uuid()}.png`;

    s3.getSignedUrl('putObject', {
        Bucket: keys.bucketName,
        ContentType: 'image/png', //TODO - change to req.file.mimeType
        Key: key,
        ACL: 'public-read-write',
    }, (err, url) => res.send({key, url}));
}

module.exports = {
    upload,
}
