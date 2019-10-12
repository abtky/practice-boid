export class Rectangle {

    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get left(): number {
        return this.x;
    }

    get top(): number {
        return this.y;
    }

    get right(): number {
        return this.width - this.x;
    }

    get bottom(): number {
        return this.height - this.y;
    }
}

export default Rectangle;