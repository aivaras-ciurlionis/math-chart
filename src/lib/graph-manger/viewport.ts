class Viewport {
    constructor(x: number, y: number, scale: number) {
        this.StartX = x;
        this.StartX = y;
        this.Scale = scale;
    }
    Scale: number;
    StartX: number;
    StartY: number;
}

export default Viewport;