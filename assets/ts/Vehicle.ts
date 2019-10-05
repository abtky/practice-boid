import Vector2D from "./Vector2D";

export default class Vehicle {
    public position: Vector2D;
    public velocity: Vector2D;
    public maxSpeed: number;
    constructor() {
        this.position = new Vector2D();
        this.velocity = new Vector2D();
        this.maxSpeed = .001;
    }

    update() {
        this.velocity.truncate(this.maxSpeed);
        this.position = this.position.add(this.velocity);
    }
}