import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

// Images
import dialogBorderBox from './assets/images/dialog_borderbox.png';

// Components
import Message from './Message';

interface DialogMessage {
    message: string;
    action?: string;
}

interface GameSize {
    width: number;
    height: number;
    multiplier: number;
}

interface DialogBoxProps {
    messages: DialogMessage[];
    characterName: string;
    onDone: () => void;
    gameSize: GameSize;
}

interface StyleProps {
    width: number;
    height: number;
    multiplier: number;
}

const DialogWindow = styled('div')(({ width, height, multiplier }: StyleProps) => ({
    imageRendering: 'pixelated',
    fontFamily: '"Press Start 2P"',
    textTransform: 'uppercase',
    backgroundColor: '#e2b27e',
    border: 'solid',
    borderImage: `url("${dialogBorderBox}") 6 / ${6 * multiplier}px ${6 * multiplier}px ${6 * multiplier}px ${6 * multiplier}px stretch`,
    padding: `${8 * multiplier}px`,
    position: 'absolute',
    top: `${Math.ceil((height * multiplier) - ((height / 3.5) * multiplier + (height / 3.5) * multiplier * 0.1))}px`,
    width: `${Math.ceil(width * 0.8 * multiplier)}px`,
    left: '50%',
    transform: 'translate(-50%, 0%)',
    minHeight: `${Math.ceil((height / 3.5) * multiplier)}px`,
}));

const DialogTitle = styled('div')(({ multiplier }: Pick<StyleProps, 'multiplier'>) => ({
    fontSize: `${8 * multiplier}px`,
    marginBottom: `${6 * multiplier}px`,
    fontWeight: 'bold',
}));

const DialogFooter = styled('div')(({ multiplier }: Pick<StyleProps, 'multiplier'>) => ({
    fontSize: `${8 * multiplier}px`,
    cursor: 'pointer',
    textAlign: 'end',
    position: 'absolute',
    right: `${6 * multiplier}px`,
    bottom: `${6 * multiplier}px`,
}));

const DialogBox: React.FC<DialogBoxProps> = ({ messages, characterName, onDone, gameSize }) => {
    const { width, height, multiplier } = gameSize;
    const [currentMessage, setCurrentMessage] = useState(0);
    const [messageEnded, setMessageEnded] = useState(false);
    const [forceShowFullMessage, setForceShowFullMessage] = useState(false);
    
    const handleClick = useCallback(() => {
        if (messageEnded) {
            setMessageEnded(false);
            setForceShowFullMessage(false);
            if (currentMessage < messages.length - 1) {
                setCurrentMessage(currentMessage + 1);
            } else {
                setCurrentMessage(0);
                onDone();
            }
        } else {
            setMessageEnded(true);
            setForceShowFullMessage(true);
        }
    }, [currentMessage, messageEnded, messages.length, onDone]);

    useEffect(() => {
        const handleKeyPressed = (e: KeyboardEvent) => {
            if (['Enter', 'Space', 'Escape'].includes(e.code)) {
                handleClick();
            }
        };
        window.addEventListener('keydown', handleKeyPressed);
        return () => window.removeEventListener('keydown', handleKeyPressed);
    }, [handleClick]);

    return (
        <DialogWindow width={width} height={height} multiplier={multiplier}>
            <DialogTitle multiplier={multiplier}>{characterName}</DialogTitle>
            <Message
                action={messages[currentMessage].action}
                message={messages[currentMessage].message}
                key={currentMessage}
                multiplier={multiplier}
                forceShowFullMessage={forceShowFullMessage}
                onMessageEnded={() => setMessageEnded(true)}
            />
            <DialogFooter 
                multiplier={multiplier} 
                onClick={handleClick}
            >
                {(currentMessage === messages.length - 1 && messageEnded) ? 'Ok' : 'Next'}
            </DialogFooter>
        </DialogWindow>
    );
};

export default DialogBox; 