"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import ColorPicker from "@/components/ColorPicker";
import FileInput from "@/components/FileInput";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import FormField from "@/components/FormField";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import debounce from "lodash/debounce";

const LIMITS = {
  URL: 2000,
  EMAIL: 200,
  SUBJECT: 200,
  BODY: 2000,
};

function QRGenerator() {
  const [qrData, setQrData] = useState("https://manavchillar.vercel.app");
  const [inputValue, setInputValue] = useState(qrData);
  const [foregroundColor, setForegroundColor] = useState("#fff");
  const [backgroundColor, setBackgroundColor] = useState("#334155");
  const [qrLogo, setQrLogo] = useState<string | null>(null);
  const [uploadedLogoFile, setUploadedLogoFile] = useState<File | null>(null);
  const [selectedQrType, setSelectedQrType] = useState("mail");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const debouncedSetQrData = useCallback(
    debounce((value: string) => {
      setQrData(value);
    }, 500),
    []
  );

  const handleQrDownload = (format: "png" | "svg") => {
    const qrCodeElement = document.getElementById("qr-code");

    if (qrCodeElement) {
      if (format === "png") {
        toPng(qrCodeElement)
          .then((dataUrl) => {
            saveAs(dataUrl, "qr-code.png");
          })
          .catch((err) => {
            console.log("Error generating QR code", err);
          });
      } else if (format === "svg") {
        const svgElement = qrCodeElement.querySelector("svg");

        if (svgElement) {
          const saveData = new Blob([svgElement.outerHTML], {
            type: "image/svg+xml;charset=utf-8",
          });
          saveAs(saveData, "qr-code.svg");
        }
      }
    }
  };

  const generateEmailQrCode = async () => {
    setIsGenerating(true);
    try {
      const totalLength =
        recipientEmail.length + emailSubject.length + emailBody.length + 13; // Additional characters for mailto format

      if (totalLength > LIMITS.URL) {
        console.error("Email content too long for QR code");
        return;
      }

      const mailToLink = `mailto:${recipientEmail}?subject=${emailSubject}&body=${encodeURIComponent(
        emailBody
      )}`;
      setQrData(mailToLink);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-30 mx-6 my-4 flex max-w-[1250px] w-full min-h-[750px] h-full"
    >
      <Card className="flex-1 flex flex-col w-full h-auto mx-auto bg-card backdrop-blur-md shadow-sm border-2 border-primary/40/40 rounded-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-card-foreground text-2xl font-bold text-center">
              QR Code Generator
            </CardTitle>
            <ThemeToggle />
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="h-full flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <Tabs
                defaultValue="mail"
                className="space-y-6"
                onValueChange={(val) => {
                  setSelectedQrType(val);
                  setQrData("");
                }}
              >
                <TabsList className="w-full space-x-2 bg-card-accent text-card-accent-foreground rounded-xl">
                  <TabsTrigger
                    value="mail"
                    className="w-full data-[state=active]:bg-primary-foreground data-[state=active]:text-primary"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger
                    value="url"
                    className="w-full data-[state=active]:bg-primary-foreground data-[state=active]:text-primary"
                  >
                    <Link className="w-4 h-4 mr-2" />
                    URL
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="mail">
                  <div className="space-y-4">
                    <FormField
                      id="email"
                      label="Email"
                      type="email"
                      className="border-primary/40"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="Enter email"
                      maxLength={LIMITS.EMAIL}
                      required
                    />
                    <FormField
                      id="subject"
                      label="Subject"
                      type="text"
                      className="border-primary/40"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Enter subject"
                      maxLength={LIMITS.SUBJECT}
                    />
                    <FormField
                      id="message"
                      label="Message"
                      type="textarea"
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      placeholder="Enter message"
                      className="h-24 resize-none border-primary/40"
                      maxLength={LIMITS.BODY}
                    />

                    <Button
                      className="bg-card text-card-foreground border-2 border-card-accent/20 font-bold transition-all duration-300 hover:scale-105 hover:bg-card-accent hover:text-card-accent-foreground hover:border-card-accent-foreground"
                      onClick={generateEmailQrCode}
                      size="lg"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : null}
                      Generate Email QR Code
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="url">
                  <div className="space-y-6">
                    <FormField
                      id="url"
                      label="URL"
                      type="url"
                      className="border-primary/40"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        debouncedSetQrData(e.target.value);
                      }}
                      placeholder="https://example.com"
                      maxLength={LIMITS.URL}
                      required
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <div className="flex space-x-4">
                  <ColorPicker
                    label="Background Color"
                    color={backgroundColor}
                    onChange={setBackgroundColor}
                  />
                  <FileInput
                    label="Logo"
                    accept="image/*"
                    onChange={(file) => {
                      setUploadedLogoFile(file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setQrLogo(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <QRCodeDisplay
              url={qrData}
              color={foregroundColor}
              bgColor={backgroundColor}
              logo={qrLogo}
              onDownload={handleQrDownload}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default QRGenerator;
