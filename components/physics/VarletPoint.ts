import Rectangle from './Rectangle';

export class VarletPoint {

    public x: number;
    public y: number;
    private pastX: number;
    private pastY: number;

    constructor(x: number, y: number) {
        this.setPosition(x, y);
    }

    update() {
        const tempX: number = this.x;
        const tempY: number = this.y;
        this.x += this.vx;
        this.y += this.vy;
        this.pastX = tempX;
        this.pastY = tempY;
    }

    setPosition(x: number, y: number) {
        this.x = this.pastX = x;
        this.y = this.pastY = y;
    }

    // 点を矩形の中に収める
    constrain(rectangle: Rectangle) {
        this.x = Math.max(rectangle.left, Math.min(rectangle.right, this.x));
        this.y = Math.max(rectangle.top, Math.min(rectangle.bottom, this.y));
    }

    set vx(value: number) {
        this.pastX = this.x - value;
    }

    get vx(): number {
        return this.x - this.pastX;
    }

    set vy(value: number) {
        this.pastY = this.y - value;
    }

    get vy(): number {
        return this.y - this.pastY;
    }
}

export default VarletPoint;