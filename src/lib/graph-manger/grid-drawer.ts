import Viewport from "./viewport";
import GraphSettings, { GridWidthSetting } from "./graph-settings";
import CanvasContext from "./canvas-context";
import GraphDrawParametersComputor from './graph-draw-parameters';

const minStep = 0.25;



export default class GridDrawer {
  constructor(
    private viewport: Viewport,
    private settings: GraphSettings,
    private canvasContext: CanvasContext
  ) { }

  DrawGrid(pixelsPerValue: number): void {
    const paramsComputor = new GraphDrawParametersComputor(
      this.viewport,
      this.canvasContext
    );

    const graphParameters = paramsComputor.GetParameters(pixelsPerValue);

    let ctx = this.canvasContext.Context;
    ctx.strokeStyle = this.settings.gridColor;

    let currentPixelsX = graphParameters.StartingOffsetX;
    let currentX = graphParameters.StartingPointX;
    const scaleSettings = this.settings.gridWidths.find(s => s.Scale <= this.viewport.Scale);

    // Draw vertical grid
    while (currentPixelsX < this.canvasContext.Width) {
      this.TryDrawVertical(ctx, scaleSettings, currentPixelsX, currentX, this.canvasContext.Height);
      currentPixelsX += graphParameters.AdjustedPixelsPerValue;
      currentX += minStep;
    }

    // Draw horizontal grid
    let currentPixelsY = graphParameters.StartingOffsetY;
    let currentY = graphParameters.StartingPointY;

    while (currentPixelsY > 0) {
      this.TryDrawHorizontal(ctx, scaleSettings, currentPixelsY, currentY, this.canvasContext.Width);
      currentPixelsY -= graphParameters.AdjustedPixelsPerValue;
      currentY += minStep;
    }
  }

  TryDrawVertical(ctx: CanvasRenderingContext2D, settings: GridWidthSetting,
    pixelsX: number, x: number, height: number): void {
    let gridValue = settings.GridWidths.find((s: any) => Math.abs(x % s.unit) < 0.0001);
    if (gridValue) {
      ctx.beginPath();
      if (gridValue.dash) {
        ctx.setLineDash([5]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.lineWidth = Math.abs(x) < 0.001 ? 2 : gridValue.width;
      ctx.moveTo(pixelsX, 0);
      ctx.lineTo(pixelsX, height);
      ctx.stroke();
    }
  }

  TryDrawHorizontal(ctx: CanvasRenderingContext2D, settings: GridWidthSetting,
    pixelsY: number, y: number, width: number): void {
    let gridValue = settings.GridWidths.find(s => Math.abs(y % s.unit) < 0.0001);
    if (gridValue) {
      ctx.beginPath();
      if (gridValue.dash) {
        ctx.setLineDash([5]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.lineWidth = Math.abs(y) < 0.001 ? 2 : gridValue.width;
      ctx.moveTo(0, pixelsY);
      ctx.lineTo(width, pixelsY);
      ctx.stroke();
    }
  }

}