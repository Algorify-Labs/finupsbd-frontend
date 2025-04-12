import ApplicationStatus from "@/components/user/my-application/ApplicationStatus"
import DemoStatus from "@/components/user/my-application/DemoStatus"



const status = {
  PENDING : "PENDING",
  IN_PROGRESS : "IN_PROGRESS",
  APPROVED : "APPROVED", 
  REJECTED : "REJECTED"
}


const ApplicationStatusPage = () => {
  return (
    <div>
       <ApplicationStatus status="APPROVED"/>
    </div>
  )
}

export default ApplicationStatusPage