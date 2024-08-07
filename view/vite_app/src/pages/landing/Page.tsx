import styles from '../../assets/css/landing/landing.module.css'
import FlagVisual from '../../assets/img/png/flag.png'
import RocketVisual from '../../assets/img/png/rocket.png'
import PieVisual from '../../assets/img/png/pie.png'
import LandingNav from '../../components/landing/LandingNav'
import { useNavigate } from 'react-router-dom'
import { MouseEvent } from 'react'

export default function LandingPage() {
    const redirect = useNavigate()

    function toSignUp(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        redirect('/entry')
    }

    function toLogIn(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        redirect('/entry/login')
    }

    return (
        <>
            <LandingNav />
            <div className={styles.welcomeContainer}>
                <video className={styles.video} muted loop autoPlay>
                    <source src='https://videos.pexels.com/video-files/8675548/8675548-hd_1920_1080_30fps.mp4'>
                    </source>
                </video>
                <div className={styles.welcomeGlass}>
                    <img src={FlagVisual} />
                    <div>Search for other people on Voxyl and formulate teams. Easily connect with all your peers, co-workers, or friends in a single, easy-to-use web application!</div>
                </div>
                <div className={styles.welcomeGlass}>
                    <img src={RocketVisual} />
                    <div>Make endless projects and collaborate on them! Voxyl features a built-in, layered approach to project planning so you never have to worry about organization.</div>
                </div>
                <div className={styles.welcomeGlass}>
                    <img src={PieVisual} />
                    <div>Easily monitor progress and performance. Voxyl will visualize various metrics across projects, teams, and team members using a range of charts and graphs!</div>
                </div>
                <div className={styles.welcomeContent}>
                    <div className={styles.welcomeWrapper}>
                        <p className={styles.welcomeHeader}>Voxyl</p>
                    </div>
                    <div className={styles.welcomeContentTextHeaderWrapper}>
                    </div>
                    <div className={styles.welcomeContentTextWrapper}>
                        <p>
                            Have a team? Have an idea? Now all you need is a platform to bring the two together.
                            Voxyl is your one stop shop for organizing teams, creating projects, assigning roles, 
                            and monitoring performance. Sign up to create your first Team, recruit Members, and assign 
                            Role permissions to give your Teams' Members more control over your Projects. 
                        </p>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button onClick={toSignUp}>Sign Up</button>
                        <button onClick={toLogIn}>Log In</button>
                    </div>
                </div>
            </div>
        </>
    )
}