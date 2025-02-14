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
    // Base size that works well with our assets
    const baseWidth = 800
    const baseHeight = 600
    
    // Return base size during server-side rendering
    if (typeof window === 'undefined') {
        return {
            width: baseWidth,
            height: baseHeight,
            multiplier: 1
        }
    }
    
    // Calculate responsive size based on window
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    
    // Calculate the maximum size that fits in the window while maintaining aspect ratio
    const maxWidth = Math.min(windowWidth * 0.9, baseWidth * 1.5)
    const maxHeight = Math.min(windowHeight * 0.9, baseHeight * 1.5)
    
    // Calculate scale based on both dimensions
    const scaleX = maxWidth / baseWidth
    const scaleY = maxHeight / baseHeight
    
    // Use the smaller scale to ensure it fits
    const multiplier = Math.min(scaleX, scaleY)
    
    // Apply the scale
    const width = Math.round(baseWidth * multiplier)
    const height = Math.round(baseHeight * multiplier)
    
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