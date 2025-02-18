import { Scene } from 'phaser';

export default class MainMenuScene extends Scene {
    private assetsLoaded: boolean = false;

    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        try {
            // Load menu assets with error handling
            this.load.on('loaderror', (file: Phaser.Loader.File) => {
                console.error('Error loading asset:', file.src);
                // Create a custom event to notify the React component
                const event = new CustomEvent('game-error', {
                    detail: { message: `Failed to load game asset: ${file.key}` }
                });
                window.dispatchEvent(event);
            });

            this.load.on('complete', () => {
                console.log('All assets loaded successfully');
                this.assetsLoaded = true;
            });

            // Load menu assets
            this.load.image('title', '/scif/assets/title.png');
            this.load.image('menu_bg', '/scif/assets/menu_bg.png');
        } catch (error) {
            console.error('Error in MainMenuScene preload:', error);
            const event = new CustomEvent('game-error', {
                detail: { message: 'Failed to initialize menu scene' }
            });
            window.dispatchEvent(event);
        }
    }

    create() {
        try {
            if (!this.assetsLoaded) {
                console.error('Assets not loaded, cannot create menu scene');
                return;
            }

            const { width, height } = this.cameras.main.getBounds();
            
            // Add background
            this.add.image(0, 0, 'menu_bg')
                .setOrigin(0)
                .setDisplaySize(width, height);

            // Add title
            const title = this.add.image(width / 2, height / 4, 'title')
                .setOrigin(0.5);

            // Scale title to fit width
            const maxTitleWidth = width * 0.8;
            if (title.width > maxTitleWidth) {
                const scale = maxTitleWidth / title.width;
                title.setScale(scale);
            }

            // Create menu text
            const menuStyle = {
                fontFamily: '"Press Start 2P"',
                fontSize: '24px',
                color: '#ffffff',
                align: 'center',
                padding: { x: 10, y: 10 },
            };

            // Create menu items
            const startText = this.add.text(width / 2, height / 2, 'Start Game', menuStyle)
                .setOrigin(0.5)
                .setInteractive();

            const exitText = this.add.text(width / 2, height / 2 + 50, 'Exit', menuStyle)
                .setOrigin(0.5)
                .setInteractive();

            // Add hover effects
            [startText, exitText].forEach(text => {
                text.on('pointerover', () => {
                    text.setTint(0x00ff00);
                });

                text.on('pointerout', () => {
                    text.clearTint();
                });
            });

            // Add click handlers
            startText.on('pointerdown', () => {
                this.scene.start('GameMapScene');
            });

            exitText.on('pointerdown', () => {
                window.location.href = '/pages/playground';
            });

            // Add keyboard controls
            let selectedItem = 0;
            const menuItems = [startText, exitText];

            // Helper to update menu item selection
            const updateSelection = () => {
                menuItems.forEach((item, index) => {
                    if (index === selectedItem) {
                        item.setTint(0x00ff00);
                    } else {
                        item.clearTint();
                    }
                });
            };

            // Keyboard event handler
            this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
                switch (event.code) {
                    case 'ArrowUp':
                    case 'KeyW':
                        selectedItem = Math.max(0, selectedItem - 1);
                        updateSelection();
                        break;
                    case 'ArrowDown':
                    case 'KeyS':
                        selectedItem = Math.min(menuItems.length - 1, selectedItem + 1);
                        updateSelection();
                        break;
                    case 'Enter':
                    case 'Space':
                        menuItems[selectedItem].emit('pointerdown');
                        break;
                }
            });

            // Initialize selection
            updateSelection();
        } catch (error) {
            console.error('Error in MainMenuScene create:', error);
            const event = new CustomEvent('game-error', {
                detail: { message: 'Failed to create menu scene' }
            });
            window.dispatchEvent(event);
        }
    }
} 