import FunctionEvaluationResult from "../functions-manager/function-evaluation-result";
import Viewport from "./viewport";
import GraphSettings from "./graph-settings";
import CanvasContext from "./canvas-context";
import GraphDrawParametersComputor, { GraphDrawParameters } from './graph-draw-parameters';


/**
 * Manages drawing of functions in a graph
 */
export default class FunctionsDrawer {
  GraphParameters: GraphDrawParameters;

  constructor(
    private viewport: Viewport,
    private canvasContext: CanvasContext,
    private graphSettings: GraphSettings,
    private pixelsPerValue: number
  ) {
    const paramsComputor = new GraphDrawParametersComputor(
      this.viewport,
      this.canvasContext
    );
    this.GraphParameters = paramsComputor.GetParameters(pixelsPerValue);
  }

  /**
   * Draws given functions in a graph
   * @param functions Functions to draws
   */
  DrawFunctions(functions: FunctionEvaluationResult[]): void {
    functions.forEach((f, i) => this.DrawFunction(f, i));
  }

  /**
   * Draws a single function in a graph
   * @param evaluatedFunction Function
   * @param index Index of a function
   */
  DrawFunction(evaluatedFunction: FunctionEvaluationResult, index: number): void {
    const ctx = this.canvasContext.Context;
    ctx.strokeStyle = this.graphSettings.functionColors[index];
    ctx.setLineDash([]);
    const results = evaluatedFunction.Results;
    for (var i = 0; i < results.length - 1; i++) {
      if (results[i].isDefined && results[i + 1].isDefined) {

        var y0 = this.GraphParameters.BaseY - results[i].y * this.pixelsPerValue;
        var y1 = this.GraphParameters.BaseY - results[i + 1].y * this.pixelsPerValue;
        if (Math.abs(y0 - y1) > 1000) {
            continue;
        }

        ctx.beginPath();

        ctx.moveTo(
          this.GraphParameters.BaseX + results[i].x * this.pixelsPerValue,
          y0
        );
        ctx.lineTo(
          this.GraphParameters.BaseX + results[i + 1].x * this.pixelsPerValue,
          y1
        );
        ctx.closePath();
        ctx.stroke();
      }
    }
  }

}