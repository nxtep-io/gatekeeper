import { Email, EmailMessage, EmailServiceOptions } from 'ts-framework-notification';
import { EmailMessageSchema } from 'ts-framework-notification/dist/types/email';

export class EmailService extends Email {

  /**
   * The singleton service instance.
   */
  protected static instance: EmailService;

  /**
   * The base locals to all email messages, can be overriden in method locals.
   */
  protected static baseLocals = {
    logo: 'https://i.imgur.com/QTYUAxG.png',
    footer: '<center>nxtep.io</center>',
    company: {
      title: 'gatekeeper',
      subtitle: '<a href="https://www.nxtep.io" style="color: white">www.nxtep.io</a>',
    },
  };

  /**
   * Gets the singleton email service.
   * 
   * @param connectionUrl The email connection url
   */
  public static getInstance(options?: EmailServiceOptions): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService({ 
        debug: options && options.connectionUrl ? false : true, 
        ...options, 
      });
    }
    return EmailService.instance;
  }

  /**
   * Sends an email message.
   *
   * @param options The message options
   */
  public async send(options: EmailMessageSchema): Promise<any> {
    const { locals, ...otherOptions } = options;

    return super.send(new EmailMessage({
      from: 'noreply@nxtep.io',
      locals: {
        ...EmailService.baseLocals,
        ...locals,
      },
      ...otherOptions,
    }));
  }

}
