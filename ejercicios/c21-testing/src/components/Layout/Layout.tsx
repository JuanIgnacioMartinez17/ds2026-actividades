import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps { children: ReactNode }

function Layout({ children }: LayoutProps) {
    return (
    <div className="app-shell">
        <Header />
        <main className="app-main">{children}</main>
        <Footer />
    </div>
    );
}

export default Layout;