"use client";

import React, { useRef, useEffect } from "react";
import f3 from 'family-chart';
import 'family-chart/styles/family-chart.css';
import { useAulet } from '@/contexts/aulet-context';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Стили для линий семейного дерева
const treeStyles = `
  .f3 .link {
    stroke: #374151 !important;
    stroke-width: 2px !important;
    fill: none !important;
  }
  
  .f3 .link-marriage {
    stroke: #dc2626 !important;
    stroke-width: 2px !important;
    fill: none !important;
  }
  
  .f3 .link-parent {
    stroke: #059669 !important;
    stroke-width: 2px !important;
    fill: none !important;
  }
  
  .f3 .link-child {
    stroke: #2563eb !important;
    stroke-width: 2px !important;
    fill: none !important;
  }
  
  .f3 path {
    stroke: #374151 !important;
    stroke-width: 2px !important;
    fill: none !important;
  }
  
  .f3 line {
    stroke: #374151 !important;
    stroke-width: 2px !important;
  }
`;

interface AuletFamilyChartProps {
  orientation?: "vertical" | "horizontal";
}

export function AuletFamilyChart({ orientation = "vertical" }: AuletFamilyChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { 
    familyTree, 
    isLoading, 
    fetchFamilyTree, 
    setSelectedPersonId, 
    setIsDrawerOpen 
  } = useAulet();

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    fetchFamilyTree();
  }, [fetchFamilyTree]);

  // Создаем диаграмму при изменении данных
  useEffect(() => {
    console.log('FamilyTree data:', familyTree);
    if (familyTree.length > 0 && containerRef.current) {
      // Добавляем небольшую задержку для полной инициализации DOM
      setTimeout(() => {
        createChart(familyTree);
      }, 100);
    }
  }, [familyTree]);

  // Резервная функция для обработки клика через DOM
  const handleCardClickFallback = (cardElement: HTMLElement) => {
    const cardText = cardElement.textContent || '';
    const personData = familyTree.find(person => {
      const fullName = `${person.data["first name"]} ${person.data["last name"]}`;
      return cardText.includes(fullName) || cardText.includes(person.data["first name"]);
    });
    
    if (personData) {
      console.log('Fallback: Found person data:', personData);
      setSelectedPersonId(personData.id);
      setIsDrawerOpen(true);
    }
  };

  const createChart = (data: any[]) => {
    if (!containerRef.current) {
      console.log('Container ref is null');
      return;
    }

    console.log('Creating chart with data:', data);
    
    // Очищаем контейнер
    containerRef.current.innerHTML = '';

    // Добавляем ID к каждому элементу данных для правильной идентификации
    const dataWithIndex = data.map((person, index) => ({
      ...person,
      _originalIndex: index
    }));

    const f3Chart = f3.createChart(containerRef.current, dataWithIndex)
      .setTransitionTime(1000)
      .setCardXSpacing(200)
      .setCardYSpacing(250)
      .setSingleParentEmptyCard(true, { label: 'ҚОСУ' })
      .setShowSiblingsOfMain(true);

    // Устанавливаем ориентацию на основе пропса
    if (orientation === "vertical") {
      f3Chart.setOrientationVertical();
    } else {
      f3Chart.setOrientationHorizontal();
    }

    const f3Card = f3Chart.setCard(f3.CardHtml)
      .setCardDisplay([["first name", "last name"], ["birthday", "death_date"]])
      .setCardDim({width: 100, height: 100})
      .setMiniTree(true)
      .setStyle('imageCircle')
      .setOnHoverPathToMain()
      .setOnCardClick((d: any) => {
        // Обработчик клика по карточке - открываем drawer
        console.log('Card clicked via f3:', d);
        console.log('Type of d:', typeof d);
        console.log('Keys in d:', Object.keys(d || {}));
        
        // d может содержать вложенную структуру, попробуем разные варианты
        let personId = null;
        
        if (d && d.id) {
          personId = d.id;
        } else if (d && d.data && d.data.id) {
          personId = d.data.id;
        } else if (d && d.id !== undefined) {
          personId = String(d.id);
        } else if (d && typeof d === 'object') {
          // Ищем id в любом вложенном объекте
          const findId = (obj: any): any => {
            if (obj.id) return obj.id;
            for (const key in obj) {
              if (typeof obj[key] === 'object' && obj[key] !== null) {
                const found = findId(obj[key]);
                if (found) return found;
              }
            }
            return null;
          };
          personId = findId(d);
        }
        
        console.log('Extracted person ID:', personId);
        
        if (personId) {
          console.log('Setting selected person:', personId);
          setSelectedPersonId(String(personId));
          setIsDrawerOpen(true);
        } else {
          console.log('Could not extract person ID from:', d);
          // Попробуем резервный способ через DOM
          console.log('Fallback not implemented in this context');
        }
      });

    f3Chart.updateTree({ initial: true });

    // Дополнительный способ установки обработчика клика через DOM события
    setTimeout(() => {
      if (!containerRef.current) return;
      
      const cards = containerRef.current.querySelectorAll('.card');
      console.log('Found cards for click handlers:', cards.length);
      console.log('Original data for matching:', data);
      
      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.style.cursor = 'pointer';
        
        // Очищаем старые обработчики
        const newCard = cardElement.cloneNode(true) as HTMLElement;
        cardElement.parentNode?.replaceChild(newCard, cardElement);
        
        // Ищем соответствующие данные по тексту карточки
        const cardText = newCard.textContent || '';
        console.log('Card text:', cardText);
        
        // Ищем персону по имени в тексте карточки
        const personData = data.find(person => {
          const firstName = person.data["first name"];
          const lastName = person.data["last name"];
          const fullName = `${firstName} ${lastName}`;
          
          const hasFirstName = cardText.includes(firstName);
          const hasLastName = cardText.includes(lastName);
          const hasFullName = cardText.includes(fullName);
          
          console.log(`Checking ${fullName}: hasFirst=${hasFirstName}, hasLast=${hasLastName}, hasFull=${hasFullName}`);
          
          return hasFirstName && hasLastName;
        });
        
        if (personData) {
          console.log('Matched person data:', personData);
          newCard.setAttribute('data-person-id', personData.id);
          
          newCard.addEventListener('click', (e) => {
            console.log('Card clicked via DOM event:', personData);
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Setting selected person via DOM:', personData.id);
            setSelectedPersonId(personData.id);
            setIsDrawerOpen(true);
          });
        } else {
          console.log('No matching person data found for card:', cardText);
        }
      });
    }, 1000);
  };

  const handleCreateFirstPerson = () => {
    setSelectedPersonId(null); // Для создания первой персоны
    setIsDrawerOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Отбасы ағашы жүктелуде...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full fixed top-0 left-0">
      {/* Добавляем стили для линий */}
      <style dangerouslySetInnerHTML={{ __html: treeStyles }} />
      
      {/* Диаграмма */}
      {familyTree.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-center mt-20">
          <div className="text-muted-foreground mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium">Отбасы ағашы бос</h3>
            <p className="text-sm">Алғашқы тұлғаны қосу арқылы бастаңыз</p>
          </div>
          <Button onClick={handleCreateFirstPerson} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Алғашқы тұлғаны қосу
          </Button>
        </div>
      ) : (
        <div 
          ref={containerRef} 
          className="f3 f3-cont !bg-white !h-[100vh] !max-h-[100vh]"
          style={{ height: 'auto' }}
        />
      )}
    </div>
  );
} 