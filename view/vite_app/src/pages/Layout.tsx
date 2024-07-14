import { ReactNode } from 'react';
import FloatingBackground from '../components/FloatingBackground';
import { Authenticate } from '../globals';

const Layout: React.FC<{children: ReactNode;}> = ({children}) => {
    return (
        <>
            <Authenticate />
            <FloatingBackground />
            {children}
        </>
    )
}

export default Layout