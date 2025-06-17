"use client";

import { ArrowLeft, Calendar, Clock, Eye, Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import NewsHeader from "@/components/news/header";
import PopularPeople from "@/components/news/popular-people";

interface NewsDetailPageProps {
    params: {
        id: string;
    }
}

// Пример данных новости - в реальном проекте будет получать с API
const mockNews = {
    id: "1",
    title: "Қазақ халқының тарихи дәстүрлері мен ұлттық құндылықтары",
    content: `
        <p>Қазақ халқының тарихи дәстүрлері мен ұлттық құндылықтары ғасырлар бойы дамып, жетілдіріліп келеді. Біздің ата-бабаларымыз қалдырған мұра бүгінгі күні де өз маңызын жойған жоқ.</p>
        
        <p>Қазақ дәстүрлерінің ішінде ең басты орын алатындары - қонақжайлылық, ұлттық ойындар, ауызша әдебиет пен музыка. Бұл дәстүрлер ұрпақтан ұрпаққа берілуде.</p>
        
        <p>Қазіргі таңда жастарды ұлттық құндылықтарға тәрбиелеу, олардың санасында отансүйгіштік сезімін қалыптастыру - басты міндеттеріміздің бірі. Әрбір қазақ баласы өз тарихын, тілін, дәстүрін білуі тиіс.</p>
        
        <p>Ұлттық дәстүрлерді сақтау және дамыту - біздің барлығымыздың міндетіміз. Тек осылай ғана біз өз ұлттық болмысымызды сақтап, келешек ұрпаққа жеткізе аламыз.</p>
    `,
    publishedAt: "2024-12-18T10:00:00Z",
    views: 1250,
    likes: 89,
    comments: 34,
    author: {
        name: "Айдарбек Нұрланұлы",
        avatar: "/def-ava.png",
        role: "Тарих зерттеушісі"
    },
    image: "/hero-slide-1.jpg",
    tags: ["Тарих", "Дәстүр", "Мәдениет", "Ұлт"],
    readTime: "5 минут"
};

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
    const news = mockNews; // В реальном проекте получать по params.id

    return (
        <div className="min-h-screen bg-background">
            <NewsHeader />
            
            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link href="/zhanalyktar" className="hover:text-primary transition-colors">
                        Жарты жаңалықтары
                    </Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">Мақала</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card className="overflow-hidden">
                            <div className="relative aspect-video">
                                <Image
                                    src={news.image}
                                    alt={news.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {news.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="bg-black/70 text-white">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <CardContent className="p-6">
                                {/* Title */}
                                <h1 className="text-3xl font-bold leading-tight mb-4">
                                    {news.title}
                                </h1>

                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-primary" />
                                        <span>{new Date(news.publishedAt).toLocaleDateString('kk-KZ')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-primary" />
                                        <span>{news.readTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Eye size={16} className="text-primary" />
                                        <span>{news.views}</span>
                                    </div>
                                </div>

                                {/* Author */}
                                <div className="flex items-center gap-3 mb-6 p-4 bg-muted/50 rounded-lg">
                                    <Image
                                        src={news.author.avatar}
                                        alt={news.author.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold">{news.author.name}</p>
                                        <p className="text-sm text-muted-foreground">{news.author.role}</p>
                                    </div>
                                </div>

                                <Separator className="mb-6" />

                                {/* Content */}
                                <div 
                                    className="prose prose-lg max-w-none mb-8"
                                    dangerouslySetInnerHTML={{ __html: news.content }}
                                />

                                <Separator className="mb-6" />

                                {/* Action Buttons */}
                                <div className="flex flex-wrap items-center gap-4">
                                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                                        <Heart size={16} />
                                        <span>{news.likes}</span>
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                                        <MessageCircle size={16} />
                                        <span>{news.comments}</span>
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                                        <Share2 size={16} />
                                        Бөлісу
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                                        <Bookmark size={16} />
                                        Сақтау
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Back Button */}
                        <div className="mt-6">
                            <Link href="/zhanalyktar">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <ArrowLeft size={16} />
                                    Артқа қайту
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-start-3">
                        <div className="sticky top-6 space-y-6">
                            {/* Popular People */}
                            <Card>
                                <CardContent className="p-4">
                                    <PopularPeople />
                                </CardContent>
                            </Card>

                            {/* Related News */}
                            <Card>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold mb-4">Ұқсас жаңалықтар</h3>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((item) => (
                                            <div key={item} className="flex gap-3">
                                                <div className="relative w-16 h-16 flex-shrink-0">
                                                    <Image
                                                        src="/hero-slide-1.jpg"
                                                        alt="Related news"
                                                        fill
                                                        className="object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium line-clamp-2 mb-1">
                                                        Қазақ тарихының маңызды деректері
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Calendar size={12} />
                                                        2024.12.15
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 