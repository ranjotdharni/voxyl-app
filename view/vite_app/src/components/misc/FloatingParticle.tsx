/** @jsxImportSource @emotion/react */

import styles from '../../assets/css/misc/floatingParticle.module.css'
import CSS from 'csstype'
import { css } from '@emotion/react'
import { generateGlow } from '../../globals'

interface props {
    particleWidth: number
    width: number
    duration: number
    glowBase: string
    glowColor: string
    top?: number
    left?: number
}

export default function FloatingParticle({ width, duration, particleWidth, glowBase, glowColor, top, left } : props) {
    const basicBubbleStyles: CSS.Properties = {
        width: `${particleWidth}px`,
        backgroundColor: glowBase,
        boxShadow: generateGlow(glowBase, glowColor),
    }

    const Bubble1Styles = css`
        width: ${width}%;
        left: ${((100 - width * 2) / 2) + (left ? left : 0)}%;
        margin-top: ${(top ? top : 0)}%;
        animation-duration: ${duration}s;        
    `

    const Bubble2Styles = css`
        width: ${width}%;
        left: ${((100 - width * 2) / 2 + width) + (left ? left : 0)}%;
        margin-top: ${(top ? top : 0)}%;
        animation-duration: ${duration}s;
    `

    return (
        <>
            <div className={styles.bubble} css={Bubble1Styles}><div style={basicBubbleStyles}></div></div>
            <div className={styles.bubble} css={Bubble2Styles}><div style={basicBubbleStyles}></div></div>
        </>
    )
}