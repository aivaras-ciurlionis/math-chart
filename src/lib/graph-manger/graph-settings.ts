class GraphSettings {
  constructor(params: any) {
    this.drawGrid = params.drawGrid || true;
    this.gridColor = params.gridColor || '#75ea88';
  }
  drawGrid: boolean;
  gridColor: string;
  gridWidth: [
    //-----------------------------
    {
      scale: 5,
      gridWidths: [
        [
          {
            unit: 1,
            width: 2
          },
          {
            unit: 0.25,
            width: 1
          }
        ]
      ]
    },
    //-----------------------------
    {
      scale: 1,
      gridWidths: [
        [
          {
            unit: 5,
            width: 2
          },
          {
            unit: 1,
            width: 1
          }
        ]
      ]
    }
    //-----------------------------
  ]




}

export default GraphSettings;