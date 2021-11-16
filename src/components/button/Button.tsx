import React, { useState, useEffect, useRef } from 'react'
import styles from './Button.module.scss'

export type Variant = 'default' | 'filled' | 'wide' | 'hero'
export type Size = 'xs' | 'sm'
export type State = 'disabled' | 'loading' | 'active'

export const buildClass = (...classes: (string | undefined | false)[]): string => {
    const className = classes.filter(Boolean).join(' ')

    return className
}
export interface IButtonProps {
    variant?: Variant;
    size?: Size;
    children?: React.ReactNode;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    isDisabled?: boolean;
}

export type Ref = HTMLButtonElement | HTMLAnchorElement
export const Button = React.forwardRef<Ref, IButtonProps>(
    (
        {
            variant,
            size,
            children,
            type,
            isDisabled,
        },
        ref
    ) => {
        const buttonRef = useRef<HTMLButtonElement>(null)
        const [animateClass, setAnimateClass] = useState<string>('')
        const className = buildClass(
            styles.button,
            animateClass
        )

        const onButtonClick = (e: React.MouseEvent) => {
            setAnimateClass(styles.animate)
        }

        const handleClickOutside = (event: Event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setAnimateClass('')
            }
        };

        useEffect(() => {
            document.addEventListener('click', handleClickOutside, true)

            return () => {
                document.removeEventListener('click', handleClickOutside, true)
            }
        })

        return <button
            className={className}
            ref={buttonRef}
            onClick={onButtonClick}
            type={type ? type : 'button'}
            disabled={isDisabled}
        >
            {children}
        </button>
    }
)
