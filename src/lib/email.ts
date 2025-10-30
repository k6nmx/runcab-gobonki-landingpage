import sgMail from '@sendgrid/mail' 

sgMail.setApiKey(process.env.SENDGRID_API_KEY!) 

export async function sendConfirmationEmail( to: string, confirmUrl: string, userType: 'customer' | 'business' ) { 
  const msg = { 
    to, 
    from: process.env.FROM_EMAIL!, 
    templateId: process.env.SENDGRID_TEMPLATE_ID!, 
    dynamicTemplateDate: { confirmUrl: confirmUrl, userType: userType, }, 
  } 
  
  return await sgMail.send(msg) }