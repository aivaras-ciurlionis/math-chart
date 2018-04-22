import Viewport from "./viewport";
import CanvasContext from "./canvas-context";

/**
 * Holds variables required for drawing a graph
 */
export class GraphDrawParameters {
  constructor(
    startingPointX: number,
    startingOffsetX: number,
    adjustedPixelsPerValue: number,
    startingPointY: number,
    startingOffsetY: number,
    baseX: number,
    baseY: number
  ) {
    this.StartingPointX = startingPointX;
    this.StartingOffsetX = startingOffsetX;
    this.AdjustedPixelsPerValue = adjustedPixelsPerValue;
    this.StartingPointY = startingPointY;
    this.StartingOffsetY = startingOffsetY;
    this.BaseX = baseX;
    this.BaseY = baseY;
  }
  StartingPointX: number;
  StartingOffsetX: number;
  AdjustedPixelsPerValue: number;
  StartingPointY: number;
  StartingOffsetY: number;
  BaseX: number;
  BaseY: number;
}

const minStep = 0.25;


/**
 * Computes graph drawing parameters
 */
export default class GraphDrawParametersComputor {

  constructor(
    private viewport: Viewport,
    private canvasContext: CanvasContext
  ) { }

  /**
   * Returns nearest min step to given value
   * @param value Numerical value
   * @returns Nearest min step value
   */
  GetNearestValidPoint(value: number): number {
    const scale = value / minStep;
    return Math.ceil(scale) * minStep;
  }

  /**
   * Computes and returns graph drawing parameters
   * @param pixelsPerValue How many pixels a single graph value take
   * @returns Graph drawing parameters
   */
  GetParameters(pixelsPerValue: number): GraphDrawParameters {
    const startingPointX = this.GetNearestValidPoint(this.viewport.StartX);
    const startingOffsetX = (startingPointX - this.viewport.StartX) * pixelsPerValue;
    const adjustedPixelsPerValue = pixelsPerValue * minStep;
    const startingPointY = this.GetNearestValidPoint(this.viewport.StartY);
    const startingOffsetY = this.canvasContext.Height - (startingPointY - this.viewport.StartY) * pixelsPerValue;

    const baseY = this.canvasContext.Height + this.viewport.StartY * pixelsPerValue;
    const baseX = -this.viewport.StartX * pixelsPerValue;

    return new GraphDrawParameters(
      startingPointX,
      startingOffsetX,
      adjustedPixelsPerValue,
      startingPointY,
      startingOffsetY,
      baseX,
      baseY
    );
  }

}