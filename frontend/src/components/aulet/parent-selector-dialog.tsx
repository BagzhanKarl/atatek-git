"use client";

import React, { useState } from "react";
import { useAulet, type PersonData } from '@/contexts/aulet-context';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Save, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

interface ParentSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentId: string;
  parentGender: 'M' | 'F';
}

export function ParentSelectorDialog({ 
  open, 
  onOpenChange, 
  parentId, 
  parentGender 
}: ParentSelectorDialogProps) {
  const { familyTree, addChild } = useAulet();
  
  const [childData, setChildData] = useState<PersonData>({
    first_name: '',
    last_name: '',
    gender: 'M',
    birthday: '',
    death_date: null,
    avatar: null,
  });

  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Получаем супругов выбранного родителя (должны быть противоположного пола)
  const selectedParent = familyTree.find(p => p.id === parentId);
  const possibleParents = familyTree.filter(person => 
    person.id !== parentId && 
    person.data.gender !== parentGender &&
    // Проверяем, является ли этот человек супругом выбранного родителя
    selectedParent?.rels.spouses.includes(person.id)
  );
  
  console.log('Selected parent:', selectedParent);
  console.log('Selected parent spouses:', selectedParent?.rels.spouses);
  console.log('Possible parents (spouses only):', possibleParents);

  const handleSave = async () => {
    if (!childData.first_name.trim() || !childData.last_name.trim()) {
      toast.error("Баланың аты-жөні міндетті");
      return;
    }

    try {
      setIsSubmitting(true);
      await addChild(parentId, selectedParentId, childData);
      
      // Сброс формы
      setChildData({
        first_name: '',
        last_name: '',
        gender: 'M',
        birthday: '',
        death_date: null,
        avatar: null,
      });
      setSelectedParentId(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding child:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setChildData({
      first_name: '',
      last_name: '',
      gender: 'M',
      birthday: '',
      death_date: null,
      avatar: null,
    });
    setSelectedParentId(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Бала қосу</DialogTitle>
          <DialogDescription>
            Жаңа бала туралы мәліметтерді енгізіңіз және екінші ата-ананы таңдаңыз
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Информация о ребенке */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Бала туралы мәліметтер</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="child_first_name">Аты *</Label>
                <Input
                  id="child_first_name"
                  value={childData.first_name}
                  onChange={(e) => setChildData(prev => ({ ...prev, first_name: e.target.value }))}
                  placeholder="Баланың атын енгізіңіз"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="child_last_name">Тегі *</Label>
                <Input
                  id="child_last_name"
                  value={childData.last_name}
                  onChange={(e) => setChildData(prev => ({ ...prev, last_name: e.target.value }))}
                  placeholder="Баланың тегін енгізіңіз"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="child_gender">Жынысы</Label>
                <select
                  id="child_gender"
                  value={childData.gender}
                  onChange={(e) => setChildData(prev => ({ ...prev, gender: e.target.value as 'M' | 'F' }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="M">Ер</option>
                  <option value="F">Әйел</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="child_birthday">Туған күні</Label>
                <Input
                  id="child_birthday"
                  type="date"
                  value={childData.birthday}
                  onChange={(e) => setChildData(prev => ({ ...prev, birthday: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Выбор второго родителя */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Екінші ата-ана (жұбайлар арасынан)</h3>
            
            {possibleParents.length > 0 ? (
              <div className="space-y-2">
                <Label htmlFor="parent-select">Екінші ата-ананы таңдаңыз</Label>
                <select
                  id="parent-select"
                  value={selectedParentId || ""}
                  onChange={(e) => setSelectedParentId(e.target.value || null)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Екінші ата-ана жоқ</option>
                  {possibleParents.map(person => (
                    <option key={person.id} value={person.id}>
                      {person.data["first name"]} {person.data["last name"]} ({person.data.gender === 'M' ? 'Ер' : 'Әйел'})
                    </option>
                  ))}
                </select>
                
                {selectedParentId && (
                  <div className="mt-2">
                    {(() => {
                      const selectedPerson = possibleParents.find(p => p.id === selectedParentId);
                      return selectedPerson ? (
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={selectedPerson.data.avatar || undefined} />
                            <AvatarFallback>
                              {selectedPerson.data["first name"].charAt(0)}{selectedPerson.data["last name"].charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {selectedPerson.data["first name"]} {selectedPerson.data["last name"]}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {selectedPerson.data.gender === 'M' ? 'Ер' : 'Әйел'} • {selectedPerson.data.birthday}
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>
            ) : (
                             <Card>
                 <CardContent className="pt-6">
                   <p className="text-sm text-muted-foreground text-center">
                     Жұбайлар жоқ. Алдымен жұбай қосыңыз.
                   </p>
                   <p className="text-xs text-muted-foreground text-center mt-2">
                     Немесе баланы бір ата-анасыз "Екінші ата-ана жоқ" таңдап құруға болады
                   </p>
                 </CardContent>
               </Card>
            )}
          </div>
        </div>

        <DialogFooter>
          <div className="flex gap-2">
            <Button 
              onClick={handleSave} 
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? "Қосылуда..." : "Баланы қосу"}
            </Button>
            <Button variant="outline" onClick={handleClose}>
              Болдырмау
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 