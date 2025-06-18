'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

export function VerifyForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
    const router = useRouter();
    const [otpValue, setOtpValue] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Проверяем что код введен полностью
        if (otpValue.length !== 6) {
            toast.error("Кодты толық енгізіңіз");
            return;
        }
        
        if (otpValue === "000111") {
            toast.success("Код дұрыс! Сізді бас бетке бағыттаймыз.");
            setTimeout(() => {
                router.push("/");
            }, 1000);
        } else {
            toast.error("Код дұрыс емес. Қайтадан көріңіз.");
        }
    }



    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Телефон номерді тексеру</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Телефон номеріңізге SMS коды жіберілді. Оны енгізіңіз.
                </p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2 flex justify-center">
                    <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                <Button type="submit" className="w-full">
                    Тіркелу
                </Button>

            </div>
        </form>
    )
}
