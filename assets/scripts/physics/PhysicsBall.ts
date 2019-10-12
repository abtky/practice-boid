import Vector2D from "../geom/Vector2D";

export default class PhysicsBall {

    static PIXEL_PER_FOOT: number = 10;
    static GRAVITY: number = 32;

    public position: Vector2D;
    private velocity: Vector2D;
    public radius: number = 12.0;
    private gravity: number = 32;
    private bounce: number = -.6;

    constructor() {
        this.velocity = new Vector2D(40, -10);
        this.position = new Vector2D(1, 40);
    }

    update(elapsedTime: number) {
        const acceleration: Vector2D = new Vector2D(0, PhysicsBall.GRAVITY);

        this.position.x += this.velocity.x * elapsedTime;
        this.position.y += this.velocity.y * elapsedTime;
        this.velocity.x += acceleration.x * elapsedTime;
        this.velocity.y += acceleration.y * elapsedTime;
    }

    bounceX() {
        this.velocity.x *= this.bounce;
    }
    bounceY() {
        this.velocity.y *= this.bounce;
        console.log('this.velocity.y', this.velocity.y);
    }
}