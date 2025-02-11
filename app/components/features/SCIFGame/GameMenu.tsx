import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';

interface GameSize {
    width: number;
    height: number;
    multiplier: number;
}

interface StyleProps {
    width: number;
    height: number;
    multiplier: number;
    position: 'center' | 'left';
}

interface GameMenuProps {
    items: string[];
    position?: 'center' | 'left';
    gameSize: GameSize;
    onSelected: (item: string) => void;
}

const MenuWrapper = styled('div')<StyleProps>(({ multiplier }) => ({
    fontFamily: '"Press Start 2P"',
    fontSize: `${10 * multiplier}px`,
    textTransform: 'uppercase',
    position: 'absolute',
    transform: 'translate(-50%, 0%)',
}));

const MenuPositionWrapper = styled('div')<StyleProps>(({ multiplier, position, width, height }) => {
    const left = window.innerWidth - (width * multiplier);
    const menuWidth = 160 * multiplier;
    
    if (position === 'center') {
        return {
            minWidth: `${menuWidth}px`,
            left: '50%',
            top: `${(height * multiplier) / 2}px`,
        };
    }

    if (position === 'left') {
        return {
            minWidth: `${menuWidth}px`,
            left: `${(95 * multiplier) + left / 2}px`,
            top: `${50 * multiplier}px`,
        };
    }

    return {};
});

const MenuItemsWrapper = styled('ul')({
    textAlign: 'center',
    padding: 0,
});

const MenuItem = styled('li')<StyleProps>(({ multiplier }) => ({
    cursor: 'pointer',
    listStyle: 'none',
    padding: `${5 * multiplier}px`,
    marginBottom: `${5 * multiplier}px`,
    backgroundColor: '#94785c',
    border: `${multiplier}px solid #79584f`,
    '&.selected': {
        fontSize: `${11 * multiplier}px`,
        border: `${multiplier}px solid #ddd`,
    }
}));

const GameMenu: React.FC<GameMenuProps> = ({
    items,
    position = 'center',
    gameSize,
    onSelected,
}) => {
    const { width, height, multiplier } = gameSize;
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    useEffect(() => {
        const handleKeyPressed = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'Enter': {
                    onSelected(items[selectedItemIndex]);
                    break;
                }
                case 'ArrowUp': {
                    if (selectedItemIndex > 0) {
                        setSelectedItemIndex(selectedItemIndex - 1);
                    }
                    break;
                }
                case 'ArrowDown': {
                    if (items.length - 1 > selectedItemIndex) {
                        setSelectedItemIndex(selectedItemIndex + 1);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        };
        window.addEventListener('keydown', handleKeyPressed);

        return () => window.removeEventListener('keydown', handleKeyPressed);
    }, [items, onSelected, selectedItemIndex]);

    return (
        <MenuPositionWrapper width={width} height={height} multiplier={multiplier} position={position}>
            <MenuWrapper width={width} height={height} multiplier={multiplier} position={position}>
                <MenuItemsWrapper>
                    {items.map((item, index) => (
                        <MenuItem
                            key={index}
                            className={selectedItemIndex === index ? 'selected' : ''}
                            width={width}
                            height={height}
                            multiplier={multiplier}
                            position={position}
                            onMouseEnter={() => {
                                setSelectedItemIndex(index);
                            }}
                            onClick={() => {
                                onSelected(items[selectedItemIndex]);
                            }}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </MenuItemsWrapper>
            </MenuWrapper>
        </MenuPositionWrapper>
    );
};

export default GameMenu; 