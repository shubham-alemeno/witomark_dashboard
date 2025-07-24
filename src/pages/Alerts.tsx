import { Circle } from 'lucide-react';

// Mock alerts data matching the design
const alertsData = [
  {
    id: 1,
    type: 'QRs Generated',
    message:
      '599 QRs were generated from your account. Remaining credit balance is 488.',
    timestamp: 'June 21, 2025, 1:11 p.m.',
    icon: 'yellow',
  },
  {
    id: 2,
    type: 'Daily Report',
    message: '293 Genuine scans recorded and 21 Tampered scans detected',
    timestamp: 'June 21, 2025, 1:11 p.m.',
    icon: 'yellow',
  },
  {
    id: 3,
    type: 'Daily Report',
    message: '162 Genuine scans recorded and 0 Tampered scans detected',
    timestamp: 'June 21, 2025, 1:11 p.m.',
    icon: 'gray',
  },
  {
    id: 4,
    type: 'Daily Report',
    message: '293 Genuine scans recorded and 21 Tampered scans detected',
    timestamp: 'June 21, 2025, 1:11 p.m.',
    icon: 'gray',
  },
  {
    id: 5,
    type: 'Daily Report',
    message: '162 Genuine scans recorded and 0 Tampered scans detected',
    timestamp: 'June 21, 2025, 1:11 p.m.',
    icon: 'gray',
  },
  {
    id: 6,
    type: 'Daily Report',
    message: '162 Genuine scans recorded and 0 Tampered scans detected',
    timestamp: 'June 21, 2025, 1:11 p.m.',
    icon: 'gray',
  },
  {
    id: 7,
    type: 'Credits added',
    message: '1000 credits have been added to your account',
    timestamp: 'June 21, 2025, 1:11 p.m.',
    icon: 'gray',
  },
  {
    id: 8,
    type: 'Daily Report',
    message: '162 Genuine scans recorded and 0 Tampered scans detected',
    timestamp: 'June 21, 2025, 1:11 p.m.',
    icon: 'gray',
  },
];

const Alerts = () => {
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Alerts List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="divide-y divide-gray-100">
          {alertsData.map((alert) => (
            <div
              key={alert.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                {/* Alert Icon */}
                <div className="flex-shrink-0 mt-1">
                  <Circle
                    className={`h-3 w-3 ${
                      alert.icon === 'yellow'
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-400 fill-current'
                    }`}
                  />
                </div>

                {/* Alert Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{alert.type} •</span>{' '}
                        {alert.message}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <span className="text-sm text-gray-500">
                        {alert.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
