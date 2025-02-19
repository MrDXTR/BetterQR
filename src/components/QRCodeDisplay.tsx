import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QRCodeDisplayProps {
  url: string;
  color: string;
  bgColor: string;
  logo: string | null;
  onDownload: (type: "png" | "svg") => void;
  isLoading?: boolean;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  url,
  color,
  bgColor,
  logo,
  onDownload,
  isLoading = false,
}) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex-1 bg-card-accent text-card-accent-foreground rounded-xl flex flex-col justify-center space-y-6"
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
          <div className="relative rounded-md overflow-hidden border-4 p-2 dark:border-black border-white">
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
        {error && <p className="text-destructive text-sm mb-2">{error}</p>}
        <Button
          variant="outline"
          onClick={() => onDownload("png")}
          disabled={isLoading}
          className="bg-card text-card-foreground border-2 border-card-accent/20 font-bold transition-all duration-300 hover:scale-105 hover:bg-card-accent hover:text-card-accent-foreground hover:border-card-accent-foreground"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          Download PNG
        </Button>
        <Button
          variant="outline"
          onClick={() => onDownload("svg")}
          className="bg-card text-card-foreground border-2 border-card-accent/20 font-bold transition-all duration-300 hover:scale-105 hover:bg-card-accent hover:text-card-accent-foreground hover:border-card-accent-foreground"
        >
          <Download className="w-4 h-4 mr-2" />
          Download SVG
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default QRCodeDisplay;
