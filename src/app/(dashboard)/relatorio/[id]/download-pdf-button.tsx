"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DownloadPdfButton() {
  return (
    <Button
      onClick={() => window.print()}
      variant="outline"
      className="gap-2 font-semibold border-[#FF4D30] text-[#FF4D30] hover:bg-[#FF4D30] hover:text-white"
    >
      <Download className="h-4 w-4" />
      Baixar PDF
    </Button>
  );
}
