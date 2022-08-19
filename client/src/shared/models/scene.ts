import { Actor } from './actor';

export interface Scene {
  _id: string;
  name: string;
  actors: Actor[];
}
