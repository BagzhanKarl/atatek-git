'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PhoneInputField } from "@/components/ui/phone-input"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const { login } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phoneNumber = "+" + phone.replace(/\s/g, '');
    const res = await login(phoneNumber, password);
    if (res) {
      router.push("/");
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Жүйеге кіру</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Телефон номеріңізді енгізіңіз
            </p>
        </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="phone">Телефон номері</Label>
          <PhoneInputField
            value={phone}
            onChange={setPhone}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Құпия сөз</Label>
            <a
              href="/auth/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Құпия сөзіңізді ұмыттыңыз ба?
            </a>
          </div>
          <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="w-full">
          Жүйеге кіру
        </Button>

      </div>
      <div className="text-center text-sm">
        Әлі тіркелген жоқсыз ба?{" "}
        <a href="/auth/register" className="underline underline-offset-4">
          Тіркелу
        </a>
      </div>
    </form>
  )
}
