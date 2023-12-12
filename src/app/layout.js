import { Inter } from "next/font/google";
import "./globals.sass";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Subs",
    description: "Manage your subscribitions",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
