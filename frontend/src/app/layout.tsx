import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner"

const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["cyrillic"],
});

const nunitoSans = Nunito_Sans({
    variable: "--font-nunito-sans",
    subsets: ["cyrillic"],
});

export const metadata: Metadata = {
    title: "ATATEK - Онлайн шежіре",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="kz">
            <body className={`${nunito.variable} ${nunitoSans.variable} antialiased`}>
                <AuthProvider>
                    {children}
                </AuthProvider>
                <Toaster />
            </body>
        </html>
    );
}
