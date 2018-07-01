import { Text, TextMessage, TextServiceOptions, TextMessageSchema } from 'ts-framework-notification';

export class TextService extends Text {

  /**
   * The singleton service instance.
   */
  protected static instance: TextService;

  /**
   * Gets the singleton Text service.
   * 
   * @param connectionUrl The Text connection url
   */
  public static getInstance(options?: TextServiceOptions): TextService {
    if (!TextService.instance) {
      TextService.instance = new TextService({ ...options });
    }
    return TextService.instance;
  }

  /**
   * Sends a a text message using the SMS gateway.
   *
   * @param options The message options
   */
  public async send(options: TextMessageSchema): Promise<any> {
    return super.send(options);
  }
}
