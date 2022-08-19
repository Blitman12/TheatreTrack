import { Scene } from './scene';

export interface Act {
  _id: string;
  name: string;
  scenes: Scene[];
}
