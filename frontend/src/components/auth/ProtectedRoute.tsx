"use client";

import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading, error, isHydrated } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (isHydrated && !loading && !user && error) {
            const isAuthPage = pathname?.startsWith('/auth/');
            if (!isAuthPage) {
                router.push('/auth/login');
            }
        }
    }, [isHydrated, loading, user, error, pathname, router]);

    // Show loading while checking auth or hydrating
    if (!isHydrated || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    // If not authenticated and not on auth page, show loading
    // (redirect will happen via useEffect)
    if (!user && !pathname?.startsWith('/auth/')) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    // If on auth page but already authenticated, allow rendering
    // (redirect logic would be handled by auth pages themselves)
    return <>{children}</>;
} 