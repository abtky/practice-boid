import Vector2D from "../geom/Vector2D";

export default class PhysicsBall {

    static PIXEL_PER_FOOT: number = 60; // １フィートあたりのピクセル換算値
    static GRAVITY: number = 32;　// 重力加速度：32ft/s^2


    private position: Vector2D;
    private velocity: Vector2D;
    public radius: number = 30.0;
    private bounce: number = -.96; //

    constructor() {
        this.velocity = new Vector2D(300, -20).divide(PhysicsBall.PIXEL_PER_FOOT);
        this.position = new Vector2D(40, 50).divide(PhysicsBall.PIXEL_PER_FOOT);
    }

    update(elapsedTime: number) {
        const acceleration: Vector2D = new Vector2D(0, PhysicsBall.GRAVITY);

        this.position = this.position.add(this.velocity.multiply(elapsedTime));
        this.velocity = this.velocity.add(acceleration.multiply(elapsedTime));
    }

    /**
     * レンダリング用にフィート→ピクセル換算した座標の取得
     */
    get display(): Vector2D {
        return this.position.multiply(PhysicsBall.PIXEL_PER_FOOT);
    }

    bounceX(displayX: number) {
        this.position.x = displayX / PhysicsBall.PIXEL_PER_FOOT;
        this.velocity.x *= this.bounce;
    }
    bounceY(displayY: number) {
        this.position.y = displayY / PhysicsBall.PIXEL_PER_FOOT;
        this.velocity.y *= this.bounce;
    }
}