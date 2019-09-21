import Vehicle from "./Vehicle";
import Vector2D from "./Vector2D";

export default class SteeredVehicle extends Vehicle {

    public maxForce: number;
    public steeringForce: Vector2D;
    public arrivalThreshold: number;

    public wanderAngle: number;
    public wanderDistance: number;
    public wanderRadius: number;
    public wanderRange: number;

    public viewDistance: number;// 視界に入る距離
    public closeDistance: number;// 近付き判定の距離


    constructor() {
        super();
        this.maxForce = 0.3;
        this.steeringForce = new Vector2D();
        this.arrivalThreshold = 100;

        this.wanderAngle = 0;
        this.wanderDistance = 10;
        this.wanderRadius = 5;
        this.wanderRange = 1;

        this.viewDistance = .02;
        this.closeDistance = .03;
    }

    update() {
        this.steeringForce.truncate(this.maxForce);
        this.steeringForce = this.steeringForce.divide(this.mass);
        this.velocity = this.velocity.add(this.steeringForce);
        this.steeringForce = new Vector2D();
        super.update();
    }

    /**
     * 追求
     * @param target
     */
    seek(target: Vector2D) {
        let desiredVelocity: Vector2D = target.subtract(this.position);
        desiredVelocity.normalize();
        desiredVelocity = desiredVelocity.multiply(this.maxSpeed);
        const force: Vector2D = desiredVelocity.subtract(this.velocity);
        this.steeringForce = this.steeringForce.add(force);
    }

    /**
     * 逃避
     * @param target
     */
    flee(target: Vector2D) {
        let desiredVelocity: Vector2D = target.subtract(this.position);
        desiredVelocity.normalize();
        desiredVelocity = desiredVelocity.multiply(this.maxSpeed);
        const force: Vector2D = desiredVelocity.subtract(this.velocity);
        this.steeringForce = this.steeringForce.subtract(force);
    }

    /**
     * 到着（目的に近づくほど減速していく）
     * @param target
     */
    arrive(target: Vector2D) {
        let desiredVelocity: Vector2D = target.subtract(this.position);
        desiredVelocity.normalize();
        const distance: number = this.position.distance(target);
        let speed = this.maxSpeed;
        if (distance < this.arrivalThreshold) {
            speed = this.maxSpeed * distance / this.arrivalThreshold;
        }
        desiredVelocity = desiredVelocity.multiply(speed);
        const force: Vector2D = desiredVelocity.subtract(this.velocity);
        this.steeringForce = this.steeringForce.add(force);
    }

    /**
     * 追跡（対象の距離・進行方向を加味した追求）
     * @param target
     */
    pursue(target: Vehicle) {
        const lookAheadTime = this.position.distance(target.position) / this.maxSpeed;
        const predictedTarget: Vector2D = target.position.add(target.velocity.multiply(lookAheadTime));
        this.seek(predictedTarget);

    }

    /**
     * 回避（対象の距離・進行方向を加味した逃避）
     * @param target
     */
    evade(target: Vehicle) {
        const lookAheadTime = this.position.distance(target.position) / this.maxSpeed;
        const predictedTarget: Vector2D = target.position.add(target.velocity.multiply(lookAheadTime));
        this.flee(predictedTarget);
    }

    /**
     * 徘徊
     */
    wander() {
        const center: Vector2D = this.velocity.clone().normalize().multiply(this.wanderDistance);
        const offset: Vector2D = new Vector2D();
        offset.length = this.wanderRadius;
        offset.angle = this.wanderAngle;
        this.wanderAngle += Math.random() * this.wanderRange - this.wanderRange * .5;
        const force: Vector2D = center.add(offset);
        this.steeringForce = this.steeringForce.add(force);
    }

    /**
     * 群行動
     * @param vehicles
     */
    flock(vehicles: Vehicle[]): void {
        // 視界内の`vehicle`に絞り込み
        const inViewVehicles: Vehicle[] = vehicles.filter(vehicle => {
            return this.isInView(vehicle);
        });

        let velocityTotal: Vector2D = new Vector2D();
        let positionTotal: Vector2D = new Vector2D();
        if (inViewVehicles.length < 1) return;
        inViewVehicles.forEach(vehicle => {
            // 対象が近すぎる場合は逃避
            if(this.isClose(vehicle)) {
                this.evade(vehicle);
            }
            velocityTotal = velocityTotal.add(vehicle.velocity);
            positionTotal = positionTotal.add(vehicle.position);
        });
        const averageVelocity: Vector2D = velocityTotal.divide(inViewVehicles.length);
        const averagePosition: Vector2D = positionTotal.divide(inViewVehicles.length);

        // 群の中心へ向かう
        this.arrive(averagePosition);

        // 進行方向を群の平均に合わせる
        this.steeringForce = this.steeringForce.add(averageVelocity.subtract(this.velocity));
    }

    /**
     * `target`が自身の視野にいれば真
     * （自身の前方かつ`viewDistance`の距離より近くにいれば真）
     * @param target
     */
    isInView(target: Vehicle): boolean {
        if(this.position.distance(target.position) > this.viewDistance) {
            return false;
        }
        const heading: Vector2D = this.velocity.clone().normalize();
        const difference: Vector2D = target.position.subtract(this.position);
        const dotProduct: number = difference.dotProduct(heading);
        return dotProduct >= 0;
    }

    /**
     * `target`が自身の近くにいれば真
     * @param target
     */
    isClose(target: Vehicle): boolean {
        return this.position.distance(target.position) < this.closeDistance;
    }
}