"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
    Search, 
    Calendar, 
    Clock, 
    Eye, 
    Heart, 
    MessageCircle, 
    TrendingUp,
    Filter,
    Newspaper,
    Users,
    Star,
    ChevronRight,
    Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import NewsHeader from "@/components/news/header";
import PopularPeople from "@/components/news/popular-people";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

// Mock данные для демонстрации
const featuredNews = [
    {
        id: 1,
        title: "Қазақ халқының ұлттық мұраларын сақтау жобасы іске қосылды",
        description: "Мәдениет министрлігі елдегі ең құнды тарихи мұраларды сандық форматта сақтау жобасын бастады. Бұл жоба халқымыздың бай тарихын келешек ұрпаққа жеткізуге бағытталған.",
        image: "/hero-slide-1.jpg",
        category: "Мәдениет",
        publishedAt: "2024-12-18T10:00:00Z",
        views: 15420,
        likes: 1240,
        comments: 85,
        readTime: "7 минут",
        isFeatured: true
    },
    {
        id: 2,
        title: "Алматыда дәстүрлі қазақ өнерінің фестивалі өтті",
        description: "Дәстүрлі музыка, би және қолөнер шеберлерінің қатысуымен өткен фестиваль мыңдаған адамды тәнті етті.",
        image: "/Panorama(sharyn).jpg",
        category: "Өнер",
        publishedAt: "2024-12-17T14:30:00Z",
        views: 8750,
        likes: 560,
        comments: 42,
        readTime: "5 минут",
        isFeatured: true
    },
    {
        id: 3,
        title: "Жас ғалымдар қазақ тілінің тарихын зерттеуде жаңа деректер тапты",
        description: "Археологиялық қазба жұмыстары барысында табылған жазулар қазақ тілінің қалыптасу тарихына жаңа көзқарас ұсынды.",
        image: "/hero-slide-1.jpg",
        category: "Ғылым",
        publishedAt: "2024-12-16T09:15:00Z",
        views: 12300,
        likes: 890,
        comments: 67,
        readTime: "6 минут",
        isFeatured: true
    }
];

const recentNews = [
    {
        id: 4,
        title: "Нұр-Сұлтанда Абай оқулары өтті",
        description: "Ұлы ақынның 180 жылдығына арналған іс-шара республика көлемінде үлкен қызығушылық тудырды.",
        image: "/hero-slide-1.jpg",
        category: "Әдебиет",
        publishedAt: "2024-12-15T16:45:00Z",
        views: 6840,
        likes: 420,
        comments: 28,
        readTime: "4 минут"
    },
    {
        id: 5,
        title: "Қазақстанның дәстүрлі асханасы UNESCO тізіміне енді",
        description: "Халықаралық ұйым қазақ асханасының бірегейлігін мойындады және оны дүниежүзілік мұра тізіміне қосты.",
        image: "/Panorama(sharyn).jpg",
        category: "Асхана",
        publishedAt: "2024-12-14T11:20:00Z",
        views: 9200,
        likes: 750,
        comments: 54,
        readTime: "5 минут"
    },
    {
        id: 6,
        title: "Ауылдық жерлерде дәстүрлі қолөнер дамыту бағдарламасы",
        description: "Мемлекеттік бағдарлама арқылы отбасылық шеберханалар ашылып, жергілікті шеберлерге қолдау көрсетілуде.",
        image: "/hero-slide-1.jpg",
        category: "Қолөнер",
        publishedAt: "2024-12-13T13:10:00Z",
        views: 4580,
        likes: 310,
        comments: 19,
        readTime: "3 минут"
    },
    {
        id: 7,
        title: "Қазақ домбырасының дүниежүзілік танылуы",
        description: "Ұлттық музыка аспабымыз халықаралық сайыстарда жеңіске жетіп, әлемге танылуда.",
        image: "/hero-slide-1.jpg",
        category: "Музыка",
        publishedAt: "2024-12-12T08:30:00Z",
        views: 7650,
        likes: 580,
        comments: 33,
        readTime: "4 минут"
    },
    {
        id: 8,
        title: "Тарихи мұражайларда қонақ саны күрт өсті",
        description: "Соңғы жылы елдегі тарихи мұражайларға келушілер саны 40% артты.",
        image: "/Panorama(sharyn).jpg",
        category: "Туризм",
        publishedAt: "2024-12-11T15:45:00Z",
        views: 5420,
        likes: 380,
        comments: 25,
        readTime: "3 минут"
    },
    {
        id: 9,
        title: "Жас жазушылар дарынды дамыту жобасы",
        description: "Қазақ әдебиетін дамыту мақсатында жас авторларға арнайы дайындық курстары ұйымдастырылды.",
        image: "/hero-slide-1.jpg",
        category: "Әдебиет",
        publishedAt: "2024-12-10T12:15:00Z",
        views: 3290,
        likes: 250,
        comments: 16,
        readTime: "4 минут"
    }
];

const categories = ["Барлығы", "Мәдениет", "Өнер", "Ғылым", "Әдебиет", "Асхана", "Қолөнер", "Музыка", "Туризм"];

const stats = [
    { icon: Newspaper, label: "Жаңалықтар", value: "1,240+", color: "text-blue-600" },
    { icon: Users, label: "Авторлар", value: "85", color: "text-green-600" },
    { icon: Eye, label: "Көрушілер", value: "45,380", color: "text-purple-600" },
    { icon: Star, label: "Рейтинг", value: "4.9", color: "text-yellow-600" }
];

export default function Zhanalyktar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Барлығы");

    const filteredNews = recentNews.filter(news => {
        const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             news.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "Барлығы" || news.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-background">
            <NewsHeader />
            
            <div className="container mx-auto px-4 md:px-6">
                {/* Hero Section с каруселью */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="py-8"
                >
                    <Carousel className="relative">
                        <CarouselContent>
                            {featuredNews.map((news, index) => (
                                <CarouselItem key={news.id}>
                                    <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden group">
                                        <Image
                                            src={news.image}
                                            alt={news.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            priority={index === 0}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        
                                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3, duration: 0.6 }}
                                                className="max-w-4xl"
                                            >
                                                <Badge className="mb-4 bg-primary/90 text-primary-foreground">
                                                    {news.category}
                                                </Badge>
                                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                                                    {news.title}
                                                </h1>
                                                <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed max-w-3xl">
                                                    {news.description}
                                                </p>
                                                <div className="flex flex-wrap items-center gap-6 mb-6">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{new Date(news.publishedAt).toLocaleDateString('kk-KZ')}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{news.readTime}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Eye className="w-4 h-4" />
                                                        <span>{news.views.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                                <Link href={`/zhanalyktar/${news.id}`}>
                                                    <Button size="lg" className="group">
                                                        Толығырақ оқу
                                                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </Button>
                                                </Link>
                                            </motion.div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20" />
                        <CarouselNext className="right-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20" />
                    </Carousel>
                </motion.section>

                {/* Stats Section */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="py-12"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                            >
                                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-6">
                                        <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <Separator className="my-8" />

                {/* Search and Filter Section */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="py-8"
                >
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Соңғы жаңалықтар</h2>
                            <p className="text-muted-foreground">Қазақ халқының мәдениеті мен тарихынан ең жаңа хабарлар</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Жаңалықтарды іздеу..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-full sm:w-80"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {categories.map(category => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className="transition-all duration-200"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </motion.section>

                {/* News Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredNews.map((news, index) => (
                                <motion.div
                                    key={news.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                                >
                                    <Link href={`/zhanalyktar/${news.id}`}>
                                        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full overflow-hidden">
                                            <div className="relative aspect-video overflow-hidden">
                                                <Image
                                                    src={news.image}
                                                    alt={news.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <Badge variant="secondary" className="bg-black/70 text-white">
                                                        {news.category}
                                                    </Badge>
                                                </div>
                                            </div>
                                            
                                            <CardContent className="p-6">
                                                <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                                    {news.title}
                                                </h3>
                                                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
                                                    {news.description}
                                                </p>
                                                
                                                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            <span>{new Date(news.publishedAt).toLocaleDateString('kk-KZ')}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            <span>{news.readTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Eye className="w-3 h-3" />
                                                            <span>{news.views}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Heart className="w-3 h-3" />
                                                            <span>{news.likes}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <MessageCircle className="w-3 h-3" />
                                                            <span>{news.comments}</span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            className="text-center mt-12"
                        >
                            <Button variant="outline" size="lg" className="group">
                                Көбірек көру
                                <TrendingUp className="w-4 h-4 ml-2 group-hover:translate-y-[-2px] transition-transform" />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="lg:col-start-3"
                    >
                        <div className="sticky top-6 space-y-6">
                            <PopularPeople />
                            
                            {/* Newsletter Signup */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-4">Жаңалықтар таратылымы</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Соңғы жаңалықтарды алғашқы болып біліңіз
                                    </p>
                                    <div className="space-y-3">
                                        <Input placeholder="Email мекенжайыңыз" />
                                        <Button className="w-full">
                                            Жазылу
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Links */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-4">Жылдам сілтемелер</h3>
                                    <div className="space-y-2">
                                        <Link href="/zhanalyktar/people" className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors">
                                            <span className="text-sm">Танымал тұлғалар</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                        <Link href="/zhanalyktar/archive" className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors">
                                            <span className="text-sm">Мұрағат</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                        <Link href="/zhanalyktar/video" className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors">
                                            <span className="text-sm">Видео контент</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                </div>

                {/* Newsletter Section */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                    className="py-12"
                >
                    <div className="relative rounded-2xl overflow-hidden">
                        <Image
                            src="/Panorama(sharyn).jpg"
                            alt="Newsletter background"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                        <div className="relative z-10 py-16 px-8 text-center text-white">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Біздің жаңалықтар таратылымына жазылыңыз
                            </h2>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                Қазақ халқының мәдениеті мен тарихынан ең соңғы жаңалықтарды алғашқы болып біліңіз
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <Input 
                                    placeholder="Email мекенжайыңыз" 
                                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70"
                                />
                                <Button size="lg" className="bg-primary hover:bg-primary/90">
                                    Жазылу
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}