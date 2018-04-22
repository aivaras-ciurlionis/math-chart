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
    this.drawGrid = params.drawGrid || true;
    this.gridColor = params.gridColor || '#75ea88';
    this.labelColor = params.labelColor || '#000';
    this.drawGridLabels = params.drawGridLabels || true;
    this.labelFont = params.labelFont || '14px serif';
    this.gridWidths = [
      new GridWidthSetting(5, [new GridWidth(1, 1), new GridWidth(0.25, 0.5, true)]),
      new GridWidthSetting(1, [new GridWidth(5, 1), new GridWidth(1, 1, true)])
    ]
    this.labelDisplay = [
      new LabelSetting(5, 1),
      new LabelSetting(1, 1),
      new LabelSetting(0.2, 5),
      new LabelSetting(0.04, 10)
    ]
  }
  drawGrid: boolean;
  drawGridLabels: boolean;
  gridColor: string;
  gridWidths: GridWidthSetting[];
  labelDisplay: LabelSetting[];
  labelColor: string;
  labelFont: string;
}

export { GridWidth, GridWidthSetting, LabelSetting };
export default GraphSettings;
