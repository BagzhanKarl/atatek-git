"use client";

import { useProfile } from "@/contexts/ProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CreditCard, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "../ui/badge";

export default function SubsBlock() {
    const { user_id, open_tab_id } = useProfile();
    if (open_tab_id !== 4) return null;
    return (
        <div className="flex flex-col gap-6">
            <Card className="border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold">Жазылым тарихы</CardTitle>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="hover:bg-gray-50 transition-colors duration-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex flex-row gap-2 items-center text-base">
                            <CreditCard className="w-8 h-8 text-primary" />
                            <span>Жазылым #1</span>
                            <Badge variant="default" className="ml-auto bg-green-100 text-green-800 hover:bg-green-100">Белсенді</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600">Тариф:</span>
                                <span className="text-sm">Премиум</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600">Басталуы:</span>
                                <span className="text-sm">01.06.2025</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600">Аяқталуы:</span>
                                <span className="text-sm">01.07.2025</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:bg-gray-50 transition-colors duration-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex flex-row gap-2 items-center text-base">
                            <CreditCard className="w-8 h-8 text-primary" />
                            <span>Жазылым #2</span>
                            <Badge variant="secondary" className="ml-auto bg-gray-100 text-gray-800 hover:bg-gray-100">Аяқталған</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600">Тариф:</span>
                                <span className="text-sm">Стандарт</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600">Басталуы:</span>
                                <span className="text-sm">01.05.2025</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600">Аяқталуы:</span>
                                <span className="text-sm">31.05.2025</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:bg-gray-50 transition-colors duration-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex flex-row gap-2 items-center text-base">
                            <CreditCard className="w-8 h-8 text-primary" />
                            <span>Жазылым #3</span>
                            <Badge variant="secondary" className="ml-auto bg-gray-100 text-gray-800 hover:bg-gray-100">Аяқталған</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600">Тариф:</span>
                                <span className="text-sm">Бастапқы</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600">Басталуы:</span>
                                <span className="text-sm">01.04.2025</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600">Аяқталуы:</span>
                                <span className="text-sm">30.04.2025</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}