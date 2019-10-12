<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator';
import Vehicle from '../assets/ts/Vehicle';
import SteeredVehicle from '../assets/ts/SteeredVehicle';
import CanvasContainer from './CanvasContainer';

@Component
export default class BoidsRenderer extends CanvasContainer {
    clearCanvas() {
        const canvas = this.domElement;
        const cw = canvas.width;
        const ch = canvas.height;
        const context = this.context;

        context.save();
        context.fillStyle = 'rgba(0, 0, 0, 0.1)';
        context.beginPath();
        context.rect(0, 0, cw, ch);
        context.closePath();
        context.fill();
        context.restore();
    }

    drawVehicles(vehicles: SteeredVehicle[], color: string = '#fff') {
        const canvas = this.domElement;
        const cw = canvas.width;
        const ch = canvas.height;
        const context = this.context;
        const scale = this.scale;

        context.save();
        context.fillStyle = color;
        const pi2: number = Math.PI * 2;
        vehicles.forEach((vehicle, i) => {
            this.edgeBehavior(vehicle);
            const position = vehicle.position.multiply(cw);

            context.beginPath();
            context.arc(position.x, position.y, 1, 0, pi2);
            context.closePath();
            context.fill();

        });
        context.restore();
    }
    /**
     * vehicleの座標が画面外へ出てしまった際の処理
     * @param vehicle
     */
    edgeBehavior(vehicle: Vehicle) {
        const aspectRatio: number = this.aspectRatio;
        while(vehicle.position.x < 0) {
            vehicle.position.x += 1;
        }
        while(vehicle.position.x > 1) {
            vehicle.position.x -= 1;
        }
        while(vehicle.position.y < 0) {
            vehicle.position.y += aspectRatio;
        }
        while(vehicle.position.y > aspectRatio) {
            vehicle.position.y -= aspectRatio;
        }
    }
}
</script>