import { Star, Mail, Headphones } from 'lucide-react';

const PlanDetails = () => {
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Plan Details Card */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {/* Plan Header */}
        <div className="flex items-center space-x-2 mb-6">
          <Star className="h-5 w-5 text-blue-500 fill-current" />
          <h2 className="text-lg font-semibold text-gray-900">
            Basic Starter Plan
          </h2>
        </div>

        {/* Plan Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Total QRs generated:</span>
            <span className="text-gray-900 font-medium">11</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Credits balance (1 credit = 1 QR generation):
            </span>
            <span className="text-gray-900 font-medium">989</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Credit price for your plan:</span>
            <span className="text-gray-900 font-medium">₹5</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Total QR generation limit for your plan:
            </span>
            <span className="text-gray-900 font-medium">16,000</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Monthly scan requests limit for your plan:
            </span>
            <span className="text-gray-900 font-medium">16,00,000</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Yearly subscription fee:</span>
            <span className="text-gray-900 font-medium">₹6,00,000</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Plan start date:</span>
            <span className="text-gray-900 font-medium">23/06/2025</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Plan expiry date:</span>
            <span className="text-gray-900 font-medium">22/06/2026</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Custom branding on QR webpages:
            </span>
            <span className="text-gray-900 font-medium">Enabled</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Custom logo for webpages:</span>
            <div className="flex items-center space-x-2">
              <span className="text-purple-600 font-semibold">Dr.Reddy's</span>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-gray-600">
            <Headphones className="h-4 w-4" />
            <span className="text-sm">
              Email us at support@witomark.com to buy more credits or upgrade
              plan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
