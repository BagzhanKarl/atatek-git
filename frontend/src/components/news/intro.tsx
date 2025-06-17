import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Clock, Eye } from "lucide-react";
import { Separator } from "../ui/separator";


export default function NewsIntro() {
    return (
        <div className="w-full h-full mt-10">
            <Carousel className="relative">
                <CarouselContent>
                    <CarouselItem className="relative">
                        <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-xl">
                            <img 
                                src="/hero-slide-1.jpg" 
                                alt="News hero image" 
                                className="w-full h-full object-cover" 
                            />
                            {/* Gradient overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            
                            {/* Information block */}
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl">
                                <div className="bg-white backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
                                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                        {/* Meta tags */}
                                        <div className="flex items-center gap-4 text-gray-600 text-sm md:text-base">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-primary" />
                                                <span>12.06.2025</span>
                                            </div>
                                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                            <div className="flex items-center gap-2">
                                                <Eye className="w-4 h-4 text-primary" />
                                                <span>1,234 просмотров</span>
                                            </div>
                                        </div>
                                        
                                        {/* News title */}
                                        <div className="news-title">
                                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit
                                            </h1>
                                        </div>
                                        
                                        {/* News description */}
                                        <div className="news-description max-w-2xl mb-4">
                                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos voluptatem 
                                                assumenda dignissimos expedita consectetur.
                                            </p>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                    
                    <CarouselItem className="relative">
                        <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-xl">
                            <img 
                                src="/hero-slide-1.jpg" 
                                alt="News hero image" 
                                className="w-full h-full object-cover" 
                            />
                            {/* Gradient overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            
                            {/* Information block */}
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl">
                                <div className="bg-white backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
                                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                        {/* Meta tags */}
                                        <div className="flex items-center gap-4 text-gray-600 text-sm md:text-base">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                                <span>12.06.2025</span>
                                            </div>
                                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                            <div className="flex items-center gap-2">
                                                <Eye className="w-4 h-4 text-blue-600" />
                                                <span>1,234 просмотров</span>
                                            </div>
                                        </div>
                                        
                                        {/* News title */}
                                        <div className="news-title">
                                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit
                                            </h1>
                                        </div>
                                        
                                        {/* News description */}
                                        <div className="news-description max-w-2xl mb-4">
                                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos voluptatem 
                                                assumenda dignissimos expedita consectetur.
                                            </p>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                    
                    <CarouselItem className="relative">
                    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-xl">
                            <img 
                                src="/hero-slide-1.jpg" 
                                alt="News hero image" 
                                className="w-full h-full object-cover" 
                            />
                            {/* Gradient overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            
                            {/* Information block */}
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl">
                                <div className="bg-white backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
                                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                        {/* Meta tags */}
                                        <div className="flex items-center gap-4 text-gray-600 text-sm md:text-base">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                                <span>12.06.2025</span>
                                            </div>
                                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                            <div className="flex items-center gap-2">
                                                <Eye className="w-4 h-4 text-blue-600" />
                                                <span>1,234 просмотров</span>
                                            </div>
                                        </div>
                                        
                                        {/* News title */}
                                        <div className="news-title">
                                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit
                                            </h1>
                                        </div>
                                        
                                        {/* News description */}
                                        <div className="news-description max-w-2xl mb-4">
                                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos voluptatem 
                                                assumenda dignissimos expedita consectetur.
                                            </p>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
                <CarouselNext className="right-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
            </Carousel>
            <Separator className="my-10" />
        </div>
    )
}