class GridWidth {
  constructor(unit: number, width: number) {
    this.unit = unit;
    this.width = width;
  }
  unit: number;
  width: number;
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
    this.gridWidths = [
      new GridWidthSetting(5, [new GridWidth(1, 2), new GridWidth(0.25, 1)]),
      new GridWidthSetting(1, [new GridWidth(5, 2), new GridWidth(1, 1)])
    ]
  }
  drawGrid: boolean;
  gridColor: string;
  gridWidths: GridWidthSetting[];
}

export {GridWidth,  GridWidthSetting };
export default GraphSettings;
