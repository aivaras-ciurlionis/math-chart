import FunctionEvaluationResult from "../functions-manager/function-evaluation-result";
import Viewport from "./viewport";
import GraphSettings from "./graph-settings";
import CanvasContext from "./canvas-context";
import GridDrawer from "./grid-drawer";
import LabelDrawer from "./label-drawer";
import FunctionsDrawer from "./functions-drawer";

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
    const scaledPixelsPerValue = pixelsPerValueBase * viewport.Scale;

    const gridDrawer = new GridDrawer(viewport, this.Settings, context);
    const labelDrawer = new LabelDrawer(viewport, this.Settings, context);
    const functionsDrawer = new FunctionsDrawer(viewport, context, this.Settings, scaledPixelsPerValue);
    if (this.Settings.drawGrid) {
      gridDrawer.DrawGrid(scaledPixelsPerValue);
    }
    if (this.Settings.drawGridLabels) {
      labelDrawer.Draw(scaledPixelsPerValue);
    }
    if (this.Settings.drawFunctions) {
      functionsDrawer.DrawFunctions(functions);
    }
    functions = [];
  }

  DrawLabel(ctx: CanvasRenderingContext2D, value: string, x: number, y: number): void {
    if (this.Settings.drawGridLabels) {
      ctx.font = '14px serif';
      ctx.fillText(value, x, y);
    }
  }




}

export default GraphDrawer;