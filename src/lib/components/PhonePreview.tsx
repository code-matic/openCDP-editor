import React from "react";

interface PhonePreviewProps {
  srcDoc?: string;
}

export const PhonePreview: React.FC<PhonePreviewProps> = ({ srcDoc }) => {
  return (
    <div className="flex justify-center items-start">
      <div className="w-full flex justify-center">
        <div className="relative !max-w-[340px] w-full !h-[640px] border-8 border-black rounded-[40px] overflow-hidden shadow-xl bg-black">
          {/* Top notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20 flex justify-center items-center">
            <div className="w-3 h-3 bg-gray-800 rounded-full mr-2"></div>
            <div className="w-10 h-2 bg-gray-700 rounded"></div>
          </div>

          {/* Volume buttons */}
          <div className="absolute -left-[3px] top-24 w-1 h-12 bg-gray-700 rounded-r"></div>
          <div className="absolute -left-[3px] top-40 w-1 h-8 bg-gray-700 rounded-r"></div>

          {/* Power button */}
          <div className="absolute -right-[3px] top-32 w-1 h-16 bg-gray-700 rounded-l"></div>

          {/* Screen */}
          <iframe
            srcDoc={srcDoc}
            title="Email Preview"
            className="max-w-[400px] w-full h-full bg-white"
            style={{ border: "none", paddingTop: "40px" }}
          />

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
