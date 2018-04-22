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

  // Graph transform properties
  dragging: boolean;
  startX: number;
  startY: number;

  PixelsPerValueBase = 50;

  constructor() {
    this.Functions = new MathFuncions();
    this.GraphDrawer = new GraphDrawer();
  }

  /**
   * Initializes resize event listener on canvas
   * @param container Canvas id
   */
  InitResize(container: string): void {
    const canvas = document.getElementById(container);
    const wheelEvt = 'onwheel' in document.createElement('div') ? 'wheel' :
      document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
    canvas.addEventListener(wheelEvt, this.ProcessResize.bind(this));
  }

  /**
   * Initializes dragging
   * @param e Mouse event
   */
  private ProcessMouseDown(e: MouseEvent): void {
    this.dragging = true;
    this.startX = e.x;
    this.startY = e.y;
  }

  /**
   * Stops dragging
   */
  private ProcessMouseUp(): void {
    this.dragging = false;
  }

  /**
   * Processes graph dragging
   * @param e Mouse event
   */
  private ProcessMouseMove(e: MouseEvent): void {
    if (this.dragging) {
      const dx = e.x - this.startX;
      const dy = e.y - this.startY;
      this.SetViewport(
        this.Viewport.StartX -= dx / this.PixelsPerValueBase * this.Viewport.Scale,
        this.Viewport.StartY += dy / this.PixelsPerValueBase * this.Viewport.Scale,
        this.Viewport.Scale
      );
      this.startX = e.x;
      this.startY = e.y;
      this.Draw();
    }
  }

  InitMove(container: string): void {
    const canvas = document.getElementById(container);
    canvas.addEventListener('mousedown', this.ProcessMouseDown.bind(this));
    canvas.addEventListener('mousemove', this.ProcessMouseMove.bind(this));
    canvas.addEventListener('mouseup', this.ProcessMouseUp.bind(this));
  }

  /**
   * Processes graph resize event by increasing/decreasing scale
   * @param event Mouse wheel event
   */
  ProcessResize(event: MouseWheelEvent): void {
    let scale = this.Viewport.Scale;
    if (event.deltaY < 0) {
      scale *= 1.05;
    } else {
      scale /= 1.05;
    }
    this.SetViewport(
      this.Viewport.StartX,
      this.Viewport.StartY,
      scale
    );
    this.Draw();
  }

  /**
   * Sets a container for a graph
   * @param container Id of html container
   */
  SetContainer(container: string) {
    this.Container = container;
    this.Context = prepareCanvas(this.Container);
    this.InitResize(container);
    this.InitMove(container);
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