import SteeredVehicle from "./SteeredVehicle";
import * as dat from 'dat.gui';

export class VehicleGUI {

    private gui: any;
    private properties: SteeredVehicle;
    private target: SteeredVehicle[];

    constructor() {
        this.target = [];
        this.gui = new dat.GUI();
        this.properties = new SteeredVehicle();
        this.add('wanderAngle', 0, Math.PI * 2);
        this.add('wanderDistance');
        this.add('wanderRadius');
        this.add('wanderRange', 0, 1);
    }

    addTarget(vehicles: SteeredVehicle[]) {
        this.target.push(...vehicles);
    }

    private add(property: string, min: number = 0, max: number = 100) {
        this.gui.add(this.properties, property, min, max).onChange(() => this.update());
    }

    private update() {
        console.log('update');
        this.target.forEach(vehicle => {
            Object.keys(this.properties).forEach((key: string) => {
                vehicle[key] = this.properties[key];
            });
        });
    }
}

export default VehicleGUI;