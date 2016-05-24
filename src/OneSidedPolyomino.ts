import {Polyomino} from "./Polyomino";
import Set = Immutable.Set;

export class OneSidedPolyomino extends Polyomino {
  symmetries():Set<Polyomino> {
    return this.rotations();
  }
}
