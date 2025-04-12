import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const applications = [
  {
    id: "APP-1234",
    name: "Ahmed Khan",
    email: "ahmed.khan@example.com",
    product: "Home Loan",
    status: "pending",
    date: "2023-10-15",
  },
  {
    id: "APP-1235",
    name: "Fatima Rahman",
    email: "fatima.r@example.com",
    product: "Credit Card",
    status: "approved",
    date: "2023-10-14",
  },
  {
    id: "APP-1236",
    name: "Mohammad Ali",
    email: "m.ali@example.com",
    product: "Car Loan",
    status: "rejected",
    date: "2023-10-14",
  },
  {
    id: "APP-1237",
    name: "Nusrat Jahan",
    email: "nusrat.j@example.com",
    product: "Personal Loan",
    status: "pending",
    date: "2023-10-13",
  },
  {
    id: "APP-1238",
    name: "Kamal Hossain",
    email: "kamal.h@example.com",
    product: "Health Insurance",
    status: "approved",
    date: "2023-10-12",
  },
]

export function RecentApplications() {
  return (
    <div className="space-y-8">
      {applications.map((application) => (
        <div key={application.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={application.name} />
            <AvatarFallback>{application.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{application.name}</p>
            <p className="text-sm text-muted-foreground">{application.product}</p>
          </div>
          <div className="ml-auto">
            <Badge
              variant={
                application.status === "approved"
                  ? "default"
                  : application.status === "pending"
                    ? "outline"
                    : "destructive"
              }
            >
              {application.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

