import { Document } from "mongoose";

export default interface Iuser extends Document {
  username: string;
}

export interface InewUser {
  username: string;
  password: string;
}