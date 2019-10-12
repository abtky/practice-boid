import SteeredVehicle from './SteeredVehicle';

export type Point = {
    x: number,
    y: number
}
export type SimpleVehicle = {
    position: Point,
    velocity: Point,
    maxSpeed: number,
    maxForce: number,
    mass: number,
    viewDistance: number,
    closeDistance: number
}
class WorkerController {
    private worker: Worker;
    private vehicles: SteeredVehicle[];
    private isPlay: boolean;
    constructor(worker: Worker) {
        this.worker = worker;
        this.vehicles = [];
        this.isPlay = false;
    }

    init(vehicles: SteeredVehicle[]) {
        this.worker.addEventListener('message', e => {
            // console.time('onMessage');
            const { data } = e;
            const receivedList: SimpleVehicle[] = JSON.parse(data);
            this.updateVehicles(receivedList);
            this.postToWorker();
            // console.timeEnd('onMessage');
        });
        this.vehicles = vehicles;
    }

    public play() {
        if (this.isPlay) { return }
        this.isPlay = true;
        this.postToWorker();
    }

    public pause() {
        this.isPlay = false;
    }

    private postToWorker() {
        if (!this.isPlay) { return }
        const simpleList: SimpleVehicle[] = WorkerController.simplify(this.vehicles);
        this.worker.postMessage(JSON.stringify(simpleList));
    }

    private updateVehicles(simpleList:SimpleVehicle[]) {
        this.vehicles.forEach((vehicle: SteeredVehicle, i: number) => {
            if(simpleList[i]) {
                vehicle.velocity.x = simpleList[i].velocity.x;
                vehicle.velocity.y = simpleList[i].velocity.y;
            }
        });
    }

    static simplify(vehicles: SteeredVehicle[]): SimpleVehicle[] {
        return vehicles.map( (vehicle: SteeredVehicle) => {
            return {
                position: {
                    x: vehicle.position.x,
                    y: vehicle.position.y
                },
                velocity: {
                    x: vehicle.velocity.x,
                    y: vehicle.velocity.y
                },
                maxSpeed: vehicle.maxSpeed,
                maxForce: vehicle.maxForce,
                mass: vehicle.mass,
                viewDistance: vehicle.viewDistance,
                closeDistance: vehicle.closeDistance
            }
        });
    }

    static generateFromSimpleList(simpleList:SimpleVehicle[]): SteeredVehicle[] {
        return simpleList.map(v => {
            const vehicle: SteeredVehicle = new SteeredVehicle();
            vehicle.position.x = v.position.x;
            vehicle.position.y = v.position.y;
            vehicle.velocity.x = v.velocity.x;
            vehicle.velocity.y = v.velocity.y;
            vehicle.maxSpeed = v.maxSpeed,
            vehicle.maxForce = v.maxForce,
            vehicle.mass = v.mass,
            vehicle.viewDistance = v.viewDistance,
            vehicle.closeDistance = v.closeDistance
            return vehicle;
        });
    }
}
export default WorkerController;