import Vehicle from "./Vehicle";
import Vector2D from "./Vector2D";

export default class SteeredVehicle extends Vehicle {

    public maxForce: number;
    public steeringForce: Vector2D;

    constructor() {
        super();
        this.maxForce = 0.1;
        this.steeringForce = new Vector2D();
    }

    update() {
        this.steeringForce.truncate(this.maxForce);
        this.steeringForce = this.steeringForce.divide(this.mass);
        this.velocity = this.velocity.add(this.steeringForce);
        this.steeringForce = new Vector2D();
        super.update();
    }

    /**
     * 追跡
     */
    seek(target: Vector2D) {
        let desiredVelocity: Vector2D = target.subtract(this.position);
        desiredVelocity.normalize();
        desiredVelocity = desiredVelocity.multiply(this.maxSpeed);
        const force: Vector2D = desiredVelocity.subtract(this.velocity);
        this.steeringForce = this.steeringForce.add(force);
    }
}