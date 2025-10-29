import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendConfirmationEmail(
  to: string,
  confirmUrl: string,
  userType: "customer" | "business"
) {
  // Map to the template variables the template expects:
  const dynamicTemplateData = {
    confirmUrl,                        
    userBusiness: userType === "business",
  };

  const msg = {
    to,
    from: process.env.FROM_EMAIL!,
    templateId: process.env.SENDGRID_TEMPLATE_ID!,
    dynamicTemplateData, // <-- correct property name
  };

  try {
    console.log("Sending confirmation email payload:", {
      to: msg.to,
      templateId: msg.templateId,
      dynamicTemplateData,
    });
    const res = await sgMail.send(msg);
    console.log("SendGrid response:", res);
    return res;
  } catch (error: unknown) {
  // Now you must narrow the type before using it
  if (error instanceof Error) {
    console.error("SendGrid error:", error.message);
  } else if (typeof error === "object" && error !== null && "response" in error) {
    const sgError = error as { response?: { body?: unknown } };
    console.error("SendGrid error response body:", sgError.response?.body);
  } else {
    console.error("Unknown error:", error);
  }
  throw error;
}
}
