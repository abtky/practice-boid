<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator';
import CanvasContainer from '../CanvasContainer';
import PhysicsBall from '../../assets/scripts/physics/PhysicsBall';

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

    drawBall(ball: PhysicsBall, color: string = '#000') {
        const canvas = this.domElement;
        const cw = canvas.width;
        const ch = canvas.height;
        const context = this.context;

        context.save();
        context.fillStyle = color;
        const pi2: number = Math.PI * 2;
        const position = ball.position;
        this.edgeBehavior(ball);

        context.beginPath();
        context.arc(position.x, position.y, ball.radius, 0, pi2);
        context.closePath();
        context.fill();
        context.restore();
    }

    edgeBehavior(ball: PhysicsBall) {
        if(ball.position.y > this.height - ball.radius) {
            ball.position.y = this.height - ball.radius;
            ball.bounceY();
        }
        if(ball.position.x > this.width - ball.radius) {
            ball.position.x = this.width - ball.radius;
            ball.bounceX();
        } else if(ball.position.x < ball.radius) {
            ball.position.x = ball.radius;
            ball.bounceX();
        }
    }
}
</script>