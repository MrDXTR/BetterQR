import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, LayoutGrid } from "lucide-react";

interface QRCodeDisplayProps {
  url: string;
  color: string;
  bgColor: string;
  logo: string | null;
  onDownload: (type: "png" | "svg") => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  url,
  color,
  bgColor,
  logo,
  onDownload,
}) => {
  return (
    <div className="relative flex-1 bg-slate-700 rounded-xl flex flex-col justify-center space-y-6">
      <span>
        <LayoutGrid className="w-8 h-8 text-white absolute top-4 right-4" />
      </span>

      <div id="qr-code" className="flex justify-center p-8">
        <div className="relative rounded-xl overflow-hidden">
          <QRCodeSVG
            value={url}
            size={256}
            fgColor={color}
            bgColor={bgColor}
            imageSettings={
              logo
                ? { src: logo, height: 50, width: 50, excavate: true }
                : undefined
            }
          />
          {logo && (
            <img
              src={logo}
              alt="logo"
              className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-md border-none"
            />
          )}
        </div>
      </div>
      <div className="flex p-2 sm:p-0 justify-center sm:flex-row sm:space-x-5 sm:space-y-0 flex-col space-x-0 space-y-4 pb-6">
        <Button
          variant="outline"
          onClick={() => onDownload("png")}
          className="bg-slate-700 text-white font-bold"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PNG
        </Button>
        <Button
          variant="outline"
          onClick={() => onDownload("svg")}
          className="bg-slate-700 text-white font-bold"
        >
          <Download className="w-4 h-4 mr-2" />
          Download SVG
        </Button>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
