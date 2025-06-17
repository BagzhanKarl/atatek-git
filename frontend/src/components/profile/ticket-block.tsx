"use client";

import { useProfile } from "@/contexts/ProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Ticket } from "lucide-react";
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge";
import { useEffect } from "react";

export default function TicketBlock() {
    const { open_tab_id, tickets, getTickets } = useProfile();

    useEffect(() => {
        if (open_tab_id === 3) {
            getTickets();
        }
    }, [open_tab_id]);

    if (open_tab_id !== 3) return null;

    const getTicketTypeText = (type: string) => {
        switch (type) {
            case 'add_data':
                return 'Жаңа мәлімет';
            case 'edit_data':
                return 'Ақпарат өзгерту';
            default:
                return type;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge variant="secondary" className="ml-auto bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Күтуде</Badge>;
            case 'approved':
                return <Badge variant="default" className="ml-auto bg-green-100 text-green-800 hover:bg-green-100">Қабылданды</Badge>;
            case 'rejected':
                return <Badge variant="destructive" className="ml-auto bg-red-100 text-red-800 hover:bg-red-100">Қабылданбады</Badge>;
            default:
                return <Badge variant="secondary" className="ml-auto">Белгісіз</Badge>;
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <Card className="border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold">Сіз жіберген тикеттер</CardTitle>
                </CardHeader>
            </Card>
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tickets.map((ticket) => (
                    <Card key={ticket.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex flex-row gap-2 items-center text-base">
                                <Ticket className="w-8 h-8 text-primary" />
                                <span>Тикет #{ticket.id}</span>
                                {getStatusBadge(ticket.status)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-600">Тикет түрі:</span>
                                    <span className="text-sm">{getTicketTypeText(ticket.ticket_type)}</span>
                                </div>
                                {ticket.edit_data && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-600">Жазба:</span>
                                        <span className="text-sm">{ticket.edit_data.new_name}</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}