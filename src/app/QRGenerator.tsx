"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Mail } from "lucide-react";
import React, { useState } from "react";

function QRGenerator() {
  const [value, setValue] = useState("text");
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("#222");
  const [bgColor, setBgColor] = useState("#fff");
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="relative z-30 mx-6 my-4 flex max-w-[1250px] w-full min-h-[750px] h-full">
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
                onValueChange={(value) => setValue(value)}
              >
                <TabsList className="w-full space-x-2 bg-slate-700 rounded-lg text-white">
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
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Type email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="url">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="url">URL</Label>
                      <Input
                        type="url"
                        id="url"
                        placeholder="Type URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="relative flex-1 bg-slate-700 rounded-lg flex flex-col justify-center space-y-6"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default QRGenerator;
