"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

interface UserProfile {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    phone: string;
    created_at: string;
    address: string;
    all_added_nodes: number;
    all_edited_nodes: number;
    all_family_nodes: number;
}

interface Ticket {
    ticket_type: string;
    status: string;
    created_by: number;
    answered_by: number | null;
    id: number;
    add_data: any | null;
    edit_data: {
        tree_id: number;
        new_name: string;
        new_bio: string;
        new_birth: string | null;
        new_death: string | null;
        id: number;
        ticket_id: number;
    } | null;
}

interface TicketResponse {
    status: string;
    version: string;
    data: Ticket[];
}

interface UserProfileResponse {
    status: string;
    version: string;
    data: UserProfile;
}

interface ProfileContextType {
    user_id: number;
    userProfile: UserProfile | null;
    open_tab_id: number;
    tickets: Ticket[];
    setTab: (open_tab_id: number) => void;
    setUserId: (user_id: number) => void;
    updateProfile: (first_name: string, last_name: string, middle_name: string) => Promise<void>;
    getTickets: () => Promise<void>;
    reset_password: (old_password: string, new_password: string, new_password_confirm: string) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [user_id, setUserId] = useState<number>(0);
    const [open_tab_id, setOpenTabId] = useState<number>(1);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    const fetchUserProfile = async () => {
        const response = await axios.get<UserProfileResponse>(`https://api.atatek.kz/auth/get-profile`, {withCredentials: true});
        setUserProfile(response.data.data);
    }   

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const setTab = (tab_id: number) => {
        setOpenTabId(tab_id);
    }

    const getTickets = async () => {
        try {
            const response = await axios.get<TicketResponse>('https://api.atatek.kz/ticket/my', {
                withCredentials: true
            });
            if (response.data.status === "success") {
                setTickets(response.data.data);
            }
        } catch (error) {
            toast.error("Тикеттерді алу кезінде қателік орын алды");
        }
    }

    const updateProfile = async (first_name: string, last_name: string, middle_name: string) => {
        const response = await axios.put(`https://api.atatek.kz/auth/update-user`, {
            first_name,
            last_name,
            middle_name
        }, {withCredentials: true});
        if (response.data.status === "success") {
            toast.success("Ақпарат сәтті өңделді");
        } else {
            toast.error("Ақпарат өңдеу кезінде қателік орын алды");
        }
    }
    const reset_password = async (password: string, new_password: string, confirm_password: string) => {
        try {
            const response = await axios.put(`https://api.atatek.kz/auth/reset-password`, {
                password,
                new_password,
            confirm_password
        }, {withCredentials: true});
            if (response.data.status === "success") {
                toast.success("Құпия сөз сәтті өңделді");
            } else {
                toast.error("Құпия сөз өңдеу кезінде қателік орын алды");
            }
        } catch (error) {
            toast.error("Құпия сөз өңдеу кезінде қателік орын алды");
        }       
    }

    if (userProfile === null) {
        return null;
    }

    return (
        <ProfileContext.Provider value={{ user_id, userProfile, open_tab_id, tickets, setTab, setUserId, updateProfile, getTickets, reset_password }}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) throw new Error('useProfile must be used within ProfileProvider');
    return context;
}

export { ProfileProvider };