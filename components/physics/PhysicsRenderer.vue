<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator';
import CanvasContainer from '../CanvasContainer';
import PhysicsBall from '../../assets/scripts/physics/PhysicsBall';
import VarletPoint from './VarletPoint';

@Component
export default class PhysicsRenderer extends CanvasContainer {
    clearCanvas() {
        const canvas = this.domElement;
        const cw = canvas.width;
        const ch = canvas.height;
        const context = this.context;

        context.save();
        context.clearRect(0, 0, cw, ch);
        context.restore();
    }

    drawPoint(point: VarletPoint, radius: number, color: string = '#f00') {
        const canvas = this.domElement;
        const cw = canvas.width;
        const ch = canvas.height;
        const context = this.context;

        context.save();
        context.fillStyle = color;
        const pi2: number = Math.PI * 2;
        // this.edgeBehavior(ball);

        context.beginPath();
        context.arc(point.x, point.y, radius, 0, pi2);
        context.closePath();
        context.fill();
        context.restore();
    }

    drawBall(ball: PhysicsBall, color: string = '#000') {
        const canvas = this.domElement;
        const cw = canvas.width;
        const ch = canvas.height;
        const context = this.context;

        context.save();
        context.fillStyle = color;
        const pi2: number = Math.PI * 2;
        const position = ball.display;
        this.edgeBehavior(ball);

        context.beginPath();
        context.arc(position.x, position.y, ball.radius, 0, pi2);
        context.closePath();
        context.fill();
        context.restore();
    }

    edgeBehavior(ball: PhysicsBall) {
        if(ball.display.y > this.height - ball.radius) {
            ball.bounceY(this.height - ball.radius);
        }
        if(ball.display.x > this.width - ball.radius) {
            ball.bounceX(this.width - ball.radius);
        } else if(ball.display.x < ball.radius) {
            ball.bounceX(ball.radius);
        }
    }
}
</script>