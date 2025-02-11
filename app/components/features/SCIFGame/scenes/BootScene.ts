export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
  }
  
  preload() {
    this.load.image('room', '/public/scif/assets/room.png')
    this.load.image('player', '/public/scif/assets/player.png')
    this.load.image('stickyNote', '/public/scif/assets/stickyNote.png')
    this.load.image('book', '/public/scif/assets/book.png')
    this.load.image('computer', '/public/scif/assets/computer.png')
    this.load.tilemapTiledJSON('map', '/scif/map.tmj')
    this.load.image('tiles', '/scif/assets/tileset.png')
    this.load.spritesheet('player-sheet', '/scif/assets/player-sheet.png', {
      frameWidth: 16,
      frameHeight: 16
    })
  }
  
  create() {
    this.scene.start('MainMenuScene')
  }
} 