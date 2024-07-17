import { useContext } from 'react';
import styles from '../assets/css/floatingBackground/page.module.css'
import { themes } from '../theme';
import { Context } from '../pages/Layout';
import FloatingParticle from './misc/FloatingParticle';
import { generateArray, inclusiveRandomInteger } from '../globals';

const PARTICLE_COUNT: number = 50

export default function FloatingBackground({ particles } : { particles?: boolean }) {
    // @ts-ignore Ignore unused setTheme
    const [ selectedTheme, selectedMode, grabTheme ] = useContext(Context)

    return (
        <div className={styles.content_loader} style={{background: themes[selectedMode][selectedTheme].pageGradient}}>
            {
                (particles === undefined || particles) ?
                generateArray(PARTICLE_COUNT).map(() => {
                    return (
                        <FloatingParticle width={inclusiveRandomInteger(25, 40)} particleWidth={inclusiveRandomInteger(1, 3)} duration={inclusiveRandomInteger(72, 96)} top={inclusiveRandomInteger(-50, 50)} left={inclusiveRandomInteger(-60, 25)} glowBase={themes[selectedMode][selectedTheme].glowBase} glowColor={themes[selectedMode][selectedTheme].glowColor} />
                    )
                }) :
                <></>
            }	
        </div>
    )
}