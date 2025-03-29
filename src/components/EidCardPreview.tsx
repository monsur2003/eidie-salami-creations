
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Download, Copy } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface PreviewProps {
  name: string;
  phoneNumber: string;
  message: string;
  profileImage: string | null;
  qrImage: string | null;
}

const EidCardPreview = ({
  name,
  phoneNumber,
  message,
  profileImage,
  qrImage,
}: PreviewProps) => {
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);

  const hasRequiredFields = name && phoneNumber;

  const handleDownloadImage = async () => {
    if (!cardRef.current || !hasRequiredFields) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `eid-salami-card-${name.replace(/\s+/g, "-")}.png`;
      link.href = imgData;
      link.click();

      toast({
        title: "Success!",
        description: "Your Eid Salami Card has been downloaded as an image",
      });
    } catch (error) {
      console.error("Error downloading image:", error);
      toast({
        title: "Error",
        description: "Failed to download the card. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPDF = async () => {
    if (!cardRef.current || !hasRequiredFields) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const yPosition = (297 - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", 0, yPosition, imgWidth, imgHeight);
      pdf.save(`eid-salami-card-${name.replace(/\s+/g, "-")}.pdf`);

      toast({
        title: "Success!",
        description: "Your Eid Salami Card has been downloaded as a PDF",
      });
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast({
        title: "Error",
        description: "Failed to download the card. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = () => {
    if (!hasRequiredFields) {
      toast({
        title: "Missing information",
        description: "Please fill in your name and phone number first",
        variant: "destructive",
      });
      return;
    }

    // Generate a link with query parameters (in a real app, you might want to generate a unique ID)
    const baseUrl = window.location.origin;
    const queryParams = new URLSearchParams({
      name: name,
      phone: phoneNumber,
      msg: message,
    }).toString();
    const shareableLink = `${baseUrl}?${queryParams}`;

    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "Share this link with your friends and family",
        });
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Please try again or copy the URL manually",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <div className="number-badge">3</div>
        <h2 className="text-xl font-bold">Preview & Download</h2>
      </div>

      <div
        ref={cardRef}
        className="bg-white rounded-lg eid-card p-6 w-full max-w-md mx-auto"
      >
        <div className="text-center">
          <p className="text-amber-500 font-medium">Eid Mubarak 1445</p>
          <h1 className="text-4xl font-bold text-red-500 mt-2">সালামি QR</h1>
          <p className="text-sm text-gray-600 mt-1">
            সালামি QR - সালামি দেন, সহজায় স্ক্যান
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center">
            {profileImage ? (
              <div className="mx-auto w-32 h-32 overflow-hidden rounded-md">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="mx-auto w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                <p className="text-xs text-gray-400">Profile Picture</p>
              </div>
            )}
            <p className="text-sm font-medium mt-2">
              {name || "Your Name"}
            </p>
          </div>

          <div className="text-center">
            {qrImage ? (
              <div className="mx-auto w-32 h-32 overflow-hidden rounded-md bg-white p-1">
                <img
                  src={qrImage}
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="mx-auto w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                <p className="text-xs text-gray-400">bKash QR Code</p>
              </div>
            )}
            <p className="text-sm font-medium mt-2">
              {phoneNumber || "+880 1X XXX XXX XX"}
            </p>
          </div>
        </div>

        {message && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-center italic">"{message}"</p>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Created by Monsur Alam</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
        <Button
          onClick={handleDownloadImage}
          disabled={!hasRequiredFields}
          className="bg-amber-500 hover:bg-amber-600"
        >
          <Download className="mr-2 h-4 w-4" /> Download as Image
        </Button>
        <Button
          onClick={handleDownloadPDF}
          disabled={!hasRequiredFields}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Download className="mr-2 h-4 w-4" /> Download as PDF
        </Button>
        <Button
          onClick={handleCopyLink}
          disabled={!hasRequiredFields}
          variant="outline"
        >
          <Copy className="mr-2 h-4 w-4" /> Copy Link
        </Button>
      </div>

      {!hasRequiredFields && (
        <p className="text-sm text-center text-amber-600">
          Please enter your name and phone number to enable downloads
        </p>
      )}
    </div>
  );
};

export default EidCardPreview;
