import MathFuncions, { IFunctionManager } from "../functions-manager/math-functions";
import Viewport from "./viewport";
import GraphDrawer from "./graph-drawer";

/**
 * Class that represents a graph with functions
 */
class FunctionsGraph implements IFunctionManager {

  Functions: MathFuncions;
  GraphDrawer: GraphDrawer;
  Viewport: Viewport;
  Container: string;

  PixelsPerValueBase = 50;

  constructor() {
    this.Functions = new MathFuncions();
    this.GraphDrawer = new GraphDrawer();
    this.Viewport = new Viewport(-5, -5, 1);
  }

  /**
   * Sets a container for a graph
   * @param container Id of html container
   */
  SetContainer(container: string) {
    this.Container = container;
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
   * Redraws graph with all visible functions
   */
  Draw(): void {
    const evaluation = this.Functions.EvaluateFunctions();
    this.GraphDrawer.Draw(this.Container, evaluation, this.Viewport, this.PixelsPerValueBase);
  }

}