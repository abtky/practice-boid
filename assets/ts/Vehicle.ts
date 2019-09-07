import Vector2D from "./Vector2D";

export default class Vehicle {
    public position: Vector2D;
    public velocity: Vector2D;
    public maxSpeed: number;
    public mass: number;
    constructor() {
        this.position = new Vector2D();
        this.velocity = new Vector2D();
        this.maxSpeed = 8.0;
        this.mass = 10.0;
    }

    update() {
        this.velocity.truncate(this.maxSpeed);
        this.position = this.position.add(this.velocity);
    }

    /**
     *
     * @param vehicles
     */
    static calcAveragePosition(vehicles: Vehicle[]): Vector2D {
        let total: Vector2D = new Vector2D();
        vehicles.forEach((vehicle: Vehicle) => {
            total = total.add(vehicle.position);
        });
        return total.divide(vehicles.length);
    }

    /**
     *
     * @param vehicles
     */
    static calcAverageVelocity(vehicles: Vehicle[]): Vector2D {
        let total: Vector2D = new Vector2D();
        vehicles.forEach((vehicle: Vehicle) => {
            total = total.add(vehicle.velocity);
        });
        return total.divide(vehicles.length);
    }
}