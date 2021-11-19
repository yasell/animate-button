import React, {useEffect, useRef, useState} from 'react'
import styles from './Button.module.scss'

export type Variant = 'default' | 'waapi' | 'js'
export type Size = 'xs' | 'sm'

export const TEXTS: Array<string> = [
    'Lets start!',
    'Adjusting colors palette',
    'Applying visual settings',
    'Tuning up sleep sounds',
    'Adding a pinch of magic',
    'Get my sleepscape',
]

export const buildClass = (...classes: (string | undefined | false)[]): string => {
    return classes.filter(Boolean).join(' ')
}

export interface IButtonProps {
    variant?: Variant;
    size?: Size;
    children?: React.ReactNode;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    isDisabled?: boolean;
}

export const Button: React.FC<IButtonProps> =
    (
        {
            variant,
            size,
            children,
            type,
            isDisabled,
        }
    ) => {
        const buttonRef = useRef<HTMLButtonElement>(null)
        const buttonTextRef = useRef<HTMLSpanElement>(null)
        const buttonBarRef = useRef<HTMLSpanElement>(null)
        const animationBarRef = useRef<Animation>()
        const animationTextRef = useRef<Animation>()
        const animationPercentage = useRef<number>(0)

        const [isAnimate, setIsAnimate] = useState<boolean>(false)
        const [animateClass, setAnimateClass] = useState<string>('')
        const [activeText, setActiveText] = useState<string>('')
        const [timerValue, setTimerValue] = useState<number>(0)
        const [pauseAnimationTime, setPauseAnimationTime] = useState<number>(0)

        const animationDurationBar: number = 8500
        const animationDurationTotal: number = 10000
        const dynamicClassName = buildClass(
            styles.button,
            animateClass
        )

        useEffect(() => {
            setActiveText(TEXTS[0])
        }, [])

        useEffect(() => {
            document.addEventListener('click', handleButtonClickOutside, true)
            animationPercentage.current = animationBarRef && animationBarRef.current && animationBarRef.current.currentTime ?
                Math.trunc(animationBarRef.current.currentTime * 100 / animationDurationBar) :
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
            controlAnimation()
        }, [timerValue])

        const animate = () => {
            if (buttonTextRef && buttonTextRef.current) {
                animationTextRef.current = buttonTextRef.current.animate(
                    [
                        {
                            offset: 0,
                            transform: 'translateY(0)',
                            opacity: 1
                        },
                        {
                            offset: 0.32,
                            transform: 'translateY(0)',
                            opacity: 1
                        },
                        {
                            offset: 0.35,
                            transform: 'translateY(-100%)',
                            opacity: 0
                        },
                        {
                            offset: 0.38,
                            transform: 'translateY(0)',
                            opacity: 1
                        },
                        {
                            offset: 0.64,
                            transform: 'translateY(0)',
                            opacity: 1
                        },
                        {
                            offset: 0.67,
                            transform: 'translateY(-100%)',
                            opacity: 0
                        },
                        {
                            offset: 0.70,
                            transform: 'translateY(0)',
                            opacity: 1
                        },
                        {
                            offset: 0.88,
                            transform: 'translateY(0)',
                            opacity: 1
                        },
                        {
                            offset: 0.91,
                            transform: 'translateY(-100%)',
                            opacity: 0
                        },
                        {
                            offset: 0.94,
                            transform: 'translateY(0)',
                            opacity: 1
                        },
                        {
                            offset: 1,
                            transform: 'translateY(0)',
                            opacity: 1
                        },
                    ],
                    {
                        delay: 0,
                        endDelay: 0,
                        iterationStart: 0,
                        iterations: 1,
                        duration: animationDurationTotal,
                        fill: 'forwards',
                        direction: 'normal',
                        easing: 'linear'
                    }
                )
            }

            if (buttonBarRef && buttonBarRef.current) {
                animationBarRef.current = buttonBarRef.current.animate(
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
                        duration: animationDurationBar,
                        fill: 'forwards',
                        direction: 'normal',
                        easing: 'linear'
                    }
                )
            }
        }

        const controlAnimation = () => {
            const currentPercentage = animationPercentage.current

            if (!animationBarRef.current) return

            if (!isAnimate) {
                setActiveText(TEXTS[0])
                animationBarRef.current.cancel()
                animationTextRef.current?.cancel()

                return animationPercentage.current = 0
            }

            if (currentPercentage === 37) {
                setActiveText(TEXTS[2])
                pauseAnimationTime === 0 && setPauseAnimationTime(timerValue)
                animationBarRef.current.pause()
            }

            if (currentPercentage === 69) {
                setActiveText(TEXTS[3])
                pauseAnimationTime === 0 && setPauseAnimationTime(timerValue)
                animationBarRef.current.pause()
            }

            if (currentPercentage === 91) {
                setActiveText(TEXTS[4])
                pauseAnimationTime === 0 && setPauseAnimationTime(timerValue)
                animationBarRef.current.pause()
            }

            if (timerValue === 100) {
                setActiveText(TEXTS[5])
            }

            if (timerValue === pauseAnimationTime + 5) {
                animationBarRef.current.play()
                setPauseAnimationTime(0)
            }
        }

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
            ref={buttonRef}
            className={variant === 'waapi' ? dynamicClassName : styles.button}
            onClick={handleButtonClick}
            type={type ? type : 'button'}
            disabled={isDisabled}
        >
            <span
                ref={buttonBarRef}
                className={styles.buttonBar}
            />
            <span
                ref={buttonTextRef}
                className={styles.buttonText}
            >
                {activeText}
                {' '}
                {
                    activeText !== TEXTS[0] && activeText !== TEXTS[TEXTS.length - 1] &&
                    <>
                        {`${animationPercentage.current} %`}
                    </>
                }
            </span>
        </button>
    }
