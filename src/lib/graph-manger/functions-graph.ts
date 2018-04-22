import MathFuncions, { IFunctionManager } from "../functions-manager/math-functions";
import Viewport from "./viewport";
import GraphDrawer from "./graph-drawer";
import CanvasContext from './canvas-context';


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

/**
 * Class that represents a graph with functions
 */
class FunctionsGraph implements IFunctionManager {

  Functions: MathFuncions;
  GraphDrawer: GraphDrawer;
  Viewport: Viewport;
  Container: string;
  Context: CanvasContext;

  PixelsPerValueBase = 50;

  constructor() {
    this.Functions = new MathFuncions();
    this.GraphDrawer = new GraphDrawer();
  }

  /**
   * Sets a container for a graph
   * @param container Id of html container
   */
  SetContainer(container: string) {
    this.Container = container;
    this.Context = prepareCanvas(this.Container);
  }

  /**
   * Adds a new function to a graph
   * @param functionExpression String function expression
   */
  AddFunction(functionExpression: string): void {
    this.Functions.AddFunction(functionExpression);
    this.Draw();
  }

  /**
   * Removes a function from a graph by index
   * @param index Function index to remove
   */
  RemoveFunction(index: number): void {
    this.Functions.RemoveFunction(index);
    this.Draw();
  }

  /**
   * Sets evaluation boundaries for all functions
   * @param start Function evaluation start
   * @param step Function evaluation step
   * @param count Evaluation step count
   */
  SetEvaluationBoundaries(start: number, step: number, count: number): void {
    this.Functions.SetEvaluationBoundaries(start, step, count);
  }

  /**
   * Sets current viewport
   * @param startX Start x
   * @param startY Start y
   * @param scale Scale
   */
  SetViewport(startX: number, startY: number, scale: number = 1) {
    this.Viewport = new Viewport(startX, startY, scale);
    this.SetEvaluationBoundaries(startX, 0.1, (this.Context.Width / (this.PixelsPerValueBase * scale)) * 10);
  }

  /**
   * Redraws graph with all visible functions
   */
  Draw(): void {
    const evaluation = this.Functions.EvaluateFunctions();
    this.GraphDrawer.Draw(this.Context, evaluation, this.Viewport, this.PixelsPerValueBase);
  }

}

export { FunctionsGraph };