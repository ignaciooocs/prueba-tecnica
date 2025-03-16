import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { verificationEmailHtml } from './templates/verification-email';
import { envs } from 'config/envs';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
      // Crear el transportador usando el servicio de correo (como Gmail, SendGrid, etc.)
      this.transporter = nodemailer.createTransport({
        service: 'gmail', // O el servicio que prefieras (por ejemplo, SendGrid, Mailgun, etc.)
        auth: {
          user: envs.userEmail,
          pass: envs.userPassword, // O una contraseña de aplicación si usas Gmail con autenticación 2FA
        },
      });
    }
  
    // Función para enviar correo con un archivo HTML como cuerpo
    async sendEmail(to: string, subject: string, code: number) {
      // Configuración del correo
      const mailOptions = {
        from: 'Código de verificación',
        to,
        subject,
        html: verificationEmailHtml(code, subject), // HTML será pasado como string
      };
  
      try {
        // Enviar el correo
        const info = await this.transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.messageId);
      } catch (error) {
        console.error('Error al enviar el correo:', error);
      }
    }
  
}

