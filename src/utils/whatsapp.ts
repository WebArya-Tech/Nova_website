/**
 * WhatsApp Message Utility
 * Generates WhatsApp links with pre-filled messages based on context
 */

const WHATSAPP_PHONE = "919740712301";
const BASE_URL = `https://wa.me/${WHATSAPP_PHONE}`;

export const whatsappMessages = {
  // General inquiry
  GENERAL: "Hello! I would like to know more about Nova Tuitions.",
  
  // Demo class booking
  DEMO_CLASS: "I would like to book a free demo class.",
  DEMO_CLASS_SUBJECT: (subject: string, board: string) => 
    `I would like to book a free demo class for ${subject} ${board}.`,
  
  // Specific pages
  HOME_PAGE: "I'm interested in Nova Tuitions. Can you tell me more?",
  CONTACT_FORM: (name: string, phone: string, message: string) => 
    `Hello! I'm ${name}.\n\nPhone: ${phone}\n\nMessage: ${message}`,
  
  // Testimonial/Review related
  SHARE_EXPERIENCE: "I would like to share my experience with Nova Tuitions.",
  BECOME_REFERRER: "I would like to refer friends to Nova Tuitions.",
  
  // Course specific
  CBSE_INQUIRY: "Can you provide details about CBSE coaching?",
  ICSE_INQUIRY: "Can you provide details about ICSE coaching?",
  STATE_BOARD_INQUIRY: "Can you provide details about State Board coaching?",
  
  // Student/Parent inquiry
  STUDENT_INQUIRY: "I am a student and would like to join your classes.",
  PARENT_INQUIRY: "I am a parent and would like to know more about your tuition program.",
};

/**
 * Generate WhatsApp link with pre-filled message
 * @param message - Message to send
 * @returns Full WhatsApp URL
 */
export const getWhatsAppLink = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `${BASE_URL}?text=${encodedMessage}`;
};

/**
 * Generate WhatsApp link for demo class booking
 * @param subject - Subject name (optional)
 * @param board - Board name (optional)
 * @returns Full WhatsApp URL
 */
export const getWhatsAppDemoLink = (subject?: string, board?: string): string => {
  const message = subject && board 
    ? whatsappMessages.DEMO_CLASS_SUBJECT(subject, board)
    : whatsappMessages.DEMO_CLASS;
  return getWhatsAppLink(message);
};

/**
 * Get WhatsApp number
 * @returns Phone number with country code
 */
export const getWhatsAppNumber = (): string => {
  return WHATSAPP_PHONE;
};

/**
 * Get base WhatsApp URL (without pre-filled message)
 * @returns WhatsApp URL
 */
export const getWhatsAppBase = (): string => {
  return BASE_URL;
};
