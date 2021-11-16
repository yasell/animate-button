import React from 'react';
import styles from './Button.module.scss';

export type Variant = 'default' | 'filled' | 'wide' | 'hero';
export type Size = 'xs' | 'sm';
export type State = 'disabled' | 'loading' | 'active';

export interface IButtonProps {
    variant?: Variant;
    size?: Size;
    href?: string;
    children?: React.ReactNode;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    isDisabled?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

export type Ref = HTMLButtonElement | HTMLAnchorElement;
export const Button = React.forwardRef<Ref, IButtonProps>(
    (
        {
            variant,
            size,
            href,
            children,
            type,
            isDisabled,
            onClick,
        },
        ref
    ) => {
        const isLink = Boolean(href);

        const content = (
            <>
                {children}
            </>
        );

        return isLink ? (
            <a
                className={styles.button}
                href={href}
                ref={ref as React.RefObject<HTMLAnchorElement>}
            >
                {content}
            </a>
        ) : (
            <button
                className={styles.button}
                ref={ref as React.RefObject<HTMLButtonElement>}
                onClick={onClick}
                type={type ? type : 'button'}
                disabled={isDisabled}
            >
                {content}
            </button>
        );
    }
);

// Button.displayName = 'Button';
