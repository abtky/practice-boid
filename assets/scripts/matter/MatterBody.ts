import Matter from 'matter-js';
export default class MatterBody {
    static resources: HTMLImageElement[];
    static initResources(imageFiles: string[]) {
        this.resources = [];
        imageFiles.forEach((imageFile: string) => {
            const image: HTMLImageElement = new Image();
            image.src = imageFile;
            this.resources.push(image);            
        });
    }
    static getRandomResource():HTMLImageElement  {
        const index: number = Math.floor(Math.random() * this.resources.length);
        return this.resources[index];
    }

    public size!: number;
    public body!: Matter.Body;
    public resource!: HTMLImageElement;

    constructor(x: number, y: number) {
        const options: {} = {
            //バウンドさせたい場合はrestitutionに任意の値を渡す
            restitution: .4,
            mass: 0.1,
            friction: 0.01
        }
        this.size = 50;
        this.body = Matter.Bodies.circle(x, y, this.size * .5, options);
        this.resource = MatterBody.getRandomResource();
        const rotate: number = Math.random() * Math.PI * 2;
        Matter.Body.rotate(this.body, rotate);
    }
}