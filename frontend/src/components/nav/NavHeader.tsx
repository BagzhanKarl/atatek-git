"use client"
import * as React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X } from 'lucide-react';
import { useAuth } from "@/contexts/AuthContext";
import { ClientOnly } from "@/components/ClientOnly";

type Props = {

};

export const NavHeader = (props: Props) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);
    const { page, isHydrated } = useAuth();

    React.useEffect(() => {
        // Close mobile menu when route changes
        setIsOpen(false);
    }, [pathname]);

    // Prevent scroll when mobile menu is open - only after hydration
    React.useEffect(() => {
        if (!isHydrated) return;
        
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, isHydrated]);

    // Base nav items that are always available
    const baseNavItems = [
        { href: "/", label: "Шежіре" },
        { href: "/menin-auletim", label: "Менің әулетім" },
        { href: "/stats", label: "Статистика" },
    ];

    // Additional nav items based on page data - only show after hydration
    const dynamicNavItems = isHydrated && page ? [
        { href: "/menin-ruym", label: page.title },
        { href: "/zhanalyktar", label: page?.title ? page.title + " жаңалықтары" : "" },
    ] : [];

    const navItems = [...baseNavItems, ...dynamicNavItems];

    const userMenuItems = [
        { href: "/profile", label: "Менің парақшам" },
        { href: "/settings", label: "Баптаулар" },
        { href: "/auth/logout", label: "Шығу" }
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-primary text-white p-5 mt-4 rounded-2xl shadow-2xl z-1000"
            >
                <div className="flex items-center justify-between md:justify-start md:gap-10">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <Link href="/">
                            <img src="logo-text-white.png" alt="Atatek LOGO" width="120px" />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex nav-items gap-6">
                        {navItems.map((item) => (
                            <NavItem
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                isActive={pathname === item.href}
                            />
                        ))}
                    </div>

                    {/* Desktop User Avatar */}
                    <motion.div
                        className="hidden md:block ava ml-auto"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                    >
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Avatar className="rounded-xs m-auto size-10 cursor-pointer border-2 border-transparent hover:border-white transition-all duration-300">
                                        <AvatarImage src="https://githubs.com/shadcn.png" />
                                        <AvatarFallback className="bg-secondary text-black rounded-sm">БК</AvatarFallback>
                                    </Avatar>
                                </motion.div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mt-2 bg-white/95 backdrop-blur-sm">
                                {userMenuItems.map((item) => (
                                    <DropdownMenuItem
                                        key={item.href}
                                        className="cursor-pointer transition-all duration-200 hover:bg-primary/10 hover:pl-4"
                                    >
                                        <Link href={item.href}>{item.label}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden flex items-center justify-center"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ?
                            <X size={24} className="text-white" /> :
                            <Menu size={24} className="text-white" />
                        }
                    </motion.button>
                </div>
            </motion.div>

            {/* Mobile Side Menu */}
            <ClientOnly>
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black z-40"
                                onClick={() => setIsOpen(false)}
                            />

                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 20 }}
                                className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-primary z-50 p-6 overflow-y-auto"
                            >
                                <div className="flex flex-col h-full">
                                    {/* Mobile Avatar */}
                                    <div className="flex justify-center mb-8 mt-4">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <Avatar className="size-16">
                                                <AvatarImage src="https://githubs.com/shadcn.png" />
                                                <AvatarFallback className="bg-secondary text-black text-xl">БК</AvatarFallback>
                                            </Avatar>
                                        </motion.div>
                                    </div>

                                    {/* Mobile Navigation Links */}
                                    <div className="space-y-4">
                                        {navItems.map((item, idx) => (
                                            <motion.div
                                                key={item.href}
                                                initial={{ x: 50, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.1 + idx * 0.1 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className={`block py-2 px-4 text-lg font-medium rounded-lg transition-colors duration-200 ${
                                                        pathname === item.href
                                                            ? "bg-white/20 text-white"
                                                            : "text-white/80 hover:bg-white/10 hover:text-white"
                                                    }`}
                                                >
                                                    {item.label}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Mobile User Menu Items */}
                                    <div className="mt-auto mb-8">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.6 }}
                                            className="h-px bg-white my-4"
                                        />

                                        {userMenuItems.map((item, idx) => (
                                            <motion.div
                                                key={item.href}
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.3 + idx * 0.1 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="block w-full text-left py-2 px-4 text-white/90 hover:text-white transition-colors"
                                                >
                                                    {item.label}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </ClientOnly>
        </>
    );
};

const NavItem = ({ href, label, isActive }: { href: string; label: string; isActive: boolean }) => {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className="relative"
        >
            <Link href={href} className="relative group inline-block">
                <span className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>{label}</span>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transform origin-left transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
        </motion.div>
    );
};