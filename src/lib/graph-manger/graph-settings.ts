class GridWidth {
  constructor(unit: number, width: number, dash: boolean = false, label: boolean = true) {
    this.unit = unit;
    this.width = width;
    this.dash = dash;
    this.label = label;
  }
  unit: number;
  width: number;
  dash: boolean;
  label: boolean;
}

class GridWidthSetting {
  constructor(scale: number, widths: GridWidth[]) {
    this.Scale = scale;
    this.GridWidths = widths;
  }
  GridWidths: GridWidth[];
  Scale: number;
}

class GraphSettings {
  constructor(params: any) {
    this.drawGrid = params.drawGrid || true;
    this.gridColor = params.gridColor || '#75ea88';
    this.drawGridLabels = params.drawGridLabels || true;
    this.gridWidths = [
      new GridWidthSetting(5, [new GridWidth(1, 1), new GridWidth(0.25, 0.5, true, false)]),
      new GridWidthSetting(1, [new GridWidth(5, 1), new GridWidth(1, 1, true)])
    ]
  }
  drawGrid: boolean;
  drawGridLabels: boolean;
  gridColor: string;
  gridWidths: GridWidthSetting[];
}

export { GridWidth, GridWidthSetting };
export default GraphSettings;
