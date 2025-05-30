import { MapPin, AlertCircle } from "lucide-react";

const SupplierCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-6 mt-4">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Know your supplier
      </h2>

      {/* Supplier Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-4">
          {/* Company Logo/Icon */}
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <div className="w-6 h-6 bg-blue-500 rounded opacity-70"></div>
          </div>

          {/* Company Details */}
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">
              Guangzhou Chong Ying Electronic Commerce Co., Ltd.
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Manufacturer, Trading Company, Distributor/Wholesaler • 1 yrs on
              Alibaba.com
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              Located in CN
            </div>
          </div>
        </div>
      </div>

      {/* Online Store Performance */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Online store performance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* On-time delivery rate */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              On-time delivery rate
            </h4>
            <div className="text-2xl font-bold text-gray-900">100.0%</div>
          </div>

          {/* Online revenue */}
          <div>
            <div className="flex items-center mb-2">
              <h4 className="text-sm font-medium text-gray-700">
                Online revenue
              </h4>
              <AlertCircle className="w-4 h-4 text-amber-500 ml-2" />
            </div>
            <div className="text-2xl font-bold text-gray-900">US$ 5,000+</div>
          </div>

          {/* Response Time */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Response Time
            </h4>
            <div className="text-2xl font-bold text-gray-900">≤1h</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 px-2 py-1 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors  truncate">
          More products
        </button>
        <button className="flex-1 px-2 py-1 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors truncate">
          Company profile
        </button>
      </div>
    </div>
  );
};

export default SupplierCard;
