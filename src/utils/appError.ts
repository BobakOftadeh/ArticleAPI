class AppError extends Error {
  statusCode: number;
  status: string;

  constructor(message: string, incomingStatusCode: number) {
    super(message);
    this.statusCode = incomingStatusCode;
    this.status = `${incomingStatusCode}`.startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
