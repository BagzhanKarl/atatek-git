"use client";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import Image from "next/image";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Info, Ticket, Pencil, CreditCard } from "lucide-react"
import { useProfile } from "@/contexts/ProfileContext"

export default function LeftBlock() {
    const { setTab, open_tab_id, userProfile } = useProfile();

    if (userProfile === null) {
        return null;
    }

    return (
        <div>
            <Card>
                <CardContent className="flex flex-col items-center justify-center">
                    <Image src="/default-avatar.png" alt="profile-image" width={256} height={256} />
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-bold">{userProfile?.first_name} {userProfile?.last_name}</h1>
                        <p className="text-sm text-gray-500">{userProfile?.phone}</p>
                    </div>
                    <Separator className="w-full my-4" />
                    <div className="w-full flex flex-col gap-3">
                        <Button variant={open_tab_id === 1 ? "default" : "outline"} onClick={() => setTab(1)}>
                            <Info />
                            <p>Ақпарат</p>
                        </Button>
                        <Button variant={open_tab_id === 2 ? "default" : "outline"} onClick={() => setTab(2)}>
                            <Pencil />
                            <p>Өңдеу</p>
                        </Button>
                        <Button variant={open_tab_id === 3 ? "default" : "outline"} onClick={() => setTab(3)}>
                            <Ticket />
                            <p>Тикеттер</p>
                        </Button>
                        <Button disabled variant={open_tab_id === 4 ? "default" : "outline"} onClick={() => setTab(4)}>
                            <CreditCard />
                            <p>Жазылымдар</p>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}