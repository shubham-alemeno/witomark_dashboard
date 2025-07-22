'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const scanData = {
  genuine: 14563,
  tampered: 5,
}

export default function QRGeneratorPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>QR Fingerprint Generator</CardTitle>
          <CardDescription>
            Generate new QR fingerprints for your products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-3 px-4 bg-gray-100 rounded-md shadow-sm w-full md:w-fit">
            <div className="text-md font-semibold">
              Total fingerprints generated: {scanData.genuine}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>QR Fingerprints</CardTitle>
          <CardDescription>
            List of all generated QR fingerprints
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-muted-foreground">
            List view of all QR fingerprints
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
