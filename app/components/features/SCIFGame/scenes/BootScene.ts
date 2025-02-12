export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
  }
  
  preload() {
    try {
      // Add debug logging for asset loading
      this.load.on('filecomplete', (key: string, type: string, data: any) => {
        console.log(`Asset loaded: ${key} (${type})`, data);
      });

      // Load tileset image first
      this.load.image('tiles', '/scif/assets/tileset.png');
      
      // Load the tilemap with proper path
      this.load.tilemapTiledJSON('map', '/scif/assets/scif-map.tmj');
      
      // Load player sprite
      this.load.spritesheet('player', '/scif/assets/player-sheet.png', {
        frameWidth: 32,
        frameHeight: 32
      });

      // Add load error handling
      this.load.on('loaderror', (file: Phaser.Loader.File) => {
        console.error('Error loading asset:', {
          key: file.key,
          src: file.src,
          type: file.type,
          path: file.url
        });
        const errorEvent = new CustomEvent('game-error', {
          detail: { message: `Failed to load game asset: ${file.key}` }
        });
        window.dispatchEvent(errorEvent);
      });

      // Add load complete handling
      this.load.on('complete', () => {
        console.log('All assets loaded successfully');
        
        // Verify all required assets are loaded
        const assetsLoaded = {
          tiles: this.textures.exists('tiles'),
          map: this.cache.tilemap.exists('map'),
          player: this.textures.exists('player')
        };
        
        console.log('Assets loaded status:', assetsLoaded);
        
        if (!Object.values(assetsLoaded).every(loaded => loaded)) {
          const missingAssets = Object.entries(assetsLoaded)
            .filter(([_, loaded]) => !loaded)
            .map(([asset]) => asset)
            .join(', ');
            
          throw new Error(`Missing required assets: ${missingAssets}`);
        }

        // Verify tilemap data structure
        if (this.cache.tilemap.exists('map')) {
          const mapData = this.cache.tilemap.get('map');
          console.log('Raw tilemap data:', mapData);
          console.log('Tilemap data structure:', {
            hasData: !!mapData,
            dataType: typeof mapData,
            hasLayers: 'layers' in mapData,
            layersType: mapData.layers ? typeof mapData.layers : 'undefined',
            isLayersArray: Array.isArray(mapData.layers),
            hasTilesets: 'tilesets' in mapData,
            tilesetsType: mapData.tilesets ? typeof mapData.tilesets : 'undefined',
            isTilesetsArray: Array.isArray(mapData.tilesets),
            keys: Object.keys(mapData)
          });
        }
      });
    } catch (error) {
      console.error('Error in BootScene preload:', error);
      const errorEvent = new CustomEvent('game-error', {
        detail: { message: error instanceof Error ? error.message : 'Failed to initialize game assets' }
      });
      window.dispatchEvent(errorEvent);
    }
  }
  
  create() {
    try {
      // Verify assets are loaded
      if (!this.textures.exists('tiles') || !this.cache.tilemap.exists('map')) {
        throw new Error('Required assets not loaded');
      }

      // Get and validate map data with detailed logging
      const mapData = this.cache.tilemap.get('map');
      console.log('Map data in create:', {
        hasData: !!mapData,
        dataType: typeof mapData,
        hasLayers: 'layers' in mapData,
        layersType: mapData.layers ? typeof mapData.layers : 'undefined',
        isLayersArray: Array.isArray(mapData.layers),
        hasTilesets: 'tilesets' in mapData,
        tilesetsType: mapData.tilesets ? typeof mapData.tilesets : 'undefined',
        isTilesetsArray: Array.isArray(mapData.tilesets),
        keys: Object.keys(mapData)
      });

      // Validate required properties
      const requiredProps = ['layers', 'tilesets', 'width', 'height', 'tilewidth', 'tileheight'];
      const missingProps = requiredProps.filter(prop => !(prop in mapData));
      
      if (missingProps.length > 0) {
        throw new Error(`Map data missing required properties: ${missingProps.join(', ')}`);
      }

      if (!Array.isArray(mapData.layers)) {
        throw new Error('Map layers property is not an array');
      }

      if (!Array.isArray(mapData.tilesets)) {
        throw new Error('Map tilesets property is not an array');
      }

      if (mapData.layers.length === 0) {
        throw new Error('Map has no layers');
      }

      if (mapData.tilesets.length === 0) {
        throw new Error('Map has no tilesets');
      }

      // Start the game scene
      this.scene.start('GameMapScene');
    } catch (error) {
      console.error('Error in BootScene create:', error);
      const errorEvent = new CustomEvent('game-error', {
        detail: { message: error instanceof Error ? error.message : 'Failed to start game scene' }
      });
      window.dispatchEvent(errorEvent);
    }
  }
} 