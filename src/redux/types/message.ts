export interface IMessage {
  id: string;
  userId: string;
  message: string;
}

export class Message implements IMessage {
  id: string;
  userId: string;
  message: string;

  constructor({ id, userId, message }: IMessage) {
    this.id = id;
    this.userId = userId;
    this.message = message;
  }

  toObject(): IMessage {
    return {
      id: this.id,
      userId: this.id,
      message: this.message,
    };
  }
}
