import Vector2D from '../assets/ts/Vector2D';

describe('Vector2D', () => {
    it('ベクトルの正規化', () => {
        const instance = new Vector2D(20, 30);
        instance.normalize();
        expect(instance.length).toBe(1);
    });
    it('ベクトルの大きさを丸める', () => {
        const instance = new Vector2D(20, 30);
        instance.truncate(10);
        expect(instance.length).toBe(10);
    });
    it('vector2d.sign', () => {
        const instance = new Vector2D(20, 30);
        const v2 = new Vector2D(20, 31);
        const v3 = new Vector2D(20, 29);
        console.log('dotProduct v2: ', instance.perpendicular.dotProduct(v2));
        console.log('dotProduct v3: ', instance.perpendicular.dotProduct(v3));
        expect(instance.sign(v2)).toBe(1);
        expect(instance.sign(v3)).toBe(-1);
    });
});