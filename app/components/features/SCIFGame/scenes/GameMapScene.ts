import { Scene } from 'phaser';

export default class GameMapScene extends Scene {
  private map!: Phaser.Tilemaps.Tilemap;
  private player!: Phaser.Physics.Arcade.Sprite;
  
  constructor() {
    super({ key: 'GameMapScene' });
  }

  create() {
    try {
      // Create the tilemap with explicit configuration
      this.map = this.make.tilemap({ 
        key: 'map'
      });
      
      if (!this.map) {
        throw new Error('Failed to create tilemap');
      }

      // Add tileset image with exact name from Tiled
      const tileset = this.map.addTilesetImage(
        'scifitiles-sheet',  // name in Tiled (from tileset.tsj)
        'tiles'              // key of the loaded image
      );
      
      if (!tileset) {
        throw new Error('Failed to load tileset');
      }

      // Create layers with error checking
      const baseLayer = this.map.createLayer('base', tileset, 0, 0);
      if (!baseLayer) {
        throw new Error('Failed to create base layer');
      }

      const collisionLayer = this.map.createLayer('collision', tileset, 0, 0);
      if (!collisionLayer) {
        throw new Error('Failed to create collision layer');
      }

      const aboveLayer = this.map.createLayer('above', tileset, 0, 0);
      if (!aboveLayer) {
        throw new Error('Failed to create above layer');
      }

      // Set collision based on tile properties
      collisionLayer.setCollisionByProperty({ ge_collide: true });
      
      // Create player sprite
      const spawnX = this.map.widthInPixels / 2;
      const spawnY = this.map.heightInPixels / 2;
      
      this.player = this.physics.add.sprite(spawnX, spawnY, 'player');
      
      if (!this.player) {
        throw new Error('Failed to create player sprite');
      }
      
      this.player.setCollideWorldBounds(true);
      
      // Add collision between player and collision layer
      this.physics.add.collider(this.player, collisionLayer);
      
      // Set up camera to follow player
      this.cameras.main.startFollow(this.player);
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

      console.log('Game scene initialized successfully');
      
    } catch (error) {
      console.error('Error in GameMapScene create:', error);
      const errorEvent = new CustomEvent('game-error', {
        detail: { message: error instanceof Error ? error.message : 'Failed to initialize game scene' }
      });
      window.dispatchEvent(errorEvent);
    }
  }

  update() {
    if (!this.input?.keyboard || !this.player) return;
    
    const cursors = this.input.keyboard.createCursorKeys();
    if (!cursors) return;
    
    const speed = 200;
    let velocityX = 0;
    let velocityY = 0;

    // Handle horizontal movement
    if (cursors.left.isDown) {
      velocityX = -speed;
    } else if (cursors.right.isDown) {
      velocityX = speed;
    }

    // Handle vertical movement
    if (cursors.up.isDown) {
      velocityY = -speed;
    } else if (cursors.down.isDown) {
      velocityY = speed;
    }

    // Apply movement
    this.player.setVelocity(velocityX, velocityY);
  }
} 