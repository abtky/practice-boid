export class Vector2D {

    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    clone(): Vector2D {
        return new Vector2D(this.x, this.y);
    }

    /**
     * ベクトルの大きさが0なら真
     */
    get isZero(): boolean {
        return this.x === 0 && this.y === 0;
    }

    get lengthSQ() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * ベクトルの大きさを取得
     */
    get length(): number {
        return Math.sqrt(this.lengthSQ);
    }

    /**
     * ベクトルの大きさを設定
     * @param value
     */
    set length(value: number) {
        const angle: number = this.angle;
        this.x = Math.cos(angle) * value;
        this.y = Math.sin(angle) * value;
    }

    /**
     * ベクトルの角度を取得
     */
    get angle(): number {
        return Math.atan2(this.y, this.x);
    }

    /**
     * ベクトルの角度を設定
     * @param value
     */
    set angle(value: number) {
        const length = this.length;
        this.x = Math.cos(value) * length;
        this.y = Math.sin(value) * length;
    }

    normalize(): Vector2D {
        if(this.length === 0) {
            // 0ベクトルの場合は(1,0)のベクトルにする
            this.x = 1;
            this.y = 0;
            return this;
        }
        const length = this.length;
        this.x /= length;
        this.y /= length;
        return this;
    }
}

export default Vector2D;