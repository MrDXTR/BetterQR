"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import ColorPicker from "@/components/ColorPicker";
import FileInput from "@/components/FileInput";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import FormField from "@/components/FormField";
import { motion } from "framer-motion";

function QRGenerator() {
  const [qrData, setQrData] = useState("");
  const [foregroundColor, setForegroundColor] = useState("#fff");
  const [backgroundColor, setBackgroundColor] = useState("#334155");
  const [qrLogo, setQrLogo] = useState<string | null>(null);
  const [uploadedLogoFile, setUploadedLogoFile] = useState<File | null>(null);
  const [selectedQrType, setSelectedQrType] = useState("mail");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

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

  const generateEmailQrCode = () => {
    const mailToLink = `mailto:${recipientEmail}?subject=${emailSubject}&body=${encodeURIComponent(
      emailBody
    )}`;

    setQrData(mailToLink);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-30 mx-6 my-4 flex max-w-[1250px] w-full min-h-[750px] h-full"
    >
      <Card className="flex-1 flex flex-col w-full h-auto mx-auto bg-[#ecf7ff]/80 backdrop-blur-md shadow-sm border-2 border-white/40 rounded-xl">
        <CardHeader>
          <CardTitle className="text-slate-700 text-2xl font-bold text-center">
            QR Code Generator
          </CardTitle>
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
                <TabsList className="w-full space-x-2 bg-slate-700 rounded-xl text-white">
                  <TabsTrigger value="mail" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="url" className="w-full">
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
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                    <FormField
                      id="subject"
                      label="Subject"
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Enter subject"
                    />
                    <FormField
                      id="message"
                      label="Message"
                      type="textarea"
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      placeholder="Enter message"
                      className="h-24 resize-none"
                    />

                    <Button
                      className=" bg-slate-700 text-white font-bold"
                      onClick={generateEmailQrCode}
                      size="lg"
                    >
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
                      value={qrData}
                      onChange={(e) => setQrData(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <div className="flex space-x-4">
                  <ColorPicker
                    label="QR Code Color"
                    color={foregroundColor}
                    onChange={setForegroundColor}
                  />
                  <ColorPicker
                    label="Background Color"
                    color={backgroundColor}
                    onChange={setBackgroundColor}
                  />
                </div>

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
