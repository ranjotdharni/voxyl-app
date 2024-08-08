import styles from '../../assets/css/landing/landingNav.module.css'
import Icon from '../../assets/img/png/voxyl.png'

export default function LandingNav() {

    return (
        <div className={styles.mainContainer}>
            <div className={styles.iconContainer}>
                <img src={Icon} />
            </div>
            <div className={styles.linkContainer}>
                <a href='/' className={(window.location.pathname === '' || window.location.pathname === '/' ? styles.highlight : '')}>Home</a>
                <a href='/teams' className={(window.location.pathname === '/teams' ? styles.highlight : '')}>Teams</a>
                <a href='/project/launch' className={(window.location.pathname === '/project/launch' ? styles.highlight : '')}>Projects</a>
                <a href='https://github.com/ranjotdharni/voxyl-app' className={(window.location.pathname === 'https://github.com/ranjotdharni/voxyl-app' ? styles.highlight : '')}>GitHub</a>
            </div>
        </div>
    )
}