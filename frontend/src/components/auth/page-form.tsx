'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface resultList {
    id: number
    name: string
    birth: string | null
    death: string | null
    info: boolean
    untouchable: boolean
    mini_icon: string | null
    main_icon: string | null
}

interface pageResponse {
    id: number,
    title: string,
    bread1: string,
    bread2: string,
    bread3: string,
    main_gen: number,
    main_gen_child: number,
    moderators: any[],
    tree: any[],
}

interface resultResponse {
    status: string
    version: string
    data: resultList[]
}

interface pagesResponse12 {
    pages: pageResponse[]
}

interface pageList {
    status: string
    version: string
    data: pagesResponse12
}

export function PageForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const router = useRouter();
    const [juz, setJuz] = useState<string | null>(null)
    const [text, setText] = useState<string | null>(null)
    const [page, setPage] = useState<number>(0)
    const [rular, setRular] = useState<resultList[]>([])
    const [selectedRu, setSelectedRu] = useState<string | null>(null)

    const [selectedPage, setSelectedPage] = useState<number | null>(null)

    const [pages, setPages] = useState<pageResponse[] | null>(null)

    const juzList = [
        {id: 2, name: "Ұлы жүздің ішінде"},
        {id: 3, name: "Орта жүздің ішінде"},
        {id: 4, name: "Кіші жүздің ішінде"},
        {id: 5, name: "Жүзден тыстың ішінде"},
    ]

    const juzSelect = async (value: string) => {
        setJuz(value);
        setText(juzList.find(item => item.id === parseInt(value))?.name || null)
        let id = parseInt(value)
        const response = await axios.get<resultResponse>(`https://api.atatek.kz/tree/api/tree/?node_id=${id}`, {withCredentials: true})
        setRular(response.data.data)
        console.log(response.data.data)
    }
    
    const ruSelect = async (value: string) => {
        setSelectedRu(value)
        let id = parseInt(value)
        const response = await axios.get<pageList>(`https://api.atatek.kz/pages/api/pages/page/${id}`, {withCredentials: true})
        setPages(response.data.data.pages)
        console.log(response.data)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await axios.post(`https://api.atatek.kz/auth/set-user-page?page_id=${selectedPage}`, {}, {withCredentials: true})
        console.log(response.data)
        if (response.data.status === "success") {
            router.push("/auth/register/verify")
        } else {
            toast.error(response.data.message)
        }
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Жүз және Ру</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Өз Жүзіңізді және Руңызды таңдаңыз
                </p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label>Жүз</Label>
                    <Select onValueChange={(value) => juzSelect(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Жүзіңізді таңдаңыз" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            <SelectItem value="2">Ұлы жүз</SelectItem>
                            <SelectItem value="3">Орта жүз</SelectItem>
                            <SelectItem value="4">Кіші жүз</SelectItem>
                            <SelectItem value="5">Жүзден тыс</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label>{text ? text : "Жүздің ішінде"}</Label>
                    <Select disabled={juz === null} onValueChange={(value) => ruSelect(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Жүзіңізді таңдаңыз" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            {rular.map((item) => (
                                <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label>
                        {selectedRu ? rular.find(item => item.id === parseInt(selectedRu))?.name + " ішінде" : "Руңызды таңдаңыз"}
                    </Label>
                    <Select disabled={selectedRu === null} onValueChange={(value) => setSelectedPage(parseInt(value))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Жүзіңізді таңдаңыз" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            {pages?.map((item) => (
                                <SelectItem key={item.id} value={item.id.toString()}>{item.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button type="submit" className="w-full" disabled={selectedPage === null}>
                    Тіркелу
                </Button>
                <Link href={`/auth/register/verify`} className="w-full text-center text-sm text-muted-foreground hover:text-primary">
                    Кейінірек таңдау
                </Link>
            </div>
        </form>
    )
}
