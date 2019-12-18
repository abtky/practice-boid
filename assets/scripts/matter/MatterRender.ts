import MatterBody from './MatterBody';
import MatterWorld from './MatterWorld';

export default class MatterRender {

    private world: MatterWorld;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private bodies: MatterBody[];

    get dom(): HTMLCanvasElement {
        return this.canvas;
    }

    constructor(world: MatterWorld, canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.bodies = [];
        this.world = world;
        const worldSize: { width: number, height: number } = this.world.getSize();
        this.canvas.width = worldSize.width;
        this.canvas.height = worldSize.height;
    }

    addBody() {
        const worldSize: { width: number, height: number } = this.world.getSize();
        const x: number = Math.random() * worldSize.width;
        const body: MatterBody = new MatterBody(x, -30);

        this.bodies.push(body);
        this.world.add(body.body);
    }

    update() {
        // console.log('this.bodies.length', this.bodies.length);
        this.world.update();
        const tempArray: MatterBody[] = [];
        const { width, height } = this.world.getSize();
        const context: CanvasRenderingContext2D = this.context;
        // context.clearRect(0, 0, width, height);
        context.save();
        context.fillStyle = '#000';
        context.rect(0, 0, width, height);
        context.fill();
        context.restore();
        this.bodies.forEach((mBody: MatterBody) => {
            const body: Matter.Body = mBody.body;
            const image = mBody.resource;
            context.save();
            context.fillStyle = '#f00';
            context.translate(body.position.x, body.position.y);
            context.rotate(body.angle);
            context.beginPath();
            //context.arc(0, 0, mBody.size * .5, 0, Math.PI * 2);
            context.drawImage(image, mBody.size * -.5, mBody.size * -.5, mBody.size, mBody.size);
            context.closePath();
            context.fill();
            context.restore();
            if (this.world.isContain(body)) {
                tempArray.push(mBody);
            } else {
                this.world.remove(body);
            }    
        });
        this.bodies = tempArray;
    }
}