import Viewport from "./viewport";
import GraphSettings, { LabelSetting } from "./graph-settings";
import CanvasContext from "./canvas-context";
import GraphDrawParametersComputor from "./graph-draw-parameters";


const minStep = 0.25;


/**
 * Manages graph grid labels
 */
export default class LabelDrawer {
  constructor(
    private viewport: Viewport,
    private settings: GraphSettings,
    private canvasContext: CanvasContext
  ) { }

  /**
   * Draws graph labels
   * @param pixelsPerValue Pixels per single graph value
   */
  Draw(pixelsPerValue: number): void {
    const paramsComputor = new GraphDrawParametersComputor(
      this.viewport,
      this.canvasContext
    );
    const graphParameters = paramsComputor.GetParameters(pixelsPerValue);
    const ctx = this.canvasContext.Context;
    ctx.strokeStyle = this.settings.labelColor;
    let currentPixelsX = graphParameters.StartingOffsetX;
    let currentX = graphParameters.StartingPointX;
    let currentPixelsY = graphParameters.StartingOffsetY;
    let currentY = graphParameters.StartingPointY;

    const labelSettings = this.settings.labelDisplay.find(s => s.Scale <= this.viewport.Scale);

    // Draw X labels
    while (currentPixelsX < this.canvasContext.Width) {
      this.TryDrawXLabel(ctx, labelSettings, currentPixelsX, currentX, graphParameters.BaseY);
      currentPixelsX += graphParameters.AdjustedPixelsPerValue;
      currentX += minStep;
    }

    // Draw Y labels
    while (currentPixelsY > 0) {
      this.TryDrawYLabel(ctx, labelSettings, currentPixelsY, currentY, graphParameters.BaseX);
      currentPixelsY -= graphParameters.AdjustedPixelsPerValue;
      currentY += minStep;
    }

  }

  /**
   * Draws label on X axis
   * @param ctx Drawing context
   * @param setting Label setting
   * @param pixelsX X coordinate
   * @param x Current x value
   * @param baseY Base Y coordinate
   */
  TryDrawXLabel(ctx: CanvasRenderingContext2D, setting: LabelSetting,
    pixelsX: number, x: number, baseY: number): void {
    if (Math.abs(x % setting.Value) < 0.001) {
      ctx.font = this.settings.labelFont;
      ctx.fillText(x.toString(), pixelsX, baseY + 5);
    }
  }

  /**
   * Draws label on Y axis
   * @param ctx Drawing context
   * @param setting Label setting
   * @param pixelsY Y coordinate
   * @param y Current Y value
   * @param baseX Base X coordinate
   */
  TryDrawYLabel(ctx: CanvasRenderingContext2D, setting: LabelSetting,
    pixelsY: number, y: number, baseX: number): void {
    if (Math.abs(y % setting.Value) < 0.001) {
      ctx.font = this.settings.labelFont;
      ctx.fillText(y.toString(), baseX + 5, pixelsY);
    }
  }

}