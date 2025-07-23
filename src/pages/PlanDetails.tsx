import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PlanDetails = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Plan Details</h2>
        <Button size="sm">Upgrade Plan</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Current Plan</CardTitle>
              <span className="inline-flex items-center rounded-full border border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
                Enterprise
              </span>
            </div>
            <CardDescription>Your current subscription details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plan Type:</span>
              <span className="font-medium">Enterprise</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Cost:</span>
              <span className="font-medium">$299/month</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">QR Codes Included:</span>
              <span className="font-medium">Unlimited</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Billing:</span>
              <span className="font-medium">Aug 23, 2025</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
            <CardDescription>Current month usage overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">QR Codes Generated:</span>
              <span className="font-medium">14,568</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Scans This Month:</span>
              <span className="font-medium">45,231</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Printers:</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Storage Used:</span>
              <span className="font-medium">2.3 GB / Unlimited</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Recent billing transactions</CardDescription>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center">
          <div className="text-muted-foreground">
            Billing history will be displayed here
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanDetails;
