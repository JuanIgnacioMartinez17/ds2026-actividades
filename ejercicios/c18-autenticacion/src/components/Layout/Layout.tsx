import type { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps { children: ReactNode }

function Layout({ children }: LayoutProps) {
    return (
    <div>
        <Header />
        <Container className="py-4">{children}</Container>
        <Footer />
    </div>
    );
}

export default Layout;