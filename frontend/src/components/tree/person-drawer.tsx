"use client";

import React, { useState, useEffect } from "react";
import { useTree } from '@/contexts/tree-context';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { X, Save, Plus, Edit3 } from 'lucide-react';

export function PersonDrawer() {
  const { 
    open, 
    setOpen, 
    selectedPerson, 
    isLoading, 
    updatePerson, 
    addChild 
  } = useTree();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    birth: null as number | null,
    death: null as number | null,
  });
  const [childName, setChildName] = useState('');
  const [isAddingChild, setIsAddingChild] = useState(false);

  // Обновляем форму при изменении выбранной персоны
  useEffect(() => {
    if (selectedPerson) {
      setFormData({
        name: selectedPerson.name || '',
        bio: selectedPerson.bio || '',
        birth: selectedPerson.birth,
        death: selectedPerson.death,
      });
    }
  }, [selectedPerson]);

  const handleSave = async () => {
    if (!selectedPerson) return;

    try {
      await updatePerson(selectedPerson.id.toString(), formData);
      setIsEditing(false);
      toast.success("Деректер сәтті жаңартылды");
    } catch (error) {
      console.error('Error updating person:', error);
      toast.error("Деректерді жаңарту кезінде қателік орын алды");
    }
  };

  const handleAddChild = async () => {
    if (!selectedPerson || !childName.trim()) return;

    try {
      await addChild(selectedPerson.id.toString(), childName.trim());
      setChildName('');
      setIsAddingChild(false);
      toast.success("Ұрпақ қосу туралы тикет құрылды");
    } catch (error) {
      console.error('Error adding child:', error);
      toast.error("Ұрпақ қосу кезінде қателік орын алды");
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setIsAddingChild(false);
    setChildName('');
    if (selectedPerson) {
      setFormData({
        name: selectedPerson.name || '',
        bio: selectedPerson.bio || '',
        birth: selectedPerson.birth,
        death: selectedPerson.death,
      });
    }
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  if (isLoading) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Жүктелуде...</DrawerTitle>
          </DrawerHeader>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                             <Avatar className="h-12 w-12">
                 <AvatarImage 
                   src={selectedPerson?.main_icon || selectedPerson?.mini_icon || undefined} 
                   alt={selectedPerson?.name || "Аватар"} 
                 />
                 <AvatarFallback>
                   {selectedPerson?.name?.charAt(0) || "?"}
                 </AvatarFallback>
               </Avatar>
              <div>
                <DrawerTitle className="text-xl">
                  {selectedPerson?.name || "Белгісіз тұлға"}
                </DrawerTitle>
                <DrawerDescription>
                  Тұлға туралы ақпарат
                </DrawerDescription>
              </div>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="px-4 pb-4 overflow-y-auto">
          <div className="space-y-6">
            {/* Основная информация */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Негізгі ақпарат</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  {isEditing ? "Болдырмау" : "Өзгерту"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Аты-жөні</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Аты-жөнін енгізіңіз"
                    />
                  ) : (
                    <p className="text-sm font-medium">
                      {selectedPerson?.name || "Белгіленбеген"}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birth">Туған жылы</Label>
                    {isEditing ? (
                      <Input
                        id="birth"
                        type="number"
                        value={formData.birth || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          birth: e.target.value ? parseInt(e.target.value) : null 
                        }))}
                        placeholder="Мысалы: 1950"
                      />
                    ) : (
                      <p className="text-sm">
                        {selectedPerson?.birth || "Белгіленбеген"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="death">Қайтыс болған жылы</Label>
                    {isEditing ? (
                      <Input
                        id="death"
                        type="number"
                        value={formData.death || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          death: e.target.value ? parseInt(e.target.value) : null 
                        }))}
                        placeholder="Мысалы: 2020"
                      />
                    ) : (
                      <p className="text-sm">
                        {selectedPerson?.death || "Тірі"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Өмірбаян</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Өмірбаянын енгізіңіз"
                      rows={4}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {selectedPerson?.bio || "Өмірбаян жазылмаған"}
                    </p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleSave} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Сақтау
                    </Button>
                    <Button variant="outline" onClick={resetForm}>
                      Болдырмау
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Separator />

            {/* Добавление детей */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Ұрпақ қосу
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isAddingChild ? (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="childName">Ұрпақтың аты-жөні</Label>
                      <Input
                        id="childName"
                        value={childName}
                        onChange={(e) => setChildName(e.target.value)}
                        placeholder="Ұрпақтың аты-жөнін енгізіңіз"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleAddChild}
                        disabled={!childName.trim()}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Қосу
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsAddingChild(false);
                          setChildName('');
                        }}
                      >
                        Болдырмау
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddingChild(true)}
                    className="w-full flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Ұрпақ қосу
                  </Button>
                )}
                <p className="text-xs text-muted-foreground">
                  * Ұрпақ қосу үшін тикет құрылады және әкімші мақұлдауы қажет
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Жабу</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
} 