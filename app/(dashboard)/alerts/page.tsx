'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react'

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'Tampered QR Detected',
    message: 'A tampered QR code was detected in Western Europe',
    timestamp: '2 hours ago',
    status: 'unread',
  },
  {
    id: 2,
    type: 'info',
    title: 'High Scan Volume',
    message: 'Unusual scan activity detected in Central America',
    timestamp: '4 hours ago',
    status: 'read',
  },
  {
    id: 3,
    type: 'error',
    title: 'Printer Offline',
    message: 'Printer2 (Konica Minolta XYZ) has gone offline',
    timestamp: '6 hours ago',
    status: 'unread',
  },
]

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'warning':
      return <AlertCircle className="h-5 w-5 text-yellow-500" />
    case 'error':
      return <XCircle className="h-5 w-5 text-red-500" />
    case 'info':
      return <CheckCircle className="h-5 w-5 text-blue-500" />
    default:
      return <AlertCircle className="h-5 w-5 text-gray-500" />
  }
}

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Alerts</h2>
        <Button size="sm" variant="outline">Mark All as Read</Button>
      </div>
      
      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className={`${alert.status === 'unread' ? 'border-l-4 border-l-blue-500' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getAlertIcon(alert.type)}
                  <CardTitle className="text-base">{alert.title}</CardTitle>
                </div>
                <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {alert.message}
              </CardDescription>
              <div className="flex justify-end mt-3">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
