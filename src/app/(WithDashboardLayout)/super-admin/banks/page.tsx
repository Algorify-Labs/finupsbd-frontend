
import { BanksTable } from "@/components/super-admin/banks/banks-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function BanksPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bank & Financial Institutions</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Institution
        </Button>
      </div>

      <BanksTable />
    </div>
  )
}

