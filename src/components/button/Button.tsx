import React, { useState, useEffect, useRef } from 'react'
import styles from './Button.module.scss'

export type Variant = 'default' | 'css' | 'js'
export type Size = 'xs' | 'sm'
export type State = 'disabled' | 'loading' | 'active'

export const TEXTS: Array<string> = [
    'Lets start!',
    'Adjusting colors palette',
    'Applying visual settings',
    'Tuning up sleep sounds',
    'Adding a pinch of magic',
    'Get my sleepscape',
]
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
        const buttonBarRef = useRef<HTMLSpanElement>(null)
        const animationRef = useRef<Animation>()
        const animationPercentage = useRef<number>(0)
        const [isAnimate, setIsAnimate] = useState<boolean>(false)
        const [animateClass, setAnimateClass] = useState<string>('')
        const [activeText, setActiveText] = useState<string>('')
        const [timerValue, setTimerValue] = useState<number>(0)
        const [pauseAnimationTime, setPauseAnimationTime] = useState<number>(0)
        const className = buildClass(
            styles.button,
            animateClass
        )
        const animationDurationMs: number = 8500

        useEffect(() => {
            setActiveText(TEXTS[0])
        }, [])

        useEffect(() => {
            document.addEventListener('click', handleButtonClickOutside, true)
            animationPercentage.current = animationRef && animationRef.current && animationRef.current.currentTime ?
                Math.trunc((animationRef.current.currentTime * 100) / animationDurationMs)  :
                0

            return () => {
                document.removeEventListener('click', handleButtonClickOutside, true)
            }
        })

        useEffect(() => {
            if (isAnimate) {
                setAnimateClass(styles.animate)
            } else {
                setAnimateClass('')
                setTimerValue(0)
            }

            if (!isAnimate) return

            for (let i = 0; i <= 100; i++) {
                setTimeout(() => {
                    setTimerValue(i)
                }, i * 100)
            }
        }, [isAnimate])

        useEffect(() => {
            const currentPercentage = animationPercentage.current

            if (!animationRef.current) return

            if (currentPercentage === 37) {
                setActiveText(TEXTS[2])
                pauseAnimationTime === 0 && setPauseAnimationTime(timerValue)
                animationRef.current.pause()
            }

            if (currentPercentage === 69) {
                setActiveText(TEXTS[3])
                pauseAnimationTime === 0 && setPauseAnimationTime(timerValue)
                animationRef.current.pause()
            }

            if (currentPercentage === 91) {
                setActiveText(TEXTS[4])
                pauseAnimationTime === 0 && setPauseAnimationTime(timerValue)
                animationRef.current.pause()
            }

            if (currentPercentage === 100) {
                setActiveText(TEXTS[5])
            }

            if (pauseAnimationTime === 0) return

            if (timerValue === pauseAnimationTime + 5) {
                animationRef.current.play()
                setPauseAnimationTime(0)
            }
        }, [timerValue])

        const animate = () => {
            if (buttonBarRef && buttonBarRef.current) {
                animationRef.current = buttonBarRef.current.animate(
                    [
                        {
                            offset: 0,
                            transform: 'translateX(0)'
                        },
                        {
                            offset: 0.37,
                            transform: 'translateX(37%)'
                        },
                        {
                            offset: 0.69,
                            transform: 'translateX(69%)'
                        },
                        {
                            offset: 0.91,
                            transform: 'translateX(91%)'
                        },
                        {
                            offset: 1,
                            transform: 'translateX(100%)'
                        }
                    ],
                    {
                        delay: 0,
                        endDelay: 0,
                        iterationStart: 0,
                        iterations: 1,
                        duration: animationDurationMs,
                        fill: 'forwards',
                        direction: 'normal',
                        easing: 'linear'
                    }
                )
            }
        }

        // useEffect(() => {
        // let interval: NodeJS.Timeout
        //     if (isAnimate) {
        //         setAnimateClass(styles.animate)
        //
        //         // interval = setInterval(() => {
        //         //     setTimerValue(oldPercent => {
        //         //         const newPercent = oldPercent + 1
        //         //
        //         //         if (newPercent === 100) {
        //         //             clearInterval(interval)
        //         //         }
        //         //
        //         //         return newPercent
        //         //     })
        //         // }, 100)
        //     } else {
        //         setAnimateClass('')
        //         setTimerValue(0)
        //     }
        // }, [isAnimate])

        const handleButtonClick = (event: React.MouseEvent) => {
            setIsAnimate(true)
            setActiveText(TEXTS[1])
            animate()
        }

        const handleButtonClickOutside = (event: Event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setIsAnimate(false)
            }
        }

        return <button
            className={variant === 'css' ? className : styles.button}
            ref={buttonRef}
            onClick={handleButtonClick}
            type={type ? type : 'button'}
            disabled={isDisabled}
        >
            <span
                ref={buttonBarRef}
                className={styles.buttonBar}
            />
            {activeText}
            {' '}
            {animationPercentage.current < 100 ? animationPercentage.current + '%' : ''}
        </button>
    }
)
