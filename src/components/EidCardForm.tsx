
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  name: string;
  phoneNumber: string;
  message: string;
  profileImage: string | null;
  qrImage: string | null;
}

interface EidCardFormProps {
  onFormUpdate: (data: FormData) => void;
}

const EidCardForm = ({ onFormUpdate }: EidCardFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNumber: "",
    message: "",
    profileImage: null,
    qrImage: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      onFormUpdate(newData);
      return newData;
    });
  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    imageType: "profileImage" | "qrImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG, JPEG or PNG image",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormData((prev) => {
          const newData = {
            ...prev,
            [imageType]: event.target?.result as string,
          };
          onFormUpdate(newData);
          return newData;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = (inputId: string) => {
    document.getElementById(inputId)?.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center mb-4">
          <div className="number-badge">1</div>
          <h2 className="text-xl font-bold">Upload Your Images</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="profileImage">Profile Picture</Label>
            <div
              className="upload-area mt-2"
              onClick={() => triggerFileInput("profileImageInput")}
            >
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover mx-auto rounded-md"
                />
              ) : (
                <>
                  <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Drag & drop your image here
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG or JPEG (max 5MB)
                  </p>
                </>
              )}
              <input
                type="file"
                id="profileImageInput"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => handleImageUpload(e, "profileImage")}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={() => triggerFileInput("profileImageInput")}
            >
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
          </div>
          
          <div>
            <Label htmlFor="qrImage">bKash QR Code</Label>
            <div
              className="upload-area mt-2"
              onClick={() => triggerFileInput("qrImageInput")}
            >
              {formData.qrImage ? (
                <img
                  src={formData.qrImage}
                  alt="QR Code Preview"
                  className="w-32 h-32 object-cover mx-auto rounded-md"
                />
              ) : (
                <>
                  <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Drag & drop your image here
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG or JPEG (max 5MB)
                  </p>
                </>
              )}
              <input
                type="file"
                id="qrImageInput"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => handleImageUpload(e, "qrImage")}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={() => triggerFileInput("qrImageInput")}
            >
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-4">
          <div className="number-badge">2</div>
          <h2 className="text-xl font-bold">Enter Your Details</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="phoneNumber">bKash Number</Label>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="+880 1X XXX XXX XX"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Add a personal message..."
              value={formData.message}
              onChange={handleInputChange}
              className="resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EidCardForm;
