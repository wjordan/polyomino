import {Set} from "immutable";
import {Polyomino} from "./Polyomino";

export class OneSidedPolyomino extends Polyomino {
  public symmetries(): Set<Polyomino> {
    return this.rotations().toSet();
  }
}
