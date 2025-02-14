import { Scene } from 'phaser';

interface AssetLoadStatus {
  tiles: boolean;
  map: boolean;
  player: boolean;
}

interface MapValidationData {
  hasData: boolean;
  dataType: string;
  hasLayers: boolean;
  layersType: string;
  isLayersArray: boolean;
  hasTilesets: boolean;
  tilesetsType: string;
  isTilesetsArray: boolean;
  keys: string[];
}

export default class BootScene extends Scene {
  constructor() {
    super({ key: 'BootScene' })
  }
  
  preload() {
    try {
      // Add debug logging for asset loading
      this.load.on('filecomplete', (key: string, type: string, data: unknown) => {
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
        this.dispatchGameError(`Failed to load game asset: ${file.key}`);
      });

      // Add load complete handling
      this.load.on('complete', () => {
        console.log('All assets loaded successfully');
        
        // Verify all required assets are loaded
        const assetsLoaded: AssetLoadStatus = {
          tiles: this.textures.exists('tiles'),
          map: this.cache.tilemap.exists('map'),
          player: this.textures.exists('player')
        };
        
        console.log('Assets loaded status:', assetsLoaded);
        
        const missingAssets = Object.entries(assetsLoaded)
          .filter(([, loaded]) => !loaded)
          .map(([asset]) => asset);

        if (missingAssets.length > 0) {
          throw new Error(`Missing required assets: ${missingAssets.join(', ')}`);
        }

        // Verify tilemap data structure
        if (this.cache.tilemap.exists('map')) {
          const mapData = this.cache.tilemap.get('map');
          const mapStructure: MapValidationData = {
            hasData: !!mapData,
            dataType: typeof mapData,
            hasLayers: 'layers' in mapData,
            layersType: mapData.layers ? typeof mapData.layers : 'undefined',
            isLayersArray: Array.isArray(mapData.layers),
            hasTilesets: 'tilesets' in mapData,
            tilesetsType: mapData.tilesets ? typeof mapData.tilesets : 'undefined',
            isTilesetsArray: Array.isArray(mapData.tilesets),
            keys: Object.keys(mapData)
          };
          console.log('Tilemap data structure:', mapStructure);
          this.validateMapData(mapData);
        }
      });
    } catch (error) {
      console.error('Error in BootScene preload:', error);
      this.dispatchGameError(error instanceof Error ? error.message : 'Failed to initialize game assets');
    }
  }
  
  create() {
    try {
      // Verify assets are loaded
      if (!this.textures.exists('tiles') || !this.cache.tilemap.exists('map')) {
        throw new Error('Required assets not loaded');
      }

      const mapData = this.cache.tilemap.get('map');
      this.validateMapData(mapData);

      // Start the game scene
      this.scene.start('GameMapScene');
    } catch (error) {
      console.error('Error in BootScene create:', error);
      this.dispatchGameError(error instanceof Error ? error.message : 'Failed to start game scene');
    }
  }

  private validateMapData(mapData: unknown): asserts mapData is Phaser.Tilemaps.MapData {
    if (!mapData || typeof mapData !== 'object') {
      throw new Error('Invalid map data: not an object');
    }

    const requiredProps = ['layers', 'tilesets', 'width', 'height', 'tilewidth', 'tileheight'] as const;
    
    for (const prop of requiredProps) {
      if (!(prop in mapData)) {
        throw new Error(`Map data missing required property: ${prop}`);
      }
    }

    const typedMapData = mapData as Record<string, unknown>;

    if (!Array.isArray(typedMapData.layers)) {
      throw new Error('Map layers property is not an array');
    }

    if (!Array.isArray(typedMapData.tilesets)) {
      throw new Error('Map tilesets property is not an array');
    }

    if (typedMapData.layers.length === 0) {
      throw new Error('Map has no layers');
    }

    if (typedMapData.tilesets.length === 0) {
      throw new Error('Map has no tilesets');
    }
  }

  private dispatchGameError(message: string): void {
    const errorEvent = new CustomEvent('game-error', {
      detail: { message }
    });
    window.dispatchEvent(errorEvent);
  }
} 