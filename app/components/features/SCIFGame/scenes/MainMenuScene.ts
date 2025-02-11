import { Scene } from 'phaser';

export default class MainMenuScene extends Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        // Load menu assets
        this.load.image('title', '/scif/assets/title.png');
        this.load.image('menu_bg', '/scif/assets/menu_bg.png');
    }

    create() {
        const { width, height } = this.cameras.main.getBounds();
        
        // Add background
        this.add.image(0, 0, 'menu_bg')
            .setOrigin(0)
            .setDisplaySize(width, height);

        // Add title
        this.add.image(width / 2, height / 4, 'title')
            .setOrigin(0.5);

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
            // Trigger custom event for menu selection
            const customEvent = new CustomEvent('menu-item-selected', {
                detail: {
                    selectedItem: 'start'
                }
            });
            window.dispatchEvent(customEvent);
            
            // Start the game
            this.scene.start('GameMapScene');
        });

        exitText.on('pointerdown', () => {
            // Trigger custom event for menu selection
            const customEvent = new CustomEvent('menu-item-selected', {
                detail: {
                    selectedItem: 'exit'
                }
            });
            window.dispatchEvent(customEvent);
            
            // Navigate back to the main site
            window.location.href = '/playground';
        });

        // Add keyboard controls
        const selectedItem = 0;
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
    }
} 