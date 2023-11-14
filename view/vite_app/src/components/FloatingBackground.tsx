import { useState } from 'react';
import styles from '../assets/css/floatingBackground/page.module.css'


export default function FloatingBackground() {
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)

    let blobCount = 6;
    const arr = new Array(blobCount).fill(0)

    window.addEventListener('resize', () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    return (
    <div className={styles.content_loader}>
        <div className={styles.blur}></div>
	    <svg className={styles.loader}>
		    <defs>
			    <filter id="goo">
				    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
				    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
				    <feBlend in2="goo" in="SourceGraphic" result="mix" />
			    </filter>
			    <linearGradient id="MyGradient">
                    <stop offset="5%" stopColor="#093a3e"/>
					<stop offset="40%" stopColor="#900C3F"/>
					<stop offset="100%"  stopColor="#093a3e"/>
			    </linearGradient> 
		    </defs>
		    <mask id="maska">
			    <g className={styles.blobs}>

                    {
                        arr.map(() => {
                            return <circle key={Math.floor(Math.random() * 1000000)} style={{animationDuration: Math.floor(Math.random() * 100 + 20) + 's', transform: 'translate(0%, 100%)', animationDirection: 'alternate'}} className={styles.blob} cx={Math.floor(Math.random() * window.innerWidth)} cy={Math.floor(Math.random() * 400)} r={Math.floor(Math.random() * 200)}/>
                        })
                    }
			    </g>
		    </mask>
		    <rect width={width} height={height} mask="url(#maska)" fill="url(#MyGradient)" />
	    </svg>	
    </div>
    )
}