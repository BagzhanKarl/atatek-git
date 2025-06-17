"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Eye, Heart, Award, Users, Globe, Mail, Phone, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import NewsHeader from "@/components/news/header";

interface PersonDetailPageProps {
    params: {
        id: string;
    }
}

// Детальная информация о людях
const peopleDetails: { [key: string]: any } = {
    "1": {
        id: 1,
        name: "Асхат Албанұлы",
        fullName: "Асхат Мұрат Албанұлы",
        description: "Известный предприниматель и меценат из рода Албан",
        avatar: "/default-avatar.png",
        coverImage: "/hero-slide-1.jpg",
        tribe: "Албан",
        profession: "Предприниматель",
        birthYear: 1975,
        birthPlace: "Алматы облысы, Қарасай ауданы",
        currentLocation: "Алматы",
        education: "Қазақ Ұлттық Университеті, Экономика факультеті",
        views: 15430,
        likes: 892,
        followers: "24.8K",
        status: "online",
        achievements: [
            "Лучший предприниматель года 2023", 
            "Меценат года 2022", 
            "Герой труда Казахстана",
            "Forbes Kazakhstan 2021"
        ],
        companies: [
            "AkTech Solutions - Негізін қалаушы",
            "Green Energy KZ - Серіктес директоры",
            "Алматы IT Hub - Инвестор"
        ],
        socialProjects: [
            "Балапандарға көмек қоры",
            "Ауылдық жастарға гранттар",
            "IT білім беру бағдарламасы"
        ],
        biography: `
            <p>Асхат Мұрат Албанұлы 1975 жылы Алматы облысының Қарасай ауданында дүниеге келген. Албан руынынан шыққан бұл тұлға жас кезінен бизнеске құмарлығымен ерекшеленді.</p>
            
            <p>Қазақ Ұлттық Университетінің экономика факультетін бітіргеннен кейін, ол IT саласында өз бизнесін құрды. 2005 жылы негізін қалаған AkTech Solutions компаниясы қазір Орталық Азиядағы ең ірі IT компанияларының бірі болып табылады.</p>
            
            <p>Асхат Албанұлы тек бизнесмен ғана емес, сонымен қатар қайырымдылыққа да көп көңіл бөледі. Оның негізін қалаған "Балапандарға көмек қоры" мыңдаған отбасыларға көмек көрсетіп келеді.</p>
            
            <p>2020 жылдан бастап жасыл энергетика саласына инвестиция салып, Қазақстанда тұрақты даму мәселелерін шешуге үлес қосып келеді. Оның Green Energy KZ компаниясы жел және күн энергиясы бойынша ірі жобаларды іске асырып келеді.</p>
        `,
        timeline: [
            { year: 1975, event: "Алматы облысында туылды" },
            { year: 1997, event: "ҚазҰУ-ды бітірді" },
            { year: 2005, event: "AkTech Solutions компаниясын құрды" },
            { year: 2015, event: "Қайырымдылық қорын ашты" },
            { year: 2020, event: "Жасыл энергетика саласына кірді" },
            { year: 2023, event: "Жылдың ең үздік кәсіпкері атанды" }
        ],
        contact: {
            email: "ashat@aktech.kz",
            phone: "+7 777 123 45 67",
            website: "www.aktech.kz"
        },
        quotes: [
            "Табыс - бұл басқаларға пайда әкелу арқылы келеді",
            "Жастарға инвестиция салу - болашаққа инвестиция салу",
            "Қазақстанның технологиялық дамуы - біздің міндетіміз"
        ]
    },
    "2": {
        id: 2,
        name: "Айгүл Найманқызы",
        fullName: "Айгүл Серікқызы Найманқызы",
        description: "Культурный деятель и историк из рода Найман",
        avatar: "/default-avatar.png",
        coverImage: "/hero-slide-1.jpg",
        tribe: "Найман",
        profession: "Историк",
        birthYear: 1982,
        birthPlace: "Нур-Султан",
        currentLocation: "Нур-Султан",
        education: "Л.Н.Гумилев атындағы ЕҰУ, Тарих факультеті",
        views: 12850,
        likes: 654,
        followers: "18.3K",
        status: "online",
        achievements: [
            "Тарих ғылымдарының докторы",
            "Мәдениетке еңбегі сіңген қайраткер",
            "Жылдың ең үздік авторы 2022"
        ],
        books: [
            "Қазақ халқының тарихы", 
            "Найман руының шежіресі",
            "Дала өркениеті"
        ],
        biography: `
            <p>Айгүл Серікқызы 1982 жылы Нур-Султан қаласында дүниеге келген. Найман руының ұрпағы ретінде жас кезінен халқының тарихына қызығушылық танытты.</p>
            
            <p>Л.Н.Гумилев атындағы Еуразия ұлттық университетінің тарих факультетін үздік бітірген. Кейіннен магистратура мен докторантураны да осы университетте бітірді.</p>
            
            <p>Қазақ халқының тарихы саласында 50-ден астам ғылыми мақала жариялаған. Оның зерттеулері халықаралық деңгейде танылған және көптеген ғылыми конференцияларда баяндалған.</p>
        `,
        timeline: [
            { year: 1982, event: "Нур-Султанда туылды" },
            { year: 2004, event: "ЕҰУ-ды бітірді" },
            { year: 2010, event: "Тарих ғылымдарының кандидаты" },
            { year: 2018, event: "Докторлық дәрежесін алды" },
            { year: 2022, event: "Жылдың ең үздік авторы атанды" }
        ],
        contact: {
            email: "aigul.naiman@enu.kz",
            website: "www.kazakhistory.kz"
        },
        quotes: [
            "Тарих - бұл болашақтың кілті",
            "Өз тарихыңды білмеген халық келешегін жоғалтады"
        ]
    }
};

export default function PersonDetailPage({ params }: PersonDetailPageProps) {
    const person = peopleDetails[params.id];
    
    if (!person) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Адам табылмады</h1>
                    <Link href="/zhanalyktar/people">
                        <Button>Артқа қайту</Button>
                    </Link>
                </div>
            </div>
        );
    }

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
                    <Link href="/zhanalyktar/people" className="hover:text-primary transition-colors">
                        Танымал адамдар
                    </Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">{person.name}</span>
                </div>

                {/* Cover & Profile Section */}
                <Card className="overflow-hidden mb-8">
                    <div className="relative h-64 bg-gradient-to-r from-primary/20 to-blue-500/20">
                        <Image
                            src={person.coverImage}
                            alt="Cover"
                            fill
                            className="object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        
                        {/* Profile Info Overlay */}
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex flex-col md:flex-row md:items-end gap-4">
                                <div className="relative">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                        <Image
                                            src={person.avatar}
                                            alt={person.name}
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-2 border-white ${
                                        person.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                                    }`}></div>
                                </div>
                                
                                <div className="flex-1 text-white">
                                    <h1 className="text-2xl md:text-4xl font-bold mb-2">{person.fullName || person.name}</h1>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        <Badge className="bg-white/20 text-white border-white/30">
                                            {person.tribe}
                                        </Badge>
                                        <Badge className="bg-white/20 text-white border-white/30">
                                            {person.profession}
                                        </Badge>
                                    </div>
                                    <p className="text-white/90 text-lg">{person.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="p-4 text-center">
                                    <Eye className="w-8 h-8 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold">{person.views.toLocaleString()}</div>
                                    <div className="text-sm text-muted-foreground">Көрулер</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4 text-center">
                                    <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold">{person.likes}</div>
                                    <div className="text-sm text-muted-foreground">Ұнатулар</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4 text-center">
                                    <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold">{person.followers}</div>
                                    <div className="text-sm text-muted-foreground">Жазылушылар</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4 text-center">
                                    <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold">{new Date().getFullYear() - person.birthYear}</div>
                                    <div className="text-sm text-muted-foreground">Жас</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Biography */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Өмірбаян</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div 
                                    className="prose prose-lg max-w-none"
                                    dangerouslySetInnerHTML={{ __html: person.biography }}
                                />
                            </CardContent>
                        </Card>

                        {/* Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Өмірлік жол</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {person.timeline.map((item: any, index: number) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                                <Calendar className="w-6 h-6 text-primary" />
                                            </div>
                                            <div className="flex-1 pt-3">
                                                <div className="text-sm font-medium text-primary">{item.year}</div>
                                                <div className="text-sm text-muted-foreground">{item.event}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Companies/Books */}
                        {person.companies && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Компаниялар</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {person.companies.map((company: string, index: number) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                <span>{company}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {person.books && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Кітаптар</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {person.books.map((book: string, index: number) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                <span>{book}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Personal Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Жеке мәліметтер</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <div>
                                        <div className="text-sm font-medium">Туылған жылы</div>
                                        <div className="text-sm text-muted-foreground">{person.birthYear}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <div>
                                        <div className="text-sm font-medium">Туылған жері</div>
                                        <div className="text-sm text-muted-foreground">{person.birthPlace}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <div>
                                        <div className="text-sm font-medium">Қазіргі мекен-жайы</div>
                                        <div className="text-sm text-muted-foreground">{person.currentLocation}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Award className="w-4 h-4 text-primary" />
                                    <div>
                                        <div className="text-sm font-medium">Білімі</div>
                                        <div className="text-sm text-muted-foreground">{person.education}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Achievements */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Жетістіктері</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {person.achievements.map((achievement: string, index: number) => (
                                        <Badge key={index} variant="outline" className="w-full justify-start">
                                            <Award className="w-3 h-3 mr-2" />
                                            {achievement}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Байланыс</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {person.contact.email && (
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-primary" />
                                        <a href={`mailto:${person.contact.email}`} className="text-sm hover:text-primary">
                                            {person.contact.email}
                                        </a>
                                    </div>
                                )}
                                {person.contact.phone && (
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-primary" />
                                        <a href={`tel:${person.contact.phone}`} className="text-sm hover:text-primary">
                                            {person.contact.phone}
                                        </a>
                                    </div>
                                )}
                                {person.contact.website && (
                                    <div className="flex items-center gap-3">
                                        <Globe className="w-4 h-4 text-primary" />
                                        <a href={`https://${person.contact.website}`} className="text-sm hover:text-primary">
                                            {person.contact.website}
                                        </a>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Quotes */}
                        {person.quotes && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Дәйексөздер</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {person.quotes.map((quote: string, index: number) => (
                                            <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-sm">
                                                "{quote}"
                                            </blockquote>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Actions */}
                        <div className="space-y-3">
                            <Button className="w-full" variant="outline">
                                <Heart className="w-4 h-4 mr-2" />
                                Ұнату
                            </Button>
                            <Button className="w-full" variant="outline">
                                <Share2 className="w-4 h-4 mr-2" />
                                Бөлісу
                            </Button>
                            <Link href="/zhanalyktar/people">
                                <Button className="w-full" variant="outline">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Артқа қайту
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
