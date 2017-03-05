import {Polyomino} from "./Polyomino";
import {Set} from "immutable";

export class OneSidedPolyomino extends Polyomino {
  symmetries():Set<Polyomino> {
    return this.rotations();
  }
}
