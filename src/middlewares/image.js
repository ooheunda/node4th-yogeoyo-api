import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    },
});

const uploadImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,

        key: (req, file, callback) => {
            // const { userId } = req.user;


            // 오늘 날짜 구하기
            const today = new Date();
            const currentYear = today.getFullYear();
            const currentMonth = today.getMonth() + 1;
            const currentDate = today.getDate();
            const date = `${currentYear}-${currentMonth}-${currentDate}`;

            // 임의번호 생성
            let randomNumber = "";
            for (let i = 0; i < 8; i++) {
                randomNumber += String(Math.floor(Math.random() * 10));
            }

            callback(null, `_${date}_${randomNumber}.jpg`);
        },
        // acl 권한 설정
        acl: "public-read-write",
    }),
    // 이미지 용량 제한 (10MB)
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

export default uploadImage;