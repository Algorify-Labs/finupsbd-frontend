import { UsersTable } from "@/components/super-admin/users/user-table"
import { UsersFilter } from "@/components/super-admin/users/users-filter"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <UsersFilter />
      <UsersTable />
    </div>
  )
}

