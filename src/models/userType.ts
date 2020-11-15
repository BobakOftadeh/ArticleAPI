import { Document } from 'mongoose';

export interface userType extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string | undefined;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}
