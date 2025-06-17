"use client";

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  placeholder?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, placeholder = "Аватар жүктеу", className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Создаем превью
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Загружаем файл
    try {
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onChange(result.url);
        toast.success('Сурет сәтті жүктелді');
      } else {
        throw new Error(result.error || 'Жүктеу қатесі');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Сурет жүктеу қатесі');
      setPreview(value || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 ring-2 ring-muted cursor-pointer" onClick={handleClick}>
          <AvatarImage src={preview || undefined} alt="Preview" />
          <AvatarFallback className="bg-muted/50">
            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Upload className="h-6 w-6 text-muted-foreground" />
            )}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClick}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {isUploading ? 'Жүктелуде...' : placeholder}
            </Button>

            {preview && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                disabled={isUploading}
                className="flex items-center gap-2 text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
                Жою
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            JPG, PNG немесе GIF. Максимум 5MB.
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
} 