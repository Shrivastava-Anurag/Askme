import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse>{
    try{
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Feedback.io | Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
          });

        return {
            success: true,
            message: "Verification mail sent successfully"
        }
    }
    catch (err) {
        console.log("Email Verification Failed to send", err);
        return {
            success: false,
            message: "Email Verification Failed"
        }
    }
    
}