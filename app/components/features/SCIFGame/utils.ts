import { GameObjects, Scene, BlendModes } from 'phaser';

interface Origin {
    x: number;
    y: number;
}

interface CustomCollider extends GameObjects.Rectangle {
    isCustomCollider: boolean;
}

export const createInteractiveGameObject = (
    scene: Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    name: string,
    isDebug: boolean = false,
    origin: Origin = { x: 0, y: 1 }
): CustomCollider => {
    const customCollider = new GameObjects.Rectangle(
        scene,
        x,
        y,
        width,
        height
    ).setOrigin(origin.x, origin.y) as CustomCollider;
    customCollider.name = name;
    customCollider.isCustomCollider = true;

    if (isDebug) {
        customCollider.setFillStyle(0x741B47);
    }

    scene.physics.add.existing(customCollider);
    (customCollider.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    (customCollider.body as Phaser.Physics.Arcade.Body).setImmovable(true);

    return customCollider;
};

export function calculateGameSize() {
    const width = 800
    const height = 600
    const multiplier = 1

    return { width, height, multiplier }
}

export const createEnergyField = (
    scene: Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    color: number = 0x00ff99
): GameObjects.Rectangle => {
    const field = createInteractiveGameObject(scene, x, y, width, height, 'energyField');
    field.setFillStyle(color);
    field.setBlendMode(BlendModes.ADD);
    field.setAlpha(0.5);
    return field;
} 