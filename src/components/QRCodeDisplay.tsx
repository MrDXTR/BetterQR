import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex-1 bg-slate-700 rounded-xl flex flex-col justify-center space-y-6"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={url}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          id="qr-code"
          className="flex justify-center p-8"
        >
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
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="flex p-2 sm:p-0 justify-center sm:flex-row sm:space-x-5 sm:space-y-0 flex-col space-x-0 space-y-4 pb-6"
      >
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
      </motion.div>
    </motion.div>
  );
};

export default QRCodeDisplay;
