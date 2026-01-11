import Mailgen from "mailgen"
import nodemailer from "nodemailer"

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "AuthEngine",
            link: "https://authengine-demo.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)

    const emailHTML = mailGenerator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail = {
        from: "no-reply@authengine.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHTML
    }

    try{
        transporter.sendMail(mail)
    }
    catch{
        console.error("Mail service failed silently. make sure you have provided your MAILTRAP credentials in the .env file")
        console.error("Error: ", error)
    }
}



const emailVerificationMailgenContent = (username, verificationURL) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App! We' are excited to have you on board.",
            action: {
                instructions: "To verify your Email, please click on the following button",
                button: {
                    color: "#22BC66",
                    text: "Verify your Email",
                    link: verificationURL
                },
            },
            outro: "Need any help, or have questions? Just reply to this email, we'd love to help.",
        },
    }
}

const forgotPasswordMailgenContent = (username, passwordResetURL) => {
    return {
        body: {
            name: username,
            intro: "we got a request to reset the password of your account",
            action: {
                instructions: "To reset the password, please click on the following button or link",
                button: {
                    color: "#22BC66",
                    text: "Reset your password",
                    link: passwordResetURL
                },
            },
            outro: "Need any help, or have questions? Just reply to this email, we'd love to help.",
        },
    }
}

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
}