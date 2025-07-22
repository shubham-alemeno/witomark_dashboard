'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const printers = [
  { id: 1, name: 'Printer1', model: 'Konica Minolta ABC (zW)' },
  { id: 2, name: 'Printer2', model: 'Konica Minolta XYZ (HH)' },
]

export default function PrintersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Printers</h2>
        <Button size="sm">Add Printer</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {printers.map((printer) => (
          <Card key={printer.id}>
            <CardHeader>
              <CardTitle>{printer.name}</CardTitle>
              <CardDescription>{printer.model}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Status:
                  </span>
                  <span className="font-medium text-green-500">
                    Online
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    QRs Generated:
                  </span>
                  <span>1,250</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" size="sm">
                Details
              </Button>
              <Button size="sm">Configure</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
