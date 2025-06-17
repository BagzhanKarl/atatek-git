import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, ChevronRight } from "lucide-react";

const popularPeople = [
    {
        id: 1,
        name: "Асхат Албанұлы",
        description: "Известный предприниматель и меценат из рода Албан",
        avatar: "/default-avatar.png",
        followers: "24.8K",
        tribe: "Албан",
        profession: "Предприниматель"
    },
    {
        id: 2,
        name: "Айгүл Найманқызы",
        description: "Культурный деятель и историк из рода Найман",
        avatar: "/default-avatar.png",
        followers: "18.3K",
        tribe: "Найман",
        profession: "Историк"
    },
    {
        id: 3,
        name: "Берік Қыпшақұлы",
        description: "IT-инноватор и стартап-основатель из рода Кыпшак",
        avatar: "/default-avatar.png",
        followers: "31.2K",
        tribe: "Қыпшақ",
        profession: "IT-инноватор"
    },
    {
        id: 4,
        name: "Гүлнұр Жалайырқызы",
        description: "Общественный деятель и блогер из рода Жалайыр",
        avatar: "/default-avatar.png",
        followers: "15.7K",
        tribe: "Жалайыр",
        profession: "Блогер"
    },
    {
        id: 5,
        name: "Дәурен Керейұлы",
        description: "Спортсмен и тренер из рода Керей",
        avatar: "/default-avatar.png",
        followers: "12.4K",
        tribe: "Керей",
        profession: "Спортсмен"
    }
];

export default function PopularPeople() {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Заголовок */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-blue-50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Танымал адамдар</h2>
                     
                    </div>
                </div>
            </div>

            {/* Список людей */}
            <div className="divide-y divide-gray-50">
                {popularPeople.map((person, index) => (
                    <Link key={person.id} href={`/zhanalyktar/people/${person.id}`}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            className="p-4 hover:bg-gray-50/50 transition-all duration-200 group cursor-pointer"
                        >
                        <div className="flex items-start gap-4">
                            {/* Аватар */}
                            <div className="relative flex-shrink-0">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-primary/20 transition-colors duration-200">
                                    <Image 
                                        src={person.avatar} 
                                        alt={person.name} 
                                        width={48} 
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>

                            {/* Информация */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors duration-200 line-clamp-1 group-hover:underline decoration-primary/30 underline-offset-2">
                                            {person.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded-full font-medium">
                                                {person.tribe}
                                            </span>
                                            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full font-medium">
                                                {person.profession}
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors duration-200 flex-shrink-0 opacity-0 group-hover:opacity-100" />
                                </div>
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                                    {person.description}
                                </p>
                            </div>
                        </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Кнопка "Показать всех" */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                <Link 
                    href="/zhanalyktar/people"
                    className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 group"
                >
                    <span>Барлығын көру</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
            </div>
        </div>
    );
}