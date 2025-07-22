'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ProductCataloguePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Product Catalogue</h2>
        <Button size="sm">Add Product</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your product catalogue and QR code assignments
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="text-muted-foreground">
            Product catalogue functionality will be implemented here
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
