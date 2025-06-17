"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, Download, Search, RefreshCw } from "lucide-react";
import { NavHeader } from "@/components/nav/NavHeader";
import { AuletProvider, useAulet } from '@/contexts/aulet-context';
import { AuletFamilyChart } from '@/components/aulet/aulet-family-chart';
import { AuletPersonDrawer } from '@/components/aulet/aulet-person-drawer';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function AuletContent() {
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical");
  const { isDrawerOpen, setIsDrawerOpen, fetchFamilyTree, familyTree } = useAulet();
  const contentRef = useRef<HTMLDivElement>(null);

  const orentChange = () => {
    setOrientation(orientation === "vertical" ? "horizontal" : "vertical");
    fetchFamilyTree();
  }

  const handleDownload = async () => {
    const element = contentRef.current;
    if (!element) return;

    const navHeader = document.getElementById("nav-header");
    const logo = document.getElementById("logo");

    // Скрыть header, показать логотип
    if (navHeader) navHeader.style.visibility = "hidden";
    if (logo) {
      logo.style.visibility = "visible";
      logo.style.position = "static";
      logo.style.left = "0";
    }

    // Подождать, чтобы DOM обновился
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("landscape", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("menin-auletim-tree.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      if (navHeader) navHeader.style.visibility = "visible";
      if (logo) {
        logo.style.visibility = "hidden";
        logo.style.position = "absolute";
        logo.style.left = "-9999px";
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Белый фон на весь экран - нижний слой */}
      <div className="fixed inset-0 bg-white -z-10"></div>
      
      <div className="w-[85vw] mx-auto relative">
        {/* Навигация и кнопки управления - верхний слой */}
        <div className="z-20 absolute top-0 w-[85vw]" id="nav-header">
          <NavHeader />
          <div className="flex items-center justify-between mt-4 pb-4">
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                {familyTree.length} адам
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-primary text-white"
                onClick={() =>
                  orentChange()
                }
                title="Бағдарды өзгерту"
              >
                {orientation === "vertical" ? <ArrowRight /> : <ArrowDown />}
              </Button>
   
              <Button
                variant="outline"
                size="icon"
                className="bg-primary text-white"
                onClick={fetchFamilyTree}
                title="Жаңарту"
              >
                <RefreshCw />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-primary text-white"
                onClick={handleDownload}
                title="PDF жүктеу"
              >
                <Download />
              </Button>
            </div>
          </div>
        </div>

        {/* Контент с деревом - средний слой */}
        <div
          ref={contentRef}
          className="relative pt-32 pb-10 z-10"
          style={{ minHeight: "100vh" }}
        >
          <img
            src="/logo.png"
            alt="logo"
            id="logo"
            className="w-[100px] absolute top-10 left-10"
            style={{ visibility: "hidden", position: "absolute", left: "-9999px" }}
          />
          <AuletFamilyChart orientation={orientation} />
        </div>

        {/* Drawer - самый верхний слой */}
        <AuletPersonDrawer />
      </div>
    </div>
  );
}

export default function MeninAuletimPage() {
  return (
    <AuletProvider>
      <AuletContent />
    </AuletProvider>
  );
}
