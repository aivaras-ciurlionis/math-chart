class GridWidth {
  constructor(unit: number, width: number, dash: boolean = false) {
    this.unit = unit;
    this.width = width;
    this.dash = dash;
  }
  unit: number;
  width: number;
  dash: boolean;
}

class GridWidthSetting {
  constructor(scale: number, widths: GridWidth[]) {
    this.Scale = scale;
    this.GridWidths = widths;
  }
  GridWidths: GridWidth[];
  Scale: number;
}

class LabelSetting {
  constructor(scale: number, value: number) {
    this.Value = value;
    this.Scale = scale;
  }
  Value: number;
  Scale: number;
}

class GraphSettings {
  constructor(params: any) {
    this.drawGrid = params.drawGrid === undefined ? true : params.drawGrid;
    this.drawFunctions = params.drawFunctions === undefined ? true : params.drawFunctions;
    this.gridColor = params.gridColor || '#75ea88';
    this.labelColor = params.labelColor || '#000';
    this.drawGridLabels = params.drawGridLabels === undefined ? true : params.drawGridLabels;
    this.labelFont = params.labelFont || '14px serif';
    this.canResize = params.canResize === undefined ? true : params.canResize;
    this.canMove = params.canMove === undefined ? true : params.canMove;
    this.functionColors = params.functionColors || [
      '#4286f4',
      '#f44141',
      '#1c9620',
      '#e8a23a'
    ]
    this.gridWidths = [
      new GridWidthSetting(2, [new GridWidth(1, 1), new GridWidth(0.25, 0.5, true)]),
      new GridWidthSetting(0.2, [new GridWidth(5, 1), new GridWidth(1, 1, true)]),
      new GridWidthSetting(0.1, [new GridWidth(20, 2), new GridWidth(5, 1)]),
      new GridWidthSetting(Number.EPSILON, [new GridWidth(50, 2), new GridWidth(10, 1)])
    ]
    this.labelDisplay = [
      new LabelSetting(2, 1),
      new LabelSetting(0.2, 1),
      new LabelSetting(0.1, 5),
      new LabelSetting(Number.EPSILON, 10)
    ]
  }
  canResize: boolean;
  canMove: boolean;
  drawGrid: boolean;
  drawGridLabels: boolean;
  drawFunctions: boolean;
  gridColor: string;
  gridWidths: GridWidthSetting[];
  labelDisplay: LabelSetting[];
  labelColor: string;
  labelFont: string;
  functionColors: string[];
}

export { GridWidth, GridWidthSetting, LabelSetting };
export default GraphSettings;
