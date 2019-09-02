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

    /**
     * ベクトルの正規化（lengthを1にする）
     */
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

    /**
     * ベクトルの大きさを指定した値以下に収める
     * @param max
     */
    truncate(max: number): Vector2D {
        this.length = Math.min(max, this.length);
        return this;
    }

    /**
     * ベクトルの向きを反転する
     */
    reverse(): Vector2D {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    /**
     * このベクトルが正規化されていれば真
     */
    get isNormalized(): boolean {
        return this.length === 1.0;
    }

    /**
     * このベクトルと引数で与えられたベクトルの内積を計算する
     * @param v2
     */
    dotProduct(v2: Vector2D): number {
        return this.x * v2.x + this.y * v2.y;
    }

    /**
     * ２つのベクトルの角度を計算する
     */
    static angleBetween(v1: Vector2D, v2: Vector2D): number {
        if(!v1.isNormalized) {
            v1 = v1.clone().normalize();
        }
        if(!v2.isNormalized) {
            v2 = v2.clone().normalize();
        }
        return Math.acos(v1.dotProduct(v2));
    }

    /**
     * このベクトルに垂直なベクトルを返す
     */
    get perpendicular() {
        return new Vector2D(-this.y, this.x);
    }

    /**
     * 与えられたベクトルがこのベクトルの右側にあるか判定
     * @param v2
     * @return {number} 左側なら−１、右側なら１
     */
    sign(v2: Vector2D): number {
        return this.perpendicular.dotProduct(v2) < 0 ? -1 : 1;
    }

    distSQ(v2: Vector2D): number {
        const dx: number = v2.x - this.x;
        const dy: number = v2.y - this.y;
        return dx * dx + dy * dy;
    }

    /**
     * このベクトルと与えられたベクトルの距離を計算する
     * @param v2
     */
    distance(v2: Vector2D): number {
        return Math.sqrt(this.distSQ(v2));
    }

    /**
     * このベクトルと与えられたベクトルを足した結果を取得
     * @param v2
     */
    add(v2: Vector2D): Vector2D {
        return new Vector2D(this.x + v2.x, this.y + v2.y);
    }

    /**
     * このベクトルから与えられたベクトルを引いた結果を取得
     * @param v2
     */
    subtract(v2: Vector2D): Vector2D {
        return new Vector2D(this.x - v2.x, this.y - v2.y);
    }

    /**
     * このベクトルを与えられた数値で掛けた結果を取得
     * @param value
     */
    mutiply(value: number): Vector2D {
        return new Vector2D(this.x - value, this.y - value);
    }

    /**
     * このベクトルを与えられた数値で割った結果を取得
     * @param value
     */
    divide(value: number): Vector2D {
        return new Vector2D(this.x / value, this.y / value);
    }

    /**
     * このベクトルと与えられたベクトルが等しければ真
     * @param v2
     */
    isEquals(v2: Vector2D): boolean {
        return this.x === v2.x && this.y === v2.y;
    }
}

export default Vector2D;