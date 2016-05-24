import { expect } from "chai";
import {PointInt} from "../src/PointInt";
const P = PointInt;
type P = PointInt;

describe("Point", () => {
  it("should applyAll", () => {
    const point:P = new P(20, -10);
    const newPoint:PointInt = point.applyBoth(z => Math.max(-1, Math.min(1, z)));
    expect(newPoint.equals(new PointInt(1, -1))).to.be.true;
  });
});
