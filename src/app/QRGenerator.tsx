import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

function QRGenerator() {
  return (
    <div className="relative z-30 mx-6 my-4 flex max-w-[1250px] w-full min-h-[750px] h-full">
      <Card className="flex-1 flex flex-col w-full h-auto mx-auto bg-[#ecf7ff]/80 backdrop-blur-md shadow-sm border-2 border-white/40 rounded-xl">
        <CardHeader>
          <CardTitle className="text-blue-600 text-2xl font-bold text-center">
            QR Code Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="h-full flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <Tabs defaultValue="text">
                <TabsList className="w-full space-x-2">
                  <TabsTrigger value="text" className="w-full">
                    Text
                  </TabsTrigger>
                  <TabsTrigger value="url" className="w-full">
                    URL
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="text"></TabsContent>
                <TabsContent value="url"></TabsContent>
              </Tabs>
            </div>
            <div className="relative flex-1 bg-[#037FFF] rounded-lg flex flex-col justify-center space-y-6"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default QRGenerator;
