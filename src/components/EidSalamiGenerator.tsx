
import { useState, useEffect } from "react";
import EidCardForm from "./EidCardForm";
import EidCardPreview from "./EidCardPreview";
import Instructions from "./Instructions";

interface FormData {
  name: string;
  phoneNumber: string;
  message: string;
  profileImage: string | null;
  qrImage: string | null;
}

const EidSalamiGenerator = () => {
  const [cardData, setCardData] = useState<FormData>({
    name: "",
    phoneNumber: "",
    message: "",
    profileImage: null,
    qrImage: null,
  });

  // Check URL params for shared card data
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const phone = params.get("phone");
    const msg = params.get("msg");

    if (name || phone || msg) {
      setCardData((prev) => ({
        ...prev,
        name: name || "",
        phoneNumber: phone || "",
        message: msg || "",
      }));
    }
  }, []);

  const handleFormUpdate = (data: FormData) => {
    setCardData(data);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-500">সালামি QR</h1>
        <p className="text-xl mt-2">
          সালামি QR - সালামি দেন, সহজায় স্ক্যান
        </p>
      </div>

      <Instructions />

      <div id="create-card" className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <EidCardForm onFormUpdate={handleFormUpdate} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <EidCardPreview
            name={cardData.name}
            phoneNumber={cardData.phoneNumber}
            message={cardData.message}
            profileImage={cardData.profileImage}
            qrImage={cardData.qrImage}
          />
        </div>
      </div>

      <div className="text-center mt-12 text-sm text-gray-600">
        <p>© 2023 Eid QR Creator. All rights reserved by Afnan</p>
        <p className="mt-1">
          Made with ❤️ for Eid-ul-Fitr
        </p>
      </div>
    </div>
  );
};

export default EidSalamiGenerator;
