"use client";

import React, { createContext, useContext, ReactNode, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const API_BASE_URL = 'https://api.atatek.kz';

// Интерфейсы согласно документации API
export interface PersonData {
  first_name: string;
  last_name: string;
  gender: 'M' | 'F';
  birthday: string;
  death_date?: string | null;
  avatar?: string | null;
}

export interface PersonRels {
  spouses: number[];
  children: number[];
  father?: number | null;
  mother?: number | null;
}

export interface AuletPerson {
  user_id: number;
  data: PersonData;
  rels: PersonRels;
}

export interface FamilyChartPerson {
  id: string;
  rels: {
    spouses: string[];
    children: string[];
  };
  data: {
    "first name": string;
    "last name": string;
    "birthday": string;
    "avatar": string;
    "gender": "M" | "F";
    "death_date"?: string;
  };
}

interface AuletContextType {
  // Состояние drawer
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  selectedPersonId: string | null;
  setSelectedPersonId: (id: string | null) => void;
  selectedPerson: FamilyChartPerson | null;
  
  // Состояние данных
  familyTree: FamilyChartPerson[];
  isLoading: boolean;
  
  // Методы для работы с API
  fetchFamilyTree: () => Promise<void>;
  createPerson: (personData: AuletPerson) => Promise<void>;
  updatePerson: (personId: string, personData: AuletPerson) => Promise<void>;
  deletePerson: (personId: string) => Promise<void>;
  addSpouse: (personId: string, spouseData: PersonData) => Promise<void>;
  addChild: (parentId: string, otherParentId: string | null, childData: PersonData) => Promise<void>;
}

const AuletContext = createContext<AuletContextType | undefined>(undefined);

export function AuletProvider({ children }: { children: ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<FamilyChartPerson | null>(null);
  const [familyTree, setFamilyTree] = useState<FamilyChartPerson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useAuth();

  // Получение семейного дерева
  const fetchFamilyTree = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/aulet/api/aulet/my`, {
        withCredentials: true,
      });
      
      console.log('API Response:', response.data);
      if (response.data.status === 'success' && response.data.data) {
        console.log('Setting family tree data:', response.data.data);
        setFamilyTree(response.data.data);
      } else {
        console.log('No data or failed status');
        setFamilyTree([]);
      }
    } catch (error) {
      console.error('Error fetching family tree:', error);
      toast.error("Отбасы ағашын жүктеу кезінде қателік орын алды");
      setFamilyTree([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Создание новой персоны
  const createPerson = async (personData: AuletPerson) => {
    try {
      // Проверяем лимит по тарифу
      if (user?.tariff?.t_family_count && familyTree.length >= user.tariff.t_family_count) {
        toast.error(`Тарифыңыз бойынша ең көп ${user.tariff.t_family_count} адам қосуға болады`);
        throw new Error('Family count limit exceeded');
      }

      const response = await axios.post(
        `${API_BASE_URL}/aulet/api/aulet/my/create`,
        {
          ...personData,
          user_id: user?.id
        },
        { withCredentials: true }
      );
      
      if (response.data.status === 'success') {
        toast.success("Жаңа тұлға сәтті құрылды");
        await fetchFamilyTree(); // Обновляем дерево
      } else {
        throw new Error('Failed to create person');
      }
    } catch (error) {
      console.error('Error creating person:', error);
      if (error instanceof Error && error.message === 'Family count limit exceeded') {
        // Уже показали сообщение об ошибке
        throw error;
      } else {
        toast.error("Тұлға құру кезінде қателік орын алды");
        throw error;
      }
    }
  };

  // Обновление персоны
  const updatePerson = async (personId: string, personData: AuletPerson) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/aulet/api/aulet/my/update/${personId}`,
        {
          ...personData,
          person_id: parseInt(personId)
        },
        { withCredentials: true }
      );
      
      if (response.data.status === 'success') {
        toast.success("Деректер сәтті жаңартылды");
        await fetchFamilyTree(); // Обновляем дерево
      } else {
        throw new Error('Failed to update person');
      }
    } catch (error) {
      console.error('Error updating person:', error);
      toast.error("Деректерді жаңарту кезінде қателік орын алды");
      throw error;
    }
  };

  // Удаление персоны
  const deletePerson = async (personId: string) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/aulet/api/aulet/my/delete/${personId}`,
        { withCredentials: true }
      );
      
      if (response.data.status === 'success') {
        toast.success("Тұлға сәтті жойылды");
        await fetchFamilyTree(); // Обновляем дерево
        setIsDrawerOpen(false);
      } else {
        throw new Error('Failed to delete person');
      }
    } catch (error) {
      console.error('Error deleting person:', error);
      toast.error("Тұлғаны жою кезінде қателік орын алды");
      throw error;
    }
  };

  // Добавление супруга
  const addSpouse = async (personId: string, spouseData: PersonData) => {
    try {
      const spousePersonData: AuletPerson = {
        user_id: user?.id || 0,
        data: spouseData,
        rels: {
          spouses: [parseInt(personId)],
          children: [],
          father: null,
          mother: null,
        }
      };

      await createPerson(spousePersonData);
      toast.success("Жұбай сәтті қосылды");
    } catch (error) {
      console.error('Error adding spouse:', error);
      toast.error("Жұбай қосу кезінде қателік орын алды");
      throw error;
    }
  };

  // Добавление ребенка
  const addChild = async (parentId: string, otherParentId: string | null, childData: PersonData) => {
    try {
      const parentPerson = familyTree.find(p => p.id === parentId);
      const otherParentPerson = otherParentId ? familyTree.find(p => p.id === otherParentId) : null;
      
      console.log('Adding child with parents:', { parentPerson, otherParentPerson });

      let fatherId: number | null = null;
      let motherId: number | null = null;

      // Определяем отца и мать по полу родителей
      if (parentPerson) {
        if (parentPerson.data.gender === 'M') {
          fatherId = parseInt(parentId);
        } else {
          motherId = parseInt(parentId);
        }
      }

      if (otherParentPerson) {
        if (otherParentPerson.data.gender === 'M') {
          fatherId = parseInt(otherParentId!);
        } else {
          motherId = parseInt(otherParentId!);
        }
      }

      console.log('Determined parents:', { fatherId, motherId });

      const childPersonData: AuletPerson = {
        user_id: user?.id || 0,
        data: childData,
        rels: {
          spouses: [],
          children: [],
          father: fatherId,
          mother: motherId,
        }
      };

      console.log('Child data to create:', childPersonData);

      await createPerson(childPersonData);
      toast.success("Бала сәтті қосылды");
    } catch (error) {
      console.error('Error adding child:', error);
      toast.error("Бала қосу кезінде қателік орын алды");
      throw error;
    }
  };

  // Обновляем выбранную персону когда меняется ID
  React.useEffect(() => {
    if (selectedPersonId && familyTree.length > 0) {
      const person = familyTree.find(p => p.id === selectedPersonId);
      setSelectedPerson(person || null);
    } else {
      setSelectedPerson(null);
    }
  }, [selectedPersonId, familyTree]);

  return (
    <AuletContext.Provider value={{
      isDrawerOpen,
      setIsDrawerOpen,
      selectedPersonId,
      setSelectedPersonId,
      selectedPerson,
      familyTree,
      isLoading,
      fetchFamilyTree,
      createPerson,
      updatePerson,
      deletePerson,
      addSpouse,
      addChild
    }}>
      {children}
    </AuletContext.Provider>
  );
}

export function useAulet() {
  const context = useContext(AuletContext);
  if (context === undefined) {
    throw new Error('useAulet must be used within a AuletProvider');
  }
  return context;
} 