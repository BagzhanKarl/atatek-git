import React, { createContext, useContext, ReactNode, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.atatek.kz';

export interface Person {
    id: number;
    name: string;
    mini_icon: string | null;
    main_icon: string | null;
    birth: number | null;
    death: number | null;
    bio: string;
    created_by: string | null;
    children?: Person[];
}

interface TreeContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedPersonId: string | null;
    setSelectedPersonId: (id: string | null) => void;
    selectedPerson: Person | null;
    isLoading: boolean;
    addChild: (parentId: string, childName: string) => Promise<void>;
    updatePerson: (personId: string, data: Partial<Person>) => Promise<void>;
    fetchPersonData: (personId: string) => Promise<Person>;
}

const TreeContext = createContext<TreeContextType | undefined>(undefined);

export function TreeProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    const addChild = async (parentId: string, childName: string) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/ticket/create`,
                {
                    add_data: [{
                        name: childName,
                        parent_id: parseInt(parentId)
                    }],
                    created_by: user?.id,
                    ticket_type: "add_data"
                },
                { withCredentials: true }
            );
            
            if (response.data.status === 'success') {
                toast.success("Тикет сәтті құрылды");
            } else {
                toast.error("Тикет құру кезінде қателік орын алды");
                throw new Error('Failed to create ticket');
            }
        } catch (error) {
            toast.error("Ұрпақ қосу кезінде қателік орын алды");
            throw error;
        }
    };

    // Заглушка для обновления информации о человеке
    const updatePerson = async (personId: string, data: Partial<Person>) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/ticket/create`,
                {
                    edit_data: {
                        tree_id: parseInt(personId),
                        new_name: data.name || "",
                        new_bio: data.bio || "",
                        new_birth: data.birth || null,
                        new_death: data.death || null
                    },
                    created_by: user?.id,
                    ticket_type: "edit_data"
                },
                { withCredentials: true }
            );
            
            if (response.data.status === 'success') {
                toast.success("Тикет сәтті құрылды");
            } else {
                toast.error("Тикет құру кезінде қателік орын алды");
                throw new Error('Failed to create ticket');
            }
        } catch (error) {
            toast.error("Деректерді өзгерту кезінде қателік орын алды");
            throw error;
        }
    };

    // Заглушка для получения данных о человеке
    const fetchPersonData = async (personId: string): Promise<Person> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/tree/api/tree/${personId}`, {
                withCredentials: true,
            });
            
            if (response.data.status === 'success') {
                return {
                    ...response.data.data,
                    children: [] // Initialize empty children array
                };
            }
            throw new Error('Failed to fetch person data');
        } catch (error) {
            console.error('Error fetching person data:', error);
            throw error;
        }
    };

    // Эффект для загрузки данных при изменении selectedPersonId
    React.useEffect(() => {
        const loadPersonData = async () => {
            if (selectedPersonId) {
                setIsLoading(true);
                try {
                    const data = await fetchPersonData(selectedPersonId);
                    setSelectedPerson(data);
                } catch (error) {
                    console.error('Error fetching person data:', error);
                    setSelectedPerson(null);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSelectedPerson(null);
            }
        };

        loadPersonData();
    }, [selectedPersonId]);

    return (
        <TreeContext.Provider value={{
            open,
            setOpen,
            selectedPersonId,
            setSelectedPersonId,
            selectedPerson,
            isLoading,
            addChild,
            updatePerson,
            fetchPersonData
        }}>
            {children}
        </TreeContext.Provider>
    );
}

export function useTree() {
    const context = useContext(TreeContext);
    if (context === undefined) {
        throw new Error('useTree must be used within a TreeProvider');
    }
    return context;
} 