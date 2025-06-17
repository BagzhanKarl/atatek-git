"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, Download, Search } from "lucide-react";
import { NavHeader } from "@/components/nav/NavHeader";
import DrawerTree from "@/components/tree/drawwer-tree";
import TreeComponent from "@/components/tree/tree";
import { TreeProvider, useTree } from "@/contexts/tree-context";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useHydration } from "@/hooks/useHydration";

const initialTreeData = {
  id: 1,
  name: "Алаш",
  hexColor: "#3498db",
  children: [],
};

function TreeContent() {
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical");
  const { open, setOpen } = useTree();
  const contentRef = useRef<HTMLDivElement>(null);
  const isHydrated = useHydration();

  const handleDownload = async () => {
    if (!isHydrated) return;
    
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
      pdf.save("tree-view.pdf");
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
    <div className="w-[85vw] mx-auto">
      <div className="z-10 absolute top-0 w-[85vw]" id="nav-header">
        <NavHeader />
        <div className="flex items-center justify-end mt-4 gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-primary text-white"
            onClick={() =>
              setOrientation(orientation === "vertical" ? "horizontal" : "vertical")
            }
          >
            {orientation === "vertical" ? <ArrowRight /> : <ArrowDown />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-primary text-white"
            onClick={() => {
              // вставь свою логику поиска тут
              console.log("Поиск нажат");
            }}
          >
            <Search />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-primary text-white"
            onClick={handleDownload}
          >
            <Download />
          </Button>
        </div>
      </div>

      <div
        ref={contentRef}
        className="bg-white relative pt-32 pb-10"
        style={{ minHeight: "600px" }}
      >
        <img
          src="/logo.png"
          alt="logo"
          id="logo"
          className="w-[100px] absolute top-10 left-10"
          style={{ visibility: "hidden", position: "absolute", left: "-9999px" }}
        />
        <TreeComponent orientation={orientation} initialData={initialTreeData} />
      </div>

      <DrawerTree open={open} setOpen={setOpen} />
    </div>
  );
}

export default function Home() {
  return (
    <TreeProvider>
      <TreeContent />
    </TreeProvider>
  );
}
