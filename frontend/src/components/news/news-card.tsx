import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";


export default function NewsCard() {
    return (
        <div className="bg-white rounded-xl  transition-shadow duration-300 overflow-hidden group">
            <div className="relative aspect-square overflow-hidden">
                <Image 
                    src="/hero-slide-1.jpg" 
                    alt="News" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    width={400} 
                    height={400} 
                    priority
                />
            </div>
            <div className="p-4 space-y-3">
                <div className="flex gap-4">
                    <span className="flex items-center gap-2 text-gray-500 text-xs">
                        <Clock className="text-primary" size={14} />
                        <span>12.06.2025</span>
                    </span>
                    <span className="flex items-center gap-2 text-gray-500 text-xs">
                        <Eye className="text-primary" size={14} />
                        <span>245</span>
                    </span>
                </div>
                <h3 className="text-lg font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos et voluptate.
                </p>
                <Link href="/zhanalyktar/1" className="w-full">
                    <Button variant="outline" size="sm" className="w-full mt-3 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                        Толығырақ
                        <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}