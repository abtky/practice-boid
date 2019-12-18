import Matter from 'matter-js';

export default class MatterWorld {
    private width: number;
    private height: number;
    private engine: Matter.Engine;

    constructor(element: HTMLElement) {
        this.width = element.offsetWidth;
        this.height = element.offsetHeight;
        this.engine = Matter.Engine.create();
        const ground: Matter.Body = Matter.Bodies.rectangle(this.width * .5, this.height, this.width, 10, {
            isStatic: true
        });
        console.log('this.width', this.width);
        this.add(ground);
    }
    getSize(): { width: number, height: number } {
        return {
             width: this.width,
             height: this.height
        }
    }
    getEngine(): Matter.Engine {
        return this.engine;
    }
    getAllBodies(): Matter.Body[] {
        return Matter.Composite.allBodies(this.engine.world);
    }
    isContain(object: Matter.Body) {
        const bounds: {
            min: {x: number, y:number},
            max: {x: number, y:number}
        } = object.bounds;
        if (bounds.max.x < 0) {
            return false;
        }
        if (bounds.min.x > this.width) {
            return false;
        }
        if(bounds.min.y > this.height) {
            return false;
        }
        return true;
    }
    add(object: Matter.Body) {
        Matter.World.add(this.engine.world, object);
    }
    remove(object: Matter.Body) {
        Matter.World.remove(this.engine.world, object);
    }
    update() {
        Matter.Engine.update(this.engine);
        const bodies: Matter.Body[] = this.getAllBodies();
        // console.log('num bodies:', bodies.length);
        bodies.forEach((body: Matter.Body) => {
            if (!this.isContain(body)) {
                this.remove(body);
            }
        });
    }
}