import Matter from 'matter-js';

export default class MatterWorld {
    private width: number;
    private height: number;
    private engine: Matter.Engine;
    //private world: Matter.World;

    constructor(element: HTMLElement) {
        this.width = element.offsetWidth;
        this.height = element.offsetHeight;
        this.engine = Matter.Engine.create();
        const ground: Matter.Body = Matter.Bodies.rectangle(this.width * .5, this.height, this.width, 10, {
            isStatic: true
        });
        console.log('this.width', this.width);
        this.add(ground);
        //this.world = Matter.World.create();
        //console.log('this.composite', this.composite);
    }
    getEngine(): Matter.Engine {
        return this.engine;
    }
    isContain(object: Matter.Body) {

    }
    add(object: Matter.Body) {
        Matter.World.add(this.engine.world, object);
    }
    remove(object: Matter.Body) {
        Matter.World.remove(this.engine.world, object);
    }
    run() {
        Matter.Engine.run(this.engine);
    }
}