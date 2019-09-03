import Vector2D from "./Vector2D";

export default class Vehicle {
    public position: Vector2D;
    public velocity: Vector2D;
    public maxSpeed: number;
    public mass: number;
    constructor() {
        this.position = new Vector2D();
        this.velocity = new Vector2D();
        this.maxSpeed = 2.0;
        this.mass = 2.0;
    }

    update() {
        this.velocity.truncate(this.maxSpeed);
        this.position = this.position.add(this.velocity);
    }
}