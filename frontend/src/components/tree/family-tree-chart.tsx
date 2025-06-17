"use client";

import React, { useRef, useEffect, useState } from "react";
import f3 from 'family-chart';
import 'family-chart/styles/family-chart.css';
import { useTree } from '@/contexts/tree-context';
import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.atatek.kz';

export function FamilyTreeChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [treeData, setTreeData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setOpen, setSelectedPersonId } = useTree();

  useEffect(() => {
    fetchTreeData();
  }, []);

  useEffect(() => {
    if (treeData.length > 0 && containerRef.current) {
      createChart(treeData);
    }
  }, [treeData]);

  const fetchTreeData = async () => {
    try {
      setIsLoading(true);
      // Получаем данные дерева с API
      const response = await axios.get(`${API_BASE_URL}/tree/api/tree`, {
        withCredentials: true,
      });
      
      if (response.data.status === 'success' && response.data.data) {
        const formattedData = formatTreeData(response.data.data);
        setTreeData(formattedData);
      } else {
        // Если нет данных, используем заглушку
        setTreeData(getDefaultData());
      }
    } catch (error) {
      console.error('Error fetching tree data:', error);
      toast.error("Деректерді жүктеу кезінде қателік орын алды");
      // Используем заглушку при ошибке
      setTreeData(getDefaultData());
    } finally {
      setIsLoading(false);
    }
  };

  const formatTreeData = (apiData: any) => {
    // Преобразуем данные API в формат для family-chart
    if (Array.isArray(apiData)) {
      return apiData.map(person => ({
        id: person.id.toString(),
        rels: {
          spouses: person.spouses || [],
          children: person.children?.map((child: any) => child.id.toString()) || []
        },
        data: {
          "first name": person.name || "Неизвестно",
          "last name": "",
          "birthday": person.birth ? person.birth.toString() : "",
          "death year": person.death ? person.death.toString() : "",
          "avatar": person.main_icon || person.mini_icon || "https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg",
          "gender": person.gender || "M",
          "bio": person.bio || ""
        }
      }));
    }
    return getDefaultData();
  };

  const getDefaultData = () => {
    return [
      {
        "id": "1",
        "rels": {
          "spouses": [],
          "children": []
        },
        "data": {
          "first name": "Атасы",
          "last name": "Тегі",
          "birthday": "1950",
          "avatar": "https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg",
          "gender": "M",
          "death year": "",
          "bio": "Отбасы ағашының басы"
        }
      }
    ];
  };

  const createChart = (data: any[]) => {
    if (!containerRef.current) return;

    // Очищаем контейнер
    containerRef.current.innerHTML = '';

    const f3Chart = f3.createChart(containerRef.current, data)
      .setTransitionTime(1000)
      .setCardXSpacing(250)
      .setCardYSpacing(150)
      .setSingleParentEmptyCard(true, { label: 'ҚОСУ' })
      .setShowSiblingsOfMain(true)
      .setOrientationVertical();

    const f3Card = f3Chart.setCard(f3.CardHtml)
      .setCardDisplay([["first name", "last name"], ["birthday", "death year"]])
      .setCardDim({})
      .setMiniTree(true)
      .setStyle('imageCircle')
      .setOnHoverPathToMain()
      .setOnCardClick((d: any) => {
        // Обработчик клика по карточке
        if (d && d.id) {
          setSelectedPersonId(d.id);
          setOpen(true);
        }
      });

    f3Chart.updateTree({ initial: true });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Деректер жүктелуде...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div 
          ref={containerRef} 
          className="f3 f3-cont min-h-[500px] w-full"
          style={{ height: 'auto' }}
        />
      </div>
    </div>
  );
} 