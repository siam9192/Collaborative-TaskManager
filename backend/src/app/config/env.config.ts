import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

const envConfig = {
  environment: process.env.ENVIRONMENT,
  url: {
    database: process.env.DATABASE_URL,
  },
  
  jwt: {
    access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    otp_verification_token_secret: process.env.OTP_VERIFICATION_TOKEN_SECRET,
  },
};

export default envConfig;
