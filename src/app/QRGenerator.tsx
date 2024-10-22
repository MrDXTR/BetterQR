import { Card } from "@/components/ui/card";
import React from "react";

function QRGenerator() {
  return (
    <div className="relative z-30 mx-6 my-4 flex max-w-[1250px] w-full min-h-[750px] h-full">
      <Card className="flex-1 flex flex-col w-full h-auto mx-auto bg-[#ecf7ff]/80 backdrop-blur-md shadow-sm border-2 border-white/40 rounded-xl"></Card>
    </div>
  );
}

export default QRGenerator;
