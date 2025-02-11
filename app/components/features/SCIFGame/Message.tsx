import React, { useMemo } from 'react';
import { animated, useTransition } from '@react-spring/web';
import type { SpringValue } from '@react-spring/web';

interface MessageProps {
    message: string;
    action?: string;
    trail?: number;
    multiplier: number;
    onMessageEnded?: () => void;
    forceShowFullMessage?: boolean;
}

interface ItemType {
    item: string;
    key: number;
}

const Message: React.FC<MessageProps> = ({
    message,
    trail = 35,
    onMessageEnded = () => {},
    forceShowFullMessage = false,
}) => {
    const items = useMemo(() => 
        message.trim().split('').map((letter, index) => ({
            item: letter,
            key: index,
        })), 
        [message]
    );

    const transitions = useTransition(items, {
        trail,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        onRest: (_springs: unknown, _controller: unknown, item: ItemType) => {
            if (item.key === items.length - 1) {
                onMessageEnded();
            }
        },
    });

    return (
        <div>
            {forceShowFullMessage ? (
                <span>{message}</span>
            ) : (
                transitions((styles: { opacity: SpringValue<number> }, { item, key }: ItemType) => (
                    <animated.span key={key} style={styles}>
                        {item}
                    </animated.span>
                ))
            )}
        </div>
    );
};

export default Message; 