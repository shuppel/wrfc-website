import { Scene } from 'phaser';

export default class GameMapScene extends Scene {
  private map!: Phaser.Tilemaps.Tilemap;
  private player!: Phaser.Physics.Arcade.Sprite;
  
  constructor() {
    super({ key: 'GameMapScene' });
  }

  create() {
    // Create the tilemap
    this.map = this.make.tilemap({ key: 'map' });
    
    // Add tileset image - make sure the first argument matches the name in the tileset file
    const tileset = this.map.addTilesetImage('scifitiles-sheet', 'tiles');
    
    if (!tileset) {
        console.error('Failed to load tileset');
        return;
    }

    // Create layers - note "base" instead of "ground"
    const baseLayer = this.map.createLayer('base', tileset, 0, 0);
    const collisionLayer = this.map.createLayer('collision', tileset, 0, 0);
    const aboveLayer = this.map.createLayer('above', tileset, 0, 0);
    
    if (!baseLayer || !collisionLayer || !aboveLayer) {
        console.error('Failed to create layers');
        return;
    }

    // Set collision based on properties set in Tiled
    collisionLayer.setCollisionByProperty({ ge_collide: true });
    
    // Create player with default spawn position in case spawn point is not found
    const spawnPoint = this.map.findObject('Spawn', obj => obj.name === 'Spawn') || { x: 100, y: 100 };
    this.player = this.physics.add.sprite(
        spawnPoint.x ?? 100, 
        spawnPoint.y ?? 100, 
        'player-sheet'
    );
    
    // Set up player animations
    this.createPlayerAnimations();
    
    // Add collision between player and collision layer
    this.physics.add.collider(this.player, collisionLayer);
    
    // Make above layer render on top of player
    aboveLayer.setDepth(10);
    
    // Set up camera to follow player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  }

  private createPlayerAnimations() {
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers('player-sheet', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    // Add other directional animations...
  }

  update() {
    // Handle player movement
    const cursors = this.input.keyboard.createCursorKeys();
    
    if (!cursors) {
        return;
    }
    
    const speed = 175;
    let velocityX = 0;
    let velocityY = 0;

    if (cursors.left.isDown) {
      velocityX = -speed;
      this.player.anims.play('walk-left', true);
    } else if (cursors.right.isDown) {
      velocityX = speed;
      this.player.anims.play('walk-right', true);
    }

    if (cursors.up.isDown) {
      velocityY = -speed;
      this.player.anims.play('walk-up', true);
    } else if (cursors.down.isDown) {
      velocityY = speed;
      this.player.anims.play('walk-down', true);
    }

    this.player.setVelocity(velocityX, velocityY);
    
    // Stop animations if not moving
    if (velocityX === 0 && velocityY === 0) {
      this.player.anims.stop();
    }
  }
} 