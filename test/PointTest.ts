import { expect } from "chai";
import {Point} from "../src";

describe("Point", () => {
  it("equals", () => {
    const p1 = new Point(2, 3);
    expect(p1.equals(p1)).to.be.true;
  });

  it("hashCode", () => {
    const p1 = new Point(2, 3);
    expect(p1.hashCode()).to.equal(65);
  });

  it("add", () => {
    const p1 = new Point(2, 3);
    const p2 = new Point(4, 6);
    expect(p1.add(p1).equals(p2)).to.be.true;
  });

  it("applyXY", () => {
    const point: Point = new Point(20, -10);
    const newPoint: Point = point.applyXY((z) => Math.max(-1, Math.min(1, z)));
    expect(newPoint.equals(new Point(1, -1))).to.be.true;
  });
});
