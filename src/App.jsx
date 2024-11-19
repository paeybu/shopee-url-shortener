// src/App.js
import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";

function App() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  // Function to convert the Shopee URL
  const convertShopeeURL = (url) => {
    const decodedUrl = decodeURIComponent(url);
    const regex = /https:\/\/shopee\.co\.th\/.*?(\d+)\.(\d+)/;
    const match = decodedUrl.match(regex);

    if (match && match.length === 3) {
      const productId = match[1];
      const shopId = match[2];
      return `https://shopee.co.th/product/${productId}/${shopId}`;
    } else {
      return "รูปแบบ URL ผิดพลาด";
    }
  };

  const handleConvert = () => {
    const result = convertShopeeURL(url);
    setShortenedUrl(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 md:px-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">
          ย่อ URL Shopee
        </h1>
        <p className="mb-4 text-sm text-gray-600">
          URL Shopee มักจะมีความยาวมากกกกก เพราะใช้ชื่อสินค้ามาเป็น URL ลอง copy
          แล้วมาใส่ในช่องแล้วกดแปลง URL ดูสิ!
        </p>

        <Input
          className="mb-4"
          placeholder="ใส่ Shopee URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <Button onClick={handleConvert} className="w-full mb-4">
          แปลง URL
        </Button>

        {shortenedUrl && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Shortened URL:</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="text-blue-500 underline cursor-pointer break-all"
                    onClick={() => navigator.clipboard.writeText(shortenedUrl)}
                  >
                    {shortenedUrl}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>กดเพื่อคัดลอก</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
