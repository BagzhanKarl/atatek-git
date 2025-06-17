"use client";

import { useProfile } from "@/contexts/ProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User, Phone, MapPin, Calendar, Users, RefreshCw, UserPlus, ArrowRight } from "lucide-react";




export default function InfoBlock() {
    const { user_id, open_tab_id } = useProfile();
    const { userProfile } = useProfile();

    if (open_tab_id !== 1) return null;

    if (userProfile === null) {return null}

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Жеке ақпарат</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 w-full">
                            <User className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Аты</p>
                                <p className="text-lg font-medium">{userProfile?.first_name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Телефон</p>
                                <p className="text-lg font-medium">{userProfile?.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 w-full">
                            <User className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Тегі</p>
                                <p className="text-lg font-medium">{userProfile?.last_name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Мекенжайы</p>
                                <p className="text-lg font-medium">{userProfile?.address}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 w-full">
                            <User className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Әкесінің аты</p>
                                <p className="text-lg font-medium">{userProfile?.middle_name || "-"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Тіркелген күні</p>
                                <p className="text-lg font-medium">
                                    {userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString('ru-RU', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    }).replace(/\./g, '.') : '-'}
                                </p>
                            </div>
                        </div>       
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Дерекқордағы белсенділік</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center justify-center text-center gap-3">
                            <div className="flex items-center justify-center">
                                <Users className="h-20 w-20 text-primary mb-2" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{userProfile?.all_added_nodes}</p>
                                <p className="text-sm text-muted-foreground text-wrap max-w-[150px]">Қазақ шежіресіне қосқан адамдар саны</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center text-center gap-3">
                            <div className="flex items-center justify-center">
                                <RefreshCw className="h-20 w-20 text-primary mb-2" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{userProfile?.all_edited_nodes}</p>
                                <p className="text-sm text-muted-foreground text-wrap max-w-[150px]">Қазақ шежіресіне енгізілген өзгертулер</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center text-center gap-3">
                            <div className="flex items-center justify-center">
                                <UserPlus className="h-20 w-20 text-primary mb-2" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{userProfile?.all_family_nodes}</p>
                                <p className="text-sm text-muted-foreground text-wrap max-w-[150px]">Өз әулетіне қосқан адамдар саны</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}