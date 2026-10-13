import { registerAs } from "@nestjs/config";

export default registerAs("profileConfiG",() => ({
    key:process.env.Google_Api_Key,
    
}))