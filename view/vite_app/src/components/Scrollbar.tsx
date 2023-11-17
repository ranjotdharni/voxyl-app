import styles from '../assets/css/misc/scrollbar.module.css'
import { useState, RefObject, useEffect, MouseEvent } from 'react'
import { clamp } from '../globals'

export default function Scrollbar({ scrollRef } : { scrollRef: RefObject<HTMLElement> }) {
    const [visible, setVisible] = useState(false)
    const [scrolled, setScrolled] = useState(0)
    const [scrollable, setScrollable] = useState(0)
    const [offset, setOffset] = useState(0)
    const [startY, setStartY] = useState(0)
    const [started, start] = useState(false)

    let timeout: number | undefined

    useEffect(() => {
        setVisible(scrollRef.current!.scrollHeight - scrollRef.current!.clientHeight !== 0)
        if (visible)    updateValues()
    }, [])

    function updateValues() {
        setScrolled(clamp(0, scrollRef.current!.scrollTop, scrollable))
        setScrollable(scrollRef.current!.scrollHeight - scrollRef.current!.clientHeight)
        setOffset(scrollRef.current!.scrollTop / (scrollRef.current!.scrollHeight - scrollRef.current!.clientHeight))
        timeout = undefined
    }

    window.addEventListener('resize', () => {
        if (timeout !== undefined)
        {
            window.clearTimeout(timeout)
        }

        setVisible(scrollRef.current!.scrollHeight - scrollRef.current!.clientHeight !== 0)
        window.setTimeout(updateValues, 1000)
    })

    if (visible)
    {
        window.addEventListener('wheel', (e) => {
            scrollRef.current!.scrollTop = clamp(0, scrolled + (e.deltaY * 0.5), scrollable)
            updateValues()
        })
    }

    useEffect(() => {
        if (!visible)   return

        const x = function mouseMove(e: any) {
            let dy: number = (e.clientY - startY) / window.innerHeight
            scrollRef.current!.scrollTop = clamp(0, scrolled + (scrollable * dy), scrollable)
            updateValues()
        }

        window.addEventListener('mousemove', x)
        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', x)
        })
    }, [started])

    function mouseDown(e: MouseEvent<HTMLDivElement>) {
        setStartY(e.clientY)
        start(!started)
    }
    
    return (visible ?
        <div className={styles.wrapper}>
            <div className={styles.track}>
                <div className={styles.thumb} onMouseDown={mouseDown} style={{height: scrollable * 0.05 + 'px', top: clamp(0, Math.floor(offset * 100), 90) + '%'}}></div>
            </div>
        </div>
        :
        <></>
    )
}