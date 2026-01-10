import { Metadata } from 'next';
import KeystaticApp from './[[...params]]/page';

export const metadata: Metadata = {
    title: 'Keystatic Admin',
    robots: 'noindex',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head />
            <body>
                <KeystaticApp />
            </body>
        </html>
    );
}
