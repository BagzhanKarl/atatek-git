'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PhoneInputField } from "@/components/ui/phone-input"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
    const router = useRouter();
    const { login } = useAuth();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const phoneNumber = "+" + phone.replace(/\s/g, '');
        register(phoneNumber, password, first_name, last_name);
    }


    const register = async (phone: string, password: string, first_name: string, last_name: string) => {
        const response = await axios.post('https://api.atatek.kz/auth/signup', { phone, password, first_name, last_name }, { withCredentials: true });
        console.log(response);
        if (response.status === 200) {
            login(phone, password);
            router.push('/auth/register/address');
        }
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Жүйеге тіркелу</h1>
                <p className="text-muted-foreground text-sm text-balance">
                Телефон номеріңіз арқылы тіркеліңіз
                </p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="phone">Телефон номері</Label>
                    <PhoneInputField
                        value={phone}
                        onChange={setPhone}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Есіміңіз</Label>
                    <Input id="name" type="text" placeholder="Сұлтан" required value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="last_name">Тегіңіз</Label>
                    <Input id="last_name" type="text" required placeholder="Сапаров" value={last_name} onChange={(e) => setLast_name(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Құпия сөз</Label>
                    <Input id="password" type="password" required placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full">
                    Тіркелу
                </Button>

            </div>
            <div className="text-center text-sm">
                Аккаунтыңыз бар ма?{" "}
                <a href="/auth/login" className="underline underline-offset-4">
                Жүйеге кіру
                </a>
            </div>
        </form>
    )
}
