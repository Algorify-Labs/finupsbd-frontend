"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAllUsers } from "@/services/superAdmin/users"
import { userInfo } from "@/services/UserData"
import LoaderCommon from "@/components/loading/LoaderCommon"
import { formatDate } from "../dashboard/lib/utils"



export function UsersTable() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const res = await getAllUsers();
        const currentUserData = await userInfo();
        console.log(res)
        setUsers(res?.data?.data);
        setCurrentUser(currentUserData.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Ensure loading stops only after the fetch completes
      }
    };

    fetchAllUsers();
  }, []); // ✅ Only runs once when the component mounts

  if (loading) return <div><LoaderCommon /></div>




  console.log(users, currentUser)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead>Credit Score</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user?.profile?.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={"outline"} >{user?.userId}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.role === "SUPER_ADMIN" ? "default" : "outline"}>{user.role}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.isActive === true ? "default" : "secondary"}>{user.isActive ? "Active" : "Inactive"}</Badge>
              </TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-16 rounded-full ${user.creditScore >= 750
                      ? "bg-green-500"
                      : user.creditScore >= 700
                        ? "bg-yellow-500"
                        : "bg-red-500"
                      }`}
                  >
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(user.creditScore / 850) * 100}%` }}
                    />
                  </div>
                  <span>{user.creditScore}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Link href={`/super-admin/details-view-user-profile/${user.id}`}>
                        view details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

