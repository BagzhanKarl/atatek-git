"use client";

import React, { useState, useEffect } from "react";
import { useAulet, type PersonData, type PersonRels, type AuletPerson } from '@/contexts/aulet-context';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
import { ImageUpload } from "@/components/ui/image-upload";
import { toast } from 'sonner';
import { X, Save, Trash2, UserPlus, Heart, Baby } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ParentSelectorDialog } from './parent-selector-dialog';

// Добавляем состояния для диалогов
type DialogMode = 'none' | 'add-spouse' | 'add-child';

export function AuletPersonDrawer() {
  const { 
    isDrawerOpen, 
    setIsDrawerOpen, 
    selectedPerson,
    selectedPersonId,
    familyTree,
    createPerson,
    updatePerson,
    deletePerson,
    addSpouse,
    isLoading
  } = useAulet();

  const { user } = useAuth();

  const [formData, setFormData] = useState<PersonData>({
    first_name: '',
    last_name: '',
    gender: 'M',
    birthday: '',
    death_date: null,
    avatar: null,
  });

  const [formRels, setFormRels] = useState<PersonRels>({
    spouses: [],
    children: [],
    father: null,
    mother: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>('none');
  const [spouseFormData, setSpouseFormData] = useState<PersonData>({
    first_name: '',
    last_name: '',
    gender: 'F',
    birthday: '',
    death_date: null,
    avatar: null,
  });

  // Инициализация формы
  useEffect(() => {
    if (selectedPerson) {
      // Редактирование существующей персоны
      setFormData({
        first_name: selectedPerson.data["first name"] || '',
        last_name: selectedPerson.data["last name"] || '',
        gender: selectedPerson.data.gender || 'M',
        birthday: selectedPerson.data.birthday || '',
        death_date: selectedPerson.data.death_date || null,
        avatar: selectedPerson.data.avatar || null,
      });

      // Преобразуем связи из string[] в number[]
      setFormRels({
        spouses: selectedPerson.rels.spouses.map(id => parseInt(id)),
        children: selectedPerson.rels.children.map(id => parseInt(id)),
        father: null, // Эти данные нужно получать отдельно из API
        mother: null,
      });
    } else {
      // Создание новой персоны
      setFormData({
        first_name: '',
        last_name: '',
        gender: 'M',
        birthday: '',
        death_date: null,
        avatar: null,
      });
      setFormRels({
        spouses: [],
        children: [],
        father: null,
        mother: null,
      });
    }
  }, [selectedPerson]);

  const handleSave = async () => {
    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      toast.error("Аты-жөні міндетті");
      return;
    }

    if (!user?.id) {
      toast.error("Пайдаланушы анықталмады");
      return;
    }

    try {
      setIsSubmitting(true);

      const personData: AuletPerson = {
        user_id: user.id,
        data: formData,
        rels: formRels,
      };

      if (selectedPersonId) {
        // Обновление существующей персоны
        await updatePerson(selectedPersonId, personData);
      } else {
        // Создание новой персоны
        await createPerson(personData);
      }

      handleClose();
    } catch (error) {
      console.error('Error saving person:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPersonId) return;

    if (confirm("Бұл тұлғаны жойғыңыз келе ме? Бұл әрекетті болдырмау мүмкін емес.")) {
      try {
        setIsSubmitting(true);
        await deletePerson(selectedPersonId);
        handleClose();
      } catch (error) {
        console.error('Error deleting person:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleAddSpouse = async () => {
    if (!selectedPersonId || !spouseFormData.first_name.trim() || !spouseFormData.last_name.trim()) {
      toast.error("Жұбайдың аты-жөні міндетті");
      return;
    }

    try {
      setIsSubmitting(true);
      await addSpouse(selectedPersonId, spouseFormData);
      
      // Сброс формы
      setSpouseFormData({
        first_name: '',
        last_name: '',
        gender: selectedPerson?.data.gender === 'M' ? 'F' : 'M',
        birthday: '',
        death_date: null,
        avatar: null,
      });
      setDialogMode('none');
    } catch (error) {
      console.error('Error adding spouse:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setDialogMode('none');
    setIsDrawerOpen(false);
  };

  const isEditMode = !!selectedPersonId;

  if (isLoading) {
    return (
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
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
    <Drawer open={isDrawerOpen} onOpenChange={handleClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="text-left border-b-0 pb-6 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 ring-2 ring-muted">
                <AvatarImage 
                  src={selectedPerson?.data.avatar || undefined} 
                  alt={`${formData.first_name} ${formData.last_name}`} 
                  className="object-cover"
                />
                <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-primary/20 to-primary/10">
                  {formData.first_name.charAt(0)}{formData.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <DrawerTitle className="text-2xl font-bold">
                  {isEditMode ? "Тұлға мәліметтерін өзгерту" : "Жаңа тұлға қосу"}
                </DrawerTitle>
                <DrawerDescription className="text-base">
                  {isEditMode ? "Тұлға туралы ақпаратты өзгертіңіз" : "Жаңа тұлға мәліметтерін енгізіңіз"}
                </DrawerDescription>
              </div>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="px-6 pb-4 overflow-y-auto">
          <div className="space-y-8">
            {/* Основная информация */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-foreground">Негізгі мәліметтер</h3>
                <p className="text-sm text-muted-foreground">Тұлға туралы негізгі ақпарат</p>
              </div>
              
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name" className="text-sm font-medium">Аты *</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                      placeholder="Атын енгізіңіз"
                      className="border-0 bg-muted/50 focus:bg-background transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last_name" className="text-sm font-medium">Тегі *</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                      placeholder="Тегін енгізіңіз"
                      className="border-0 bg-muted/50 focus:bg-background transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-medium">Жынысы</Label>
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as 'M' | 'F' }))}
                      className="flex h-10 w-full rounded-md border-0 bg-muted/50 px-3 py-2 text-sm focus:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="M">Ер</option>
                      <option value="F">Әйел</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthday" className="text-sm font-medium">Туған күні</Label>
                    <Input
                      id="birthday"
                      type="date"
                      value={formData.birthday}
                      onChange={(e) => setFormData(prev => ({ ...prev, birthday: e.target.value }))}
                      className="border-0 bg-muted/50 focus:bg-background transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="death_date" className="text-sm font-medium">Қайтыс болған күні</Label>
                    <Input
                      id="death_date"
                      type="date"
                      value={formData.death_date || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, death_date: e.target.value || null }))}
                      className="border-0 bg-muted/50 focus:bg-background transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Аватар</Label>
                    <ImageUpload
                      value={formData.avatar}
                      onChange={(url) => setFormData(prev => ({ ...prev, avatar: url }))}
                      placeholder="Сурет жүктеу"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Связи */}
            {isEditMode && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">Отбасылық байланыстар</h3>
                  <p className="text-sm text-muted-foreground">Жұбайлар мен балаларды басқару</p>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Жұбайлар:</span>
                    <span className="font-medium">{formRels.spouses.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Балалар:</span>
                    <span className="font-medium">{formRels.children.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Жалпы тұлғалар:</span>
                    <span className="font-medium">{familyTree.length}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSpouseFormData({
                        first_name: '',
                        last_name: '',
                        gender: selectedPerson?.data.gender === 'M' ? 'F' : 'M',
                        birthday: '',
                        death_date: null,
                        avatar: null,
                      });
                      setDialogMode('add-spouse');
                    }}
                    className="flex items-center gap-3 h-auto py-4 border-0 bg-gradient-to-r from-pink-50 to-red-50 hover:from-pink-100 hover:to-red-100 text-red-700 hover:text-red-800"
                  >
                    <Heart className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Жұбай қосу</div>
                      <div className="text-xs opacity-70">Жаңа жұбай құру</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setDialogMode('add-child')}
                    className="flex items-center gap-3 h-auto py-4 border-0 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 hover:text-blue-800"
                  >
                    <Baby className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Бала қосу</div>
                      <div className="text-xs opacity-70">Жаңа бала құру</div>
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <DrawerFooter className="border-t-0 bg-muted/20 px-6">
          <div className="flex gap-3">
            <Button 
              onClick={handleSave} 
              disabled={isSubmitting}
              className="flex items-center gap-2 flex-1 h-11"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? "Сақталуда..." : "Сақтау"}
            </Button>
            
            {isEditMode && (
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                disabled={isSubmitting}
                className="flex items-center gap-2 h-11"
              >
                <Trash2 className="h-4 w-4" />
                Жою
              </Button>
            )}
            
            <DrawerClose asChild>
              <Button variant="ghost" className="h-11">Жабу</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>

      {/* Диалог добавления супруга */}
      <Dialog open={dialogMode === 'add-spouse'} onOpenChange={(open) => !open && setDialogMode('none')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Жұбай қосу</DialogTitle>
            <DialogDescription>
              {selectedPerson?.data["first name"]} үшін жаңа жұбай мәліметтерін енгізіңіз
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="spouse_first_name">Аты *</Label>
                <Input
                  id="spouse_first_name"
                  value={spouseFormData.first_name}
                  onChange={(e) => setSpouseFormData(prev => ({ ...prev, first_name: e.target.value }))}
                  placeholder="Жұбайдың атын енгізіңіз"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="spouse_last_name">Тегі *</Label>
                <Input
                  id="spouse_last_name"
                  value={spouseFormData.last_name}
                  onChange={(e) => setSpouseFormData(prev => ({ ...prev, last_name: e.target.value }))}
                  placeholder="Жұбайдың тегін енгізіңіз"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="spouse_gender">Жынысы</Label>
                <select
                  id="spouse_gender"
                  value={spouseFormData.gender}
                  onChange={(e) => setSpouseFormData(prev => ({ ...prev, gender: e.target.value as 'M' | 'F' }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="M">Ер</option>
                  <option value="F">Әйел</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="spouse_birthday">Туған күні</Label>
                <Input
                  id="spouse_birthday"
                  type="date"
                  value={spouseFormData.birthday}
                  onChange={(e) => setSpouseFormData(prev => ({ ...prev, birthday: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Аватар</Label>
              <ImageUpload
                value={spouseFormData.avatar}
                onChange={(url) => setSpouseFormData(prev => ({ ...prev, avatar: url }))}
                placeholder="Жұбайдың суретін жүктеу"
              />
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-2">
              <Button 
                onClick={handleAddSpouse} 
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                {isSubmitting ? "Қосылуда..." : "Жұбай қосу"}
              </Button>
              <Button variant="outline" onClick={() => setDialogMode('none')}>
                Болдырмау
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог добавления ребенка */}
      {selectedPerson && (
        <ParentSelectorDialog
          open={dialogMode === 'add-child'}
          onOpenChange={(open) => !open && setDialogMode('none')}
          parentId={selectedPersonId!}
          parentGender={selectedPerson.data.gender}
        />
      )}
    </Drawer>
  );
} 