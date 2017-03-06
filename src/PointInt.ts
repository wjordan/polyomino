import {Point} from "./Point";

// Truncates all x and y values to integers.
export class PointInt extends Point {
  constructor(x: number, y: number) {
    //noinspection JSSuspiciousNameCombination
    super(Math.trunc(x), Math.trunc(y));
  }
}
