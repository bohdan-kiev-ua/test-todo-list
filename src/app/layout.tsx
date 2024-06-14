import { Providers } from './providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box } from '@chakra-ui/react';
import PrivateRoute from '../components/PrivateRoute';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'The best todo list',
    description: 'The best todo list',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Box minH="100vh" display="flex" flexDir="column" bg="gray.100">
                        <Header />
                        <PrivateRoute>{children}</PrivateRoute>
                        <Footer />
                    </Box>
                </Providers>
            </body>
        </html>
    );
}
