import SteeredVehicle from "./SteeredVehicle";
import * as dat from 'dat.gui';

export class VehicleGUI {

    private gui: any;
    private properties: SteeredVehicle;
    private target: SteeredVehicle[];
    private intervalId: number = 0;

    constructor() {
        this.target = [];
        this.initContainer();
        this.gui = new dat.GUI();
        this.properties = new SteeredVehicle();
        this.add('wanderAngle', 0, Math.PI * 2);
        this.add('wanderDistance');
        this.add('wanderRadius');
        this.add('wanderRange', 0, 1);
        this.add('closeDistance', 0, 1);
    }

    initContainer() {
        const elementContainer: NodeListOf<HTMLElement> | undefined = document.querySelectorAll('.dg.ac');
        console.log('elementContainer', elementContainer);
        if(!elementContainer) {
            return;
        }
        elementContainer.forEach(element => {
            element.textContent = null;
        })
    }

    addTarget(vehicles: SteeredVehicle[]) {
        console.time('addTarget');
        this.target.push(...vehicles);
        console.timeEnd('addTarget');
    }

    private add(property: string, min: number = 0, max: number = 100) {
        this.gui.add(this.properties, property, min, max).onChange(() => {
            clearTimeout(this.intervalId);
            this.intervalId = setTimeout(() => {
                this.update()
            }, 200)
        });
    }

    private update() {
        console.log('update');
        this.target.forEach(vehicle => {
            Object.keys(this.properties).forEach((key: any) => {
                vehicle[key] = this.properties[key];
            });
        });
    }
}

export default VehicleGUI;