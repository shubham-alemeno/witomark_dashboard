import { Button } from "./ui/button";

interface Props {
  status: string;
  productImage?: string;
  productName?: string;
  productDetails?: string;
}

const ActiveQRLandingPage: React.FC<Props> = (props) => {
  const { status, productDetails, productImage, productName } = props;
  return (
    <div className="bg-gray-100 w-full text-black">
      <div className="flex flex-col w-full">
        <div className="w-full flex items-center justify-center p-2">
          <img src="/witomark-logo.png" alt="sentinel-logo" width={120} height={120} />
        </div>

        {/* Left side - Image */}
        <div className="w-full flex flex-col">
          {productName && (
            <div
              className={`text-black bg-white p-4 px-3 border-t-2 border-t-gray-300 ${
                !productImage && "border-b-2 border-b-gray-300 text-left"
              }`}>
              <h1 className="text-md font-bold mb-1 line-clamp-1">{productName}</h1>
              {productDetails && <p className="line-clamp-3 text-xs">{productDetails}</p>}
            </div>
          )}
          {productName ? (
            productImage ? (
              <div>
                <img
                  src={productImage}
                  alt="hero-image"
                  className="object-cover w-full md:h-screen h-[205px]"
                  width={300}
                  height={300}
                />
              </div>
            ) : null
          ) : (
            <div>
              <img
                src={"/witomark-image.jpg"}
                alt="hero-image"
                className="object-cover w-full h-auto md:h-screen max-h-[200px]"
                width={300}
                height={300}
              />
            </div>
          )}
        </div>
        {status === "Compromised" && (
          <div className="bg-[#ad494b] text-white w-full p-3 py-2">
            <p className="text-xs text-left">
              <b>Warning!</b> This QR was compromised, be extra cautious. The product could be fake even if verification
              shows it as genuine
            </p>
          </div>
        )}
        {/* Right side - Content */}
        <div className="w-full flex flex-col">
          <div className={`flex gap-4 mt-4 px-3`}>
            <img src="/placeholder-fingerprint.png" alt="QR" width={50} height={40} />

            <p className="text-[#3D3D3D] text-left text-xs">
              Scan the QR Fingerprint and verify whether the product is genuine or not
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              className="mt-3 w-45 h-9 flex justify-center items-center gap-2 text-xs bg-[#02bc5f] 
                        text-white rounded-full hover:bg-green-600 transition-colors">
              <img src="/camera.png" alt="camera" width="15" height="15" />
              Scan QR Fingerprint
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveQRLandingPage;
