import Vehicle from "./Vehicle";
import Vector2D from "../geom/Vector2D";

export default class SteeredVehicle extends Vehicle {

    public maxForce: number;// 操舵力の最大値
    public mass: number;// 質量
    public steeringForce: Vector2D;// 操舵力の合計値

    public viewDistance: number;// 視界に入る距離
    public closeDistance: number;// 近付き判定の距離

    constructor() {
        super();
        this.maxForce = 0.01;
        this.mass = 1.0;
        this.steeringForce = new Vector2D();

        this.viewDistance = .1;
        this.closeDistance = .04;
    }

    update() {
        this.steeringForce.truncate(this.maxForce);
        this.steeringForce = this.steeringForce.divide(this.mass);
        this.velocity = this.velocity.add(this.steeringForce);
        this.steeringForce = new Vector2D();
        super.update();
    }

    /**
     * 追求 (targetの方向へ向かう)
     * @param target
     */
    seek(target: Vector2D) {
        const force: Vector2D = this.calcVelocity(target);
        this.steeringForce = this.steeringForce.add(force);
    }

    /**
     * 逃避 (targetの逆方向へ向かう)
     * @param target
     */
    flee(target: Vector2D) {
        const force: Vector2D = this.calcVelocity(target);
        this.steeringForce = this.steeringForce.subtract(force);
    }

    /**
     * ターゲット方向へ向かう速度を取得
     * @param target
     */
    private calcVelocity(target: Vector2D): Vector2D {
        let desiredVelocity: Vector2D = target.subtract(this.position);
        desiredVelocity.normalize();
        desiredVelocity = desiredVelocity.multiply(this.maxSpeed);
        return desiredVelocity.subtract(this.velocity);
    }

    /**
     * 群行動
     * @param vehicles
     */
    flock(vehicles: Vehicle[]) {
        // 視界内の`vehicle`に絞り込み
        const inViewVehicles: Vehicle[] = vehicles.filter(vehicle => {
            return this.isInView(vehicle);
        });

        let velocityTotal: Vector2D = this.velocity.clone();
        let positionTotal: Vector2D = new Vector2D();
        if (inViewVehicles.length < 1) return;
        inViewVehicles.forEach(vehicle => {
            // 対象が近すぎる場合は逃避
            if(this.isClose(vehicle)) {
                this.flee(vehicle.position);
            }
            velocityTotal = velocityTotal.add(vehicle.velocity);
            positionTotal = positionTotal.add(vehicle.position);
        });
        const averageVelocity: Vector2D = velocityTotal.divide(inViewVehicles.length);
        const averagePosition: Vector2D = positionTotal.divide(inViewVehicles.length);

        // 群の中心へ向かう
        this.seek(averagePosition);

        // 進行方向を群の平均に合わせる
        this.steeringForce = this.steeringForce.add(averageVelocity.subtract(this.velocity));
    }

    /**
     * `target`が自身の視野にいれば真
     * （自身の前方かつ`viewDistance`の距離より近くにいれば真）
     * @param target
     */
    isInView(target: Vehicle): boolean {
        if(this.position.isEquals(target.position) || this.position.distance(target.position) > this.viewDistance) {
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