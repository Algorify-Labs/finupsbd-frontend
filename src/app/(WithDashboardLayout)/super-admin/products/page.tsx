
import { ProductsFilter } from "@/components/super-admin/products/products-filter"
import { ProductsTable } from "@/components/super-admin/products/products-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Products Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <ProductsFilter />
      <ProductsTable />
    </div>
  )
}

