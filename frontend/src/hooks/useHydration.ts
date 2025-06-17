"use client";

import { useEffect, useState } from "react";

export function useHydration() {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return isHydrated;
}

export function useIsomorphicLayoutEffect(effect: () => void | (() => void), deps?: React.DependencyList) {
    const isHydrated = useHydration();
    
    useEffect(() => {
        if (isHydrated) {
            return effect();
        }
    }, [isHydrated, ...(deps || [])]);
} 