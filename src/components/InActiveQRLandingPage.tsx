import React from "react";

interface Props {
  status: string;
}

const InActiveQRLandingPage: React.FC<Props> = ({ status }) => {
  return (
    <div className="text-black">
      <div className="w-full flex items-center justify-center p-4">
        <img src="/witomark-logo.png" alt="sentinel-logo" width={160} height={160} />
      </div>
      <div className="w-full bg-[#f3efc9] p-4 border-y-2 border-y-gray-300">
        {status === "Archived" ? (
          <div>
            <h1 className="text-xl font-bold mb-2">QR Archived</h1>
            <p className="text-md">
              The QR code you scanned has been archived by <br />
              the brand and is no longer usable
            </p>
          </div>
        ) : (
          <div>
            {status === "Expired" ? (
              <div>
                <h1 className="text-xl font-bold mb-2">QR Expired</h1>
                <p className="text-md">
                  The QR code you scanned is no longer valid and <br />
                  cannot be processed. QR codes may expire for <br />
                  security reasons or when the linked
                </p>
              </div>
            ) : (
              <div>
                <h1 className="text-xl font-bold mb-2">QR Invalid</h1>
                <p className="text-md">
                  The QR code you scanned is not a Witomark QR. Please scan a valid Witomark QR. <br />
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InActiveQRLandingPage;
