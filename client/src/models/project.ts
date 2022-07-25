import { Act } from "./act";
import { Actor } from "./actor";
import { Staff } from "./staff";

export interface Project {
    _id: string;
    name: string;
    heroImage: string; 
    actors: Actor[];
    staff: Staff[];
    acts: Act[];
}
