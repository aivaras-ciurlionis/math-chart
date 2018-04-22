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
   * @param canvasContext Graph container context
   * @param functions Functions evaluation result
   * @param viewport Graph viewport
   * @param pixelsPerValueBase How many pixels per single value for a scale of 1
   */
  Draw(context: CanvasContext, functions: FunctionEvaluationResult[], viewport: Viewport, pixelsPerValueBase: number) {
    const scaledPixelsPerValue = pixelsPerValueBase * viewport.Scale;

    const gridDrawer = new GridDrawer(viewport, this.Settings, context);
    const labelDrawer = new LabelDrawer(viewport, this.Settings, context);
    const functionsDrawer = new FunctionsDrawer(viewport, context, this.Settings, scaledPixelsPerValue);
    if (this.Settings.drawGrid) {
      gridDrawer.DrawGrid(scaledPixelsPerValue);
    }
    if (this.Settings.drawFunctions) {
      functionsDrawer.DrawFunctions(functions);
    }
    if (this.Settings.drawGridLabels) {
      labelDrawer.Draw(scaledPixelsPerValue);
    }
    functions = [];
  }

}

export default GraphDrawer;