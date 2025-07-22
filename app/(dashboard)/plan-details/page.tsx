'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function PlanDetailsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Plan Details</h2>
        <Button size="sm">Upgrade Plan</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              Your current subscription details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan:</span>
                <span className="font-medium">Enterprise</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly QR Limit:</span>
                <span className="font-medium">Unlimited</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Users:</span>
                <span className="font-medium">25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Billing:</span>
                <span className="font-medium">Jan 15, 2025</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
            <CardDescription>
              Current month usage overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">QRs Generated:</span>
                <span className="font-medium">14,563</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Scans Processed:</span>
                <span className="font-medium">14,568</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Users:</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Storage Used:</span>
                <span className="font-medium">2.4 GB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
