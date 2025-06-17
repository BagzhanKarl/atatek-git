"use client";

import { useProfile } from "@/contexts/ProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

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

export default function EditBlock() {
    const { open_tab_id } = useProfile();

    const { userProfile, updateProfile, reset_password } = useProfile();

    const [first_name, setFirstName] = useState(userProfile?.first_name);
    const [last_name, setLastName] = useState(userProfile?.last_name);
    const [middle_name, setMiddleName] = useState(userProfile?.middle_name);
    const [phone] = useState(userProfile?.phone);
    const [address] = useState(userProfile?.address);

    const [old_password, setOldPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [new_password_confirm, setNewPasswordConfirm] = useState("");

    const [juz, setJuz] = useState<string | null>(null)
    const [text, setText] = useState<string | null>(null)
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
    }
    
    const ruSelect = async (value: string) => {
        setSelectedRu(value)
        let id = parseInt(value)
        const response = await axios.get<pageList>(`https://api.atatek.kz/pages/api/pages/page/${id}`, {withCredentials: true})
        setPages(response.data.data.pages)
    }

    const handleSubmit = async () => {
        if (!selectedPage) return;
        try {
            const response = await axios.post(`https://api.atatek.kz/auth/set-user-page?page_id=${selectedPage}`, {}, {withCredentials: true})
            if (response.data.status === "success") {
                toast.success("Жүз және ру сәтті өзгертілді")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Жүз және ру өзгерту кезінде қателік орын алды")
        }
    }

    if (userProfile === null) {
        return null;
    }

    if (open_tab_id !== 2) return null;
    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Басты ақпарат</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row justify-between gap-6">
                        <div className="flex flex-col gap-3 w-full">
                            <Label>Есіміңіз <span className="text-red-500">*</span></Label>
                            <Input type="text" placeholder="Сұлтан" value={first_name} onChange={(e) => setFirstName(e.target.value)}  />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <Label>Тегіңіз <span className="text-red-500">*</span></Label>
                            <Input type="text" placeholder="Омаров" value={last_name} onChange={(e) => setLastName(e.target.value)}  />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <Label>Әкеңіздің есімі</Label>
                            <Input type="text" placeholder="Берікұлы" value={middle_name} onChange={(e) => setMiddleName(e.target.value)}  />
                        </div>
                    </div>
                    <div className="flex flex-row justify-between gap-6 mt-4">
                        <div className="flex flex-col gap-3 w-full">
                            <Label>Телефон номеріңіз</Label>
                            <Input type="text" readOnly disabled placeholder="+77777777777" value={phone} />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <Label>Мекен жайыңыз</Label>
                            <Input type="text" placeholder="Алматы" readOnly disabled value={address} />
                        </div>
                    </div>
                    <div className="text-end mt-4">
                        <Button onClick={() => updateProfile(first_name || userProfile?.first_name , last_name || userProfile?.last_name , middle_name || userProfile?.middle_name )}>Сақтау</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Құпия сөз</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row justify-between gap-6">
                        <div className="flex flex-col gap-3 w-full">
                            <Label>Ескі құпия сөз</Label>
                            <Input type="password" placeholder="********" value={old_password} onChange={(e) => setOldPassword(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <Label>Жаңа құпия сөз</Label>
                            <Input type="password" placeholder="********" value={new_password} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <Label>Құпия сөзді қайталаңыз</Label>
                            <Input type="password" placeholder="********" value={new_password_confirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} />
                        </div>
                    </div>
                    <div className="text-end mt-4">
                        <Button onClick={() => reset_password(old_password, new_password, new_password_confirm)}>Сақтау</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Жүз бен Ру</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row justify-between gap-6">
                        <div className="flex flex-col gap-3 w-full">
                            <Label>Жүз</Label>
                            <Select onValueChange={(value) => juzSelect(value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Қай Жүзден екеніңізді көрсетіңіз" />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                    <SelectItem value="2">Ұлы жүз</SelectItem>
                                    <SelectItem value="3">Орта жүз</SelectItem>
                                    <SelectItem value="4">Кіші жүз</SelectItem>
                                    <SelectItem value="5">Жүзден тыс</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <Label>{text ? text : "Жүздің ішінде"}</Label>
                            <Select disabled={juz === null} onValueChange={(value) => ruSelect(value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Өз руыңызды таңдаңыз" />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                    {rular.map((item) => (
                                        <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <Label>
                                {selectedRu ? rular.find(item => item.id === parseInt(selectedRu))?.name + " ішінде" : "Руңызды таңдаңыз"}
                            </Label>
                            <Select disabled={selectedRu === null} onValueChange={(value) => setSelectedPage(parseInt(value))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Өз парақшаңызды таңдаңыз" />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                    {pages?.map((item) => (
                                        <SelectItem key={item.id} value={item.id.toString()}>{item.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="text-end mt-4">
                        <Button onClick={handleSubmit} disabled={selectedPage === null}>Сақтау</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}