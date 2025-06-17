"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Users, Filter, MapPin, Calendar, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import NewsHeader from "@/components/news/header";

interface Person {
    id: number;
    name: string;
    description: string;
    avatar: string;
    followers: string;
    tribe: string;
    profession: string;
    birthYear: number;
    location: string;
    views: number;
    likes: number;
    achievements: string[];
    status: "online" | "offline";
}

const allPeople: Person[] = [
    {
        id: 1,
        name: "Асхат Албанұлы",
        description: "Известный предприниматель и меценат из рода Албан. Основатель нескольких крупных компаний в сфере IT и энергетики.",
        avatar: "/default-avatar.png",
        followers: "24.8K",
        tribe: "Албан",
        profession: "Предприниматель",
        birthYear: 1975,
        location: "Алматы",
        views: 15430,
        likes: 892,
        achievements: ["Лучший предприниматель года", "Меценат года", "Герой труда"],
        status: "online"
    },
    {
        id: 2,
        name: "Айгүл Найманқызы",
        description: "Культурный деятель и историк из рода Найман. Автор множества научных работ по истории казахского народа.",
        avatar: "/default-avatar.png",
        followers: "18.3K",
        tribe: "Найман",
        profession: "Историк",
        birthYear: 1982,
        location: "Нур-Султан",
        views: 12850,
        likes: 654,
        achievements: ["Доктор исторических наук", "Заслуженный деятель культуры", "Автор года"],
        status: "online"
    },
    {
        id: 3,
        name: "Берік Қыпшақұлы",
        description: "IT-инноватор и стартап-основатель из рода Кыпшак. Создатель революционных технологических решений.",
        avatar: "/default-avatar.png",
        followers: "31.2K",
        tribe: "Қыпшақ",
        profession: "IT-инноватор",
        birthYear: 1988,
        location: "Шымкент",
        views: 22150,
        likes: 1234,
        achievements: ["Forbes 30 under 30", "Стартап года", "IT-инноватор"],
        status: "online"
    },
    {
        id: 4,
        name: "Гүлнұр Жалайырқызы",
        description: "Общественный деятель и блогер из рода Жалайыр. Активист в области защиты прав женщин и детей.",
        avatar: "/default-avatar.png",
        followers: "15.7K",
        tribe: "Жалайыр",
        profession: "Блогер",
        birthYear: 1990,
        location: "Актобе",
        views: 9840,
        likes: 567,
        achievements: ["Активист года", "Защитник прав", "Общественный деятель"],
        status: "offline"
    },
    {
        id: 5,
        name: "Дәурен Керейұлы",
        description: "Спортсмен и тренер из рода Керей. Чемпион мира по национальной борьбе казак курес.",
        avatar: "/default-avatar.png",
        followers: "12.4K",
        tribe: "Керей",
        profession: "Спортсмен",
        birthYear: 1985,
        location: "Павлодар",
        views: 8920,
        likes: 445,
        achievements: ["Чемпион мира", "Мастер спорта", "Тренер года"],
        status: "online"
    },
    {
        id: 6,
        name: "Жанар Арғынқызы",
        description: "Певица и композитор из рода Аргын. Популяризатор казахской народной музыки на мировой сцене.",
        avatar: "/default-avatar.png",
        followers: "45.2K",
        tribe: "Арғын",
        profession: "Певица",
        birthYear: 1978,
        location: "Алматы",
        views: 35420,
        likes: 2150,
        achievements: ["Заслуженная артистка", "Золотой микрофон", "Артист года"],
        status: "online"
    },
    {
        id: 7,
        name: "Мұрат Дулатұлы",
        description: "Писатель и поэт из рода Дулат. Лауреат множественных литературных премий и конкурсов.",
        avatar: "/default-avatar.png",
        followers: "21.8K",
        tribe: "Дулат",
        profession: "Писатель",
        birthYear: 1970,
        location: "Тараз",
        views: 16780,
        likes: 934,
        achievements: ["Лауреат премии Абая", "Писатель года", "Поэт-лауреат"],
        status: "offline"
    },
    {
        id: 8,
        name: "Салтанат Үйсінқызы",
        description: "Врач-кардиохирург из рода Уйсун. Спасла тысячи жизней и внедрила новые методы лечения.",
        avatar: "/default-avatar.png",
        followers: "19.5K",
        tribe: "Үйсін",
        profession: "Врач",
        birthYear: 1980,
        location: "Алматы",
        views: 14230,
        likes: 786,
        achievements: ["Заслуженный врач", "Врач года", "Спаситель жизней"],
        status: "online"
    }
];


export default function PeoplePage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPeople = allPeople.filter(person => {
        const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             person.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesSearch;
    });

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
                    <span className="text-foreground font-medium">Танымал адамдар</span>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Users className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-4xl font-bold">Танымал адамдар</h1>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Қазақ халқының әртүрлі салаларында танылған және жетістікке жеткен ұлы тұлғалар
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8 space-y-4">
                    {/* Search */}
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            placeholder="Адамдарды іздеу..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Results Count */}
                <div className="text-center mb-6">
                    <p className="text-muted-foreground">
                        Табылды: <span className="font-semibold text-foreground">{filteredPeople.length}</span> адам
                    </p>
                </div>

                {/* People Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPeople.map((person) => (
                        <Link key={person.id} href={`/zhanalyktar/people/${person.id}`}>
                            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                                <CardContent className="p-6">
                                    {/* Avatar */}
                                    <div className="relative mb-4">
                                        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-primary/20 transition-colors duration-200">
                                            <Image
                                                src={person.avatar}
                                                alt={person.name}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white mx-auto left-1/2 transform -translate-x-1/2 ${
                                            person.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                                        }`}></div>
                                    </div>

                                    {/* Name and Title */}
                                    <div className="text-center mb-3">
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-200 mb-1">
                                            {person.name}
                                        </h3>
                                        <div className="flex flex-wrap gap-1 justify-center mb-2">
                                            <Badge variant="secondary" className="text-xs">
                                                {person.tribe}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs">
                                                {person.profession}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground text-center line-clamp-3 mb-4">
                                        {person.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 text-center text-xs text-muted-foreground">
                                        <div className="flex items-center justify-center gap-1">
                                            <Eye size={12} className="text-primary" />
                                            <span>{person.views.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-1">
                                            <Heart size={12} className="text-primary" />
                                            <span>{person.likes}</span>
                                        </div>
                                    </div>

                                    {/* Location and Birth Year */}
                                    <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={12} className="text-primary" />
                                            <span>{person.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} className="text-primary" />
                                            <span>{new Date().getFullYear() - person.birthYear} жас</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* No Results */}
                {filteredPeople.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Ешқандай нәтиже табылмады</h3>
                        <p className="text-muted-foreground">
                            Іздеу параметрлерін өзгертіп көріңіз
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
} 