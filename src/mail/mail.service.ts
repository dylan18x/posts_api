import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import * as nodemailer from 'nodemailer';
import { SendMailDto } from './dto/send-mail.dto';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }
  async sendMail(dto: SendMailDto) {
    console.log('MAIL_USER:', process.env.MAIL_USER);
    console.log('MAIL_PASS:', process.env.MAIL_PASS);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    try {
      const info = await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: dto.to,
        subject: dto.subject,
        html: dto.message,
      });
      return { messageId: info.messageId };
    } catch (error) {
      console.error('ERROR AL ENVIAR CORREO:', error);
      throw new InternalServerErrorException('No se pudo enviar el correo');
    }
  }

  async fetchUserListFromPublicApi() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    return res.data;
  }

  async sendWithResend(dto: SendMailDto) {
    try {
      const res = await this.resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: dto.to,
        subject: dto.subject,
        html: dto.message,
      });

      return res;
    } catch (error) {
      console.error('RESEND ERROR:', error);
      throw new InternalServerErrorException('No se pudo enviar el correo con Resend');
    }
  }
}
