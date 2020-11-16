import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCastException extends HttpException {
  public originError: any;
  constructor(error: any) {
    super(
      error, //JSON.stringify(error, undefined, 2),
      HttpStatus.BAD_REQUEST
    );
    this.originError = error;
  }
} 