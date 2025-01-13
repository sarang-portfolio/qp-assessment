export class ResponseHandler<T> {
  constructor(public data: T, public error: any = null) {}
}

export class MessageHandler {
  constructor(public statusCode: number, public message: string) {}
}
