import MathFuncions, { IFunctionManager } from "../functions-manager/math-functions";
import Viewport from "./viewport";
import GraphDrawer from "./graph-drawer";
import CanvasContext from './canvas-context';
import GraphDrawParametersComputor from './graph-draw-parameters';
import GraphSettings from './graph-settings';


const prepareCanvas = (container: any): CanvasContext => {
  let canvas = <HTMLCanvasElement>document.getElementById(`${container}`);
  let context = canvas.getContext('2d');
  context.moveTo(0, 0);
  const canvasContext = new CanvasContext();
  let rect = canvas.getBoundingClientRect();
  canvasContext.Context = context;
  canvasContext.Height = canvas.height;
  canvasContext.Width = canvas.width;
  canvasContext.X = rect.left;
  canvasContext.Y = rect.top;
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
  Settings: GraphSettings;

  // Graph transform properties
  dragging: boolean;
  startX: number;
  startY: number;

  PixelsPerValueBase = 50;

  /**
   * Initialize graph
   * @param settings Initial graph settings
   */
  constructor(settings: any) {
    this.Functions = new MathFuncions();
    this.GraphDrawer = new GraphDrawer();
    this.Settings = new GraphSettings(settings || {});
    this.GraphDrawer.UpdateSettings(settings || {});
  }

  /**
   * Initializes resize event listener on canvas
   * @param container Canvas id
   */
  InitResize(container: string): void {
    if (!this.Settings.canResize) {
      return;
    }
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
    if (!this.Settings.canMove) {
      return;
    }
    this.dragging = true;
    this.startX = e.x;
    this.startY = e.y;
  }

  /**
   * Stops dragging
   */
  private ProcessMouseUp(): void {
    if (!this.Settings.canMove) {
      return;
    }
    this.dragging = false;
  }

  /**
   * Processes graph dragging
   * @param e Mouse event
   */
  private ProcessMouseMove(e: MouseEvent): void {
    if (!this.Settings.canMove) {
      return;
    }
    if (this.dragging) {
      const dx = e.x - this.startX;
      const dy = e.y - this.startY;
      this.SetViewport(
        this.Viewport.StartX -= dx / (this.PixelsPerValueBase * this.Viewport.Scale),
        this.Viewport.StartY += dy / (this.PixelsPerValueBase * this.Viewport.Scale),
        this.Viewport.Scale
      );
      this.startX = e.x;
      this.startY = e.y;
      this.Draw();
    }
  }

  InitMove(container: string): void {
    if (!this.Settings.canMove) {
      return;
    }
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
    event.preventDefault();
    if (!this.Settings.canResize) {
      return;
    }
    let scale = 1;
    if (event.deltaY < 0) {
      scale = 1.05;
    } else {
      scale = 0.95;
    }
    const newScale = this.Viewport.Scale * scale;
    let adb = this.PixelsPerValueBase * this.Viewport.Scale;
    let paramsComputor = new GraphDrawParametersComputor(this.Viewport, this.Context);
    let graphParameters = paramsComputor.GetParameters(adb);
    const fixedEventX = event.x - this.Context.X + window.scrollX;
    const fixedEventY = event.y - this.Context.Y + window.scrollY;
    const currentX = (fixedEventX - graphParameters.BaseX) / adb;
    const currentY = -(fixedEventY - graphParameters.BaseY) / adb;
    const newViewport = new Viewport(this.Viewport.StartX, this.Viewport.StartY, this.Viewport.Scale * scale);
    paramsComputor = new GraphDrawParametersComputor(newViewport, this.Context);
    const newadb = this.PixelsPerValueBase * newScale;
    graphParameters = paramsComputor.GetParameters(newadb);
    const newXC = currentX * newadb + graphParameters.BaseX;
    const newYC = -currentY * newadb + graphParameters.BaseY;
    const dx = (fixedEventX - newXC) / newadb;
    const dy = (fixedEventY - newYC) / newadb;
    this.SetViewport(this.Viewport.StartX - dx, this.Viewport.StartY + dy, this.Viewport.Scale * scale);
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
    this.SetEvaluationBoundaries(startX, 0.1 / scale, (this.Context.Width / (this.PixelsPerValueBase * scale)) * 10 * scale);
  }

  /**
   * Redraws graph with all visible functions
   */
  Draw(): void {
    const evaluation = this.Functions.EvaluateFunctions();
    this.GraphDrawer.Draw(this.Context, evaluation, this.Viewport, this.PixelsPerValueBase);
  }

  /**
   * Updates graph settings
   * @param newSettings Settings replacement object
   */
  UpdateSettings(newSettings: any): void {
    this.GraphDrawer.UpdateSettings(newSettings);
    this.Settings = new GraphSettings(newSettings);
  }

}

export { FunctionsGraph };