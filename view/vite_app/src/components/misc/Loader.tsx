import styles from '../../assets/css/misc/loader.module.css'

export default function Loader({ color } : { color: string }) {
    const b: string = `
        no-repeat linear-gradient(${color} 0 0) 0%   50%,
        no-repeat linear-gradient(${color} 0 0) 50%  50%,
        no-repeat linear-gradient(${color} 0 0) 100% 50%
    `

    return (
        <div className={styles.loader} style={{background: b}}></div>
    )
}
//, transform: 'rotate(90deg)'