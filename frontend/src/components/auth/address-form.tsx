'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface AddressResult {
    id: number
    osm: string
    name: string
    address_type: string
    latitude: number
    longitude: number
    display_name: string
}

interface AddressResponse {
    data: string
    results: AddressResult[]
}

export function AddressForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [addresses, setAddresses] = useState<AddressResult[]>([])
    const [selectedAddress, setSelectedAddress] = useState<AddressResult | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const searchAddress = async () => {
            if (query.length < 3) return;
            
            setLoading(true)
            try {
                const response = await axios.get<AddressResponse>(
                    `https://api.atatek.kz/address/api/address/?query=${encodeURIComponent(query)}`,
                    { withCredentials: true }
                );
                setAddresses(response.data.results)
            } catch (error) {
                toast.error("Мекен жайды іздеу кезінде қателік орын алды")
            } finally {
                setLoading(false)
            }
        }

        const timeoutId = setTimeout(searchAddress, 300)
        return () => clearTimeout(timeoutId)
    }, [query])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!selectedAddress) {
            toast.error("Мекен жайды таңдаңыз")
            return
        }

        try {
            await axios.post(
                `https://api.atatek.kz/auth/set-address?address=${selectedAddress.id}`,
                {},
                { withCredentials: true }
            )
            toast.success("Мекен жай сәтті тіркелді")
            router.push("/auth/register/pages")
        } catch (error) {
            toast.error("Мекен жайды тіркеу кезінде қателік орын алды")
        }
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Мекен жайды тіркеу</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Өз мекен жайыңызды іздеп, көрсетіңіз
                </p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label>Мекен жай</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                            >
                                {selectedAddress ? selectedAddress.display_name : "Мекен жайды таңдаңыз..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput 
                                    placeholder="Мекен жайды іздеу..." 
                                    value={query}
                                    onValueChange={setQuery}
                                />
                                <CommandEmpty>
                                    {loading ? "Іздеу..." : "Мекен жай табылмады"}
                                </CommandEmpty>
                                <CommandGroup>
                                    {addresses.map((address) => (
                                        <CommandItem
                                            key={address.id}
                                            value={address.display_name}
                                            onSelect={() => {
                                                setSelectedAddress(address)
                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedAddress?.id === address.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {address.display_name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <Button type="submit" className="w-full" disabled={!selectedAddress}>
                    Тіркелу
                </Button>
            </div>
        </form>
    )
}
