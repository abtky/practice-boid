import Vector2D from '../assets/ts/Vector2D';

describe('Vector2D', () => {
    it('ベクトルの正規化', () => {
        const instance = new Vector2D(20, 30);
        instance.normalize();
        expect(instance.length).toBe(1);
    });
});