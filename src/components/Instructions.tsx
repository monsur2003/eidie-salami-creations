
import { Card, CardContent } from "@/components/ui/card";

const Instructions = () => {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-center mb-6">
        Share Your QR Code This Eid
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <div className="number-badge">1</div>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Create</h3>
            <p className="text-sm text-gray-600 text-center">
              Upload your photo and bKash QR code to create your personalized Eid card
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <div className="number-badge">2</div>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Share</h3>
            <p className="text-sm text-gray-600 text-center">
              Download and share your Eid QR card on social media or with friends and family
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <div className="number-badge">3</div>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Receive</h3>
            <p className="text-sm text-gray-600 text-center">
              Friends and family can scan your QR code to send you Eid Salami via bKash
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-8">
        <a href="#create-card">
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium flex items-center">
            Create Your QR Code Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Instructions;
