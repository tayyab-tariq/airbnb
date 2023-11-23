import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';

const uploadToS3 = async (buffer, originalFilename, mimetype) => {
    const client = new S3Client({
      region: 'ap-southeast-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const parts = originalFilename.split('.');
    const ext = parts[parts.length - 1];
    const newFilename = Date.now() + '.' + ext;
    const bucket = process.env.AWS_BUCKET;
    await client.send(new PutObjectCommand({
      Bucket: bucket,
      Body: buffer,
      Key: newFilename,
      ContentType: mimetype,
    }));
    return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

export default uploadToS3;
