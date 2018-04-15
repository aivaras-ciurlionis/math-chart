import FunctionEvaluationResult from "../functions-manager/function-evaluation-result";
import Viewport from "./viewport";
import GraphSettings, { GridWidthSetting } from "./graph-settings";
import CanvasContext from "./canvas-context";

const minStep = 0.25;

/**
 * Class that performs functions drawing in graph
 */
const prepareCanvas = (container: any): CanvasContext => {
  let canvas = <HTMLCanvasElement>document.getElementById(`${container}`);
  let context = canvas.getContext('2d');
  context.moveTo(0, 0);
  const canvasContext = new CanvasContext();
  canvasContext.Context = context;
  canvasContext.Height = canvas.height;
  canvasContext.Width = canvas.width;
  return canvasContext;
}

class GraphDrawer {
  Settings: GraphSettings = new GraphSettings({});

  /**
   * Updates current drawer settings
   * @param settings Graph settings
   */
  UpdateSettings(settings: GraphSettings) {
    this.Settings = settings;
  }

  /**
   * Draw funtion evaluation results in a graph
   * @param container Graph container
   * @param functions Functions evaluation result
   * @param viewport Graph viewport
   * @param pixelsPerValueBase How many pixels per single value for a scale of 1
   */
  Draw(container: string, functions: FunctionEvaluationResult[], viewport: Viewport, pixelsPerValueBase: number) {
    const context = prepareCanvas(container);
    if (this.Settings.drawGrid) {
      this.DrawGrid(viewport, pixelsPerValueBase * viewport.Scale, context);
    }
    functions = [];
  }

  GetNearestValidPoint(value: number): number {
    const scale = value / minStep;
    return Math.ceil(scale) * minStep;
  }

  DrawLabel(ctx: CanvasRenderingContext2D, value: string, x: number, y: number): void {
    if (this.Settings.drawGridLabels) {
      ctx.font = '14px serif';
      ctx.fillText(value, x, y);
    }
  }

  TryDrawVertical(ctx: CanvasRenderingContext2D, settings: GridWidthSetting,
    pixelsX: number, x: number, height: number, baseY: number) {
    let gridValue = settings.GridWidths.find((s: any) => Math.abs(x % s.unit) < 0.0001);
    if (gridValue) {
      ctx.beginPath();
      if (gridValue.dash) {
        ctx.setLineDash([5]);
      } else {
        ctx.setLineDash([]);
      }
      if (gridValue.label) {
        this.DrawLabel(ctx, x.toString(), pixelsX, baseY + 5);
      }
      ctx.lineWidth = Math.abs(x) < 0.001 ? 2 : gridValue.width;
      ctx.moveTo(pixelsX, 0);
      ctx.lineTo(pixelsX, height);
      ctx.stroke();
    }
  }

  TryDrawHorizontal(ctx: CanvasRenderingContext2D, settings: GridWidthSetting,
    pixelsY: number, y: number, width: number, baseX: number) {
    let gridValue = settings.GridWidths.find(s => Math.abs(y % s.unit) < 0.0001);
    if (gridValue) {
      ctx.beginPath();
      if (gridValue.dash) {
        ctx.setLineDash([5]);
      } else {
        ctx.setLineDash([]);
      }
      if (gridValue.label) {
        this.DrawLabel(ctx, y.toString(), baseX + 5, pixelsY);
      }
      ctx.lineWidth = Math.abs(y) < 0.001 ? 2 : gridValue.width;
      ctx.moveTo(0, pixelsY);
      ctx.lineTo(width, pixelsY);
      ctx.stroke();
    }
  }

  DrawGrid(viewport: Viewport, pixelsPerValue: number, context: CanvasContext) {
    let ctx = context.Context;
    ctx.strokeStyle = this.Settings.gridColor;
    const startingPointX = this.GetNearestValidPoint(viewport.StartX);
    const startingOffsetX = (startingPointX - viewport.StartX) * pixelsPerValue;
    const adjustedPixelsPerValue = pixelsPerValue * minStep;
    let currentPixelsX = startingOffsetX;
    let currentX = startingPointX;
    const scaleSettings = this.Settings.gridWidths.find(s => s.Scale <= viewport.Scale);

    const baseY = context.Height + viewport.StartY * pixelsPerValue;
    const baseX = -viewport.StartX * pixelsPerValue;

    // Draw vertical grid
    while (currentPixelsX < context.Width) {
      this.TryDrawVertical(ctx, scaleSettings, currentPixelsX, currentX, context.Height, baseY);
      currentPixelsX += adjustedPixelsPerValue;
      currentX += minStep;
    }

    // Draw horizontal grid
    const startingPointY = this.GetNearestValidPoint(viewport.StartY);
    const startingOffsetY = context.Height - (startingPointY - viewport.StartY) * pixelsPerValue;
    let currentPixelsY = startingOffsetY;
    let currentY = startingPointY;

    while (currentPixelsY > 0) {
      this.TryDrawHorizontal(ctx, scaleSettings, currentPixelsY, currentY, context.Width, baseX);
      currentPixelsY -= adjustedPixelsPerValue;
      currentY += minStep;
    }
  }

}

export default GraphDrawer;