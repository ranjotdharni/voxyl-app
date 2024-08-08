import { useContext } from "react";
import Layout, { Context } from "../../pages/Layout";
import { themes } from "../../theme";
import VoxylIcon from '../../assets/img/png/voxyl.png'


export default function WIP() {
    const [theme, mode] = useContext(Context)

    return (
        <Layout>
            <section style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <img src={VoxylIcon} style={{width: '50px', aspectRatio: 1, marginRight: '10px'}} />
                <h1 style={{color: themes[mode][theme].primary.header}}>Coming Soon...</h1>
            </section>
        </Layout>
    )
}