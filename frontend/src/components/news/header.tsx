import Image from "next/image";
import { Separator } from "../ui/separator";

export default function NewsHeader() {
    return (
        <>
            <div className="header flex justify-between items-center py-6 px-4 md:px-6">
                <div className="flex items-center">
                    <Image 
                        src="/LOGO.png" 
                        alt="Zhanalyktar" 
                        width={200} 
                        height={100} 
                        className="transition-transform duration-200 hover:scale-105" 
                    />
                </div>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <a 
                        href="/" 
                        className="text-foreground hover:text-primary font-medium transition-all duration-200 hover:scale-105 relative group"
                    >
                        Шежіре
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                    </a>
                    <a 
                        href="/menin-auletim" 
                        className="text-foreground hover:text-primary font-medium transition-all duration-200 hover:scale-105 relative group"
                    >
                        Менің әулетім
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                    </a>
                    <a 
                        href="/stats" 
                        className="text-foreground hover:text-primary font-medium transition-all duration-200 hover:scale-105 relative group"
                    >
                        Статистика
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                    </a>
                    <a 
                        href="/menin-ruym" 
                        className="text-foreground hover:text-primary font-medium transition-all duration-200 hover:scale-105 relative group"
                    >
                        Жарты
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                    </a>
                    <a 
                        href="/zhanalyktar" 
                        className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 hover:bg-primary/90"
                    >
                        Жарты жаңалықтары
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 rounded-lg bg-card border border-border hover:bg-accent transition-colors duration-200">
                    <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            
            {/* Mobile Navigation - Hidden by default, can be toggled */}
            <div className="md:hidden border-t border-border bg-card/50 backdrop-blur-sm">
                <nav className="flex flex-col space-y-1 p-4">
                    <a 
                        href="#" 
                        className="text-foreground hover:text-primary hover:bg-accent px-4 py-3 rounded-lg font-medium transition-all duration-200"
                    >
                        Шежіре
                    </a>
                    <a 
                        href="#" 
                        className="text-foreground hover:text-primary hover:bg-accent px-4 py-3 rounded-lg font-medium transition-all duration-200"
                    >
                        Менің әулетім
                    </a>
                    <a 
                        href="#" 
                        className="text-foreground hover:text-primary hover:bg-accent px-4 py-3 rounded-lg font-medium transition-all duration-200"
                    >
                        Статистика
                    </a>
                    <a 
                        href="#" 
                        className="text-foreground hover:text-primary hover:bg-accent px-4 py-3 rounded-lg font-medium transition-all duration-200"
                    >
                        Жарты
                    </a>
                    <a 
                        href="#" 
                        className="bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-primary/90 text-center mt-2"
                    >
                        Жарты жаңалықтары
                    </a>
                </nav>
            </div>
            
            <Separator className="bg-border/50" />
        </>
    )
}