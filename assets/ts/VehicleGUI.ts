import SteeredVehicle from "./SteeredVehicle";
import * as dat from 'dat.gui';

export class VehicleGUI {

    private gui: dat.GUI;
    private sampleObject: SteeredVehicle;
    private variableKeys: string[];
    private target: SteeredVehicle[];
    private intervalId: number = 0;

    constructor() {
        this.target = [];
        this.initContainer();
        this.sampleObject = new SteeredVehicle();
        this.gui = new dat.GUI();
        this.variableKeys = [];
        this.add('maxSpeed', 0, 0.01);
        this.add('maxForce', 0, 1.0);
        this.add('mass', 0, 100);
        this.add('viewDistance', 0, 0.5);
        this.add('closeDistance', 0, 0.2);
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
        this.variableKeys.push(property);
        this.gui.add(this.sampleObject, property, min, max).onChange(() => {
            clearTimeout(this.intervalId);
            this.intervalId = setTimeout(() => {
                this.update()
            }, 200)
        });
    }

    private update() {
        console.log('update', this.target.length);
        const keys: string[] = this.variableKeys;
        this.target.forEach(vehicle => {
            keys.forEach((key: any) => {
                vehicle[key] = this.sampleObject[key];
            });
        });
    }
}

export default VehicleGUI;