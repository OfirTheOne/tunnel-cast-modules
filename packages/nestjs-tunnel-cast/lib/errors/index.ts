import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCastException extends HttpException {
  constructor(fieldName: string, error: any) {
    super(
      {
        message: 'Invalid',
        description: `Casting of ${fieldName} failed.`,
        originError: error
      },
      HttpStatus.BAD_REQUEST
    );
  }
} 