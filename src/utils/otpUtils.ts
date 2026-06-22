import { generateOtp } from '../context/AuthContext'

const OFFICIAL_EMAIL = import.meta.env.VITE_OFFICIAL_EMAIL || 'ithinklearn@ixpoe.com'

/**
 * Sends an OTP email from the official iThinkLearn email address.
 * In production, replace the alert() with a real email API call
 * that sends from OFFICIAL_EMAIL (ithinklearn@ixpoe.com).
 */
export const sendOtpEmail = (email) => {
  const otp = generateOtp(email)

  // --- Replace below with real email API in production ---
  // The email should be sent FROM: ithinklearn@ixpoe.com
  console.log(`[OTP] From: ${OFFICIAL_EMAIL} → To: ${email} | OTP: ${otp} (valid 5 minutes)`)

  alert(
    `📧 OTP sent to: ${email}\n\n` +
    `From: ${OFFICIAL_EMAIL} (iThinkLearn)\n\n` +
    `Your OTP is: ${otp}\n\n` +
    `⚠️ This OTP is valid for 5 minutes only.\n` +
    `Do not share this OTP with anyone.\n\n` +
    `— iThinkLearn Team`
  )
  // -------------------------------------------------------

  return otp
}
