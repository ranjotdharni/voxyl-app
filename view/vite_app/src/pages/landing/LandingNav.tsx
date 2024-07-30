import styles from '../../assets/css/landing/landingNav.module.css'
import Icon from '../../assets/img/png/voxyl.png'

export default function LandingNav() {

    return (
        <div className={styles.mainContainer}>
            <div className={styles.iconContainer}>
                <img src={Icon} />
            </div>
            <div className={styles.linkContainer}>
                <a className={(window.location.pathname === '' || window.location.pathname === '/' ? styles.highlight : '')}>Home</a>
                <a className={(window.location.pathname === '/about' ? styles.highlight : '')}>About</a>
                <a className={(window.location.pathname === '/assets' ? styles.highlight : '')}>Assets</a>
                <a className={(window.location.pathname === '/contact' ? styles.highlight : '')}>Contact Us</a>
            </div>
        </div>
    )
}