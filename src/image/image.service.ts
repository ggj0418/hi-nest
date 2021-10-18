import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { Logger } from '@nestjs/common';

@Injectable()
export class ImageService {
  async upload(file) {
    const { originalname } = file;
    const bucketS3 = 'mepus-image';
    await this.uploadS3(file.buffer, bucketS3, originalname);
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: 'AKIA3U6KZIS3XTEZ5XHH',
      secretAccessKey: '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',
      region: 'ap-northeast-2',
    });
  }
}
