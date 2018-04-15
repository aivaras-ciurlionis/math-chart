import FunctionEvaluationResult from "../functions-manager/function-evaluation-result";
import Viewport from "./viewport";
import GraphSettings from "./graph-settings";
import CanvasContext from "./canvas-context";

const minStep = 0.25;

/**
 * Class that performs functions drawing in graph
 */
const prepareCanvas = (container: any): CanvasContext => {
  let canvas = document.getElementById(`${container}`);
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
  }

  GetNearestValidPoint(value: number): number {
    const scale = value / minStep;
    return Math.ceil(scale) * minStep;
  }

  TryDrawVertical(ctx: any, settings: any, pixelsX: number, x: number, height: number) {
    let gridValue = settings.find((s:any) => x % s.unit < 0.0001);
    if (gridValue) {
      ctx.lineWidth = gridValue.width;
      ctx.moveTo(pixelsX, 0);
      ctx.lineTo(pixelsX, height);
      ctx.stroke();
    }
  }

  TryDrawHorizontal(ctx: any, settings: any, pixelsY: number, y: number, width: number) {
    let gridValue = settings.find((s:any) => y % s.unit < 0.0001);
    if (gridValue) {
      ctx.lineWidth = gridValue.width;
      ctx.moveTo(0, pixelsY);
      ctx.lineTo(width, pixelsY);
      ctx.stroke();
    }
  }

  DrawGrid(viewport: Viewport, pixelsPerValue: number, context: CanvasContext) {
    let ctx = context.Context;
    ctx.fillStyle = this.Settings.gridColor;
    const startingPointX = this.GetNearestValidPoint(viewport.StartX);
    const startingOffsetX = (startingPointX - viewport.StartX) * pixelsPerValue;
    const adjustedPixelsPerValue = pixelsPerValue * minStep;
    let currentPixelsX = startingOffsetX;
    let currentX = startingPointX;
    const scaleSettings = this.Settings.gridWidth.find(s => s.scale < viewport.Scale);

    // Draw vertical grid
    while (currentPixelsX < context.Width) {
      this.TryDrawVertical(ctx, scaleSettings, currentPixelsX, currentX, context.Height);
      currentPixelsX += adjustedPixelsPerValue;
      currentX += minStep;
    }

    const startingPointY = this.GetNearestValidPoint(viewport.StartY);
    const startingOffsetY = (startingPointY - viewport.StartY) * pixelsPerValue;
    let currentPixelsY = startingOffsetY;
    let currentY = startingPointY;

    // Draw horizontal grid
    while (currentPixelsY > 0) {
      this.TryDrawHorizontal(ctx, scaleSettings, currentPixelsY, currentY, context.Width);
      currentPixelsY -= adjustedPixelsPerValue;
      currentY -= minStep;
    }
  }

}

export default GraphDrawer;