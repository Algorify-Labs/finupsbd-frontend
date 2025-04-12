import { ApplicationsFilter } from "@/components/super-admin/applications/applications-filter";
import { ApplicationsTable } from "@/components/super-admin/applications/applications-table";


export default function ApplicationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Application Tracking</h1>

      <ApplicationsFilter />
      <ApplicationsTable />
    </div>
  )
}

