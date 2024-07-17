import { inclusiveRandomInteger } from "../../globals";
import { themes } from "../../theme";
import FloatingParticle from "./FloatingParticle";

export default function Loader() {
    const colorScheme: number = inclusiveRandomInteger(1, 6)
    
    return (
        <>
            <div style={{position: 'absolute', width: '30vw', left: '35vw', top: '20vh', aspectRatio: '16 / 9'}}>
                <div style={{width: '100%', height: '100%'}}>
                    <FloatingParticle width={25} particleWidth={7} duration={1} glowBase={themes[0][colorScheme].glowBase} glowColor={themes[0][colorScheme].glowColor} />
                    <FloatingParticle width={25} particleWidth={7} duration={1.05} glowBase={themes[0][colorScheme].glowBase} glowColor={themes[0][colorScheme].glowColor} />
                    <FloatingParticle width={25} particleWidth={7} duration={1.1} glowBase={themes[0][colorScheme].glowBase} glowColor={themes[0][colorScheme].glowColor} />
                    <FloatingParticle width={25} particleWidth={7} duration={1.15} glowBase={themes[0][colorScheme].glowBase} glowColor={themes[0][colorScheme].glowColor} />
                </div>
            </div>
        </>
    )
}
//, transform: 'rotate(90deg)'