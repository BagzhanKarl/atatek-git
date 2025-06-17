import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'Файл не найден' }, { status: 400 });
    }

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Только изображения разрешены' }, { status: 400 });
    }

    // Проверяем размер файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Файл слишком большой (максимум 5MB)' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Создаем уникальное имя файла
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}_${originalName}`;

    // Создаем папку uploads если её нет
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Папка уже существует
    }

    // Сохраняем файл
    const filePath = path.join(uploadsDir, fileName);
    await writeFile(filePath, buffer);

    // Возвращаем URL для использования в приложении
    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      fileName: fileName 
    });

  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
} 