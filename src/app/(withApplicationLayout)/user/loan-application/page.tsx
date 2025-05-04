

import MultiStepForm from "@/components/loan-application/forms/MultiStepForm"
import ApplicationFormVercel from "@/components/loan-application/FromVercel"


const ApplicationPage = () => {


  
  return (
    <div className="container mx-auto">
      {/* <ApplicationFormVercel/> */}
      <MultiStepForm/>
    </div>
  )
}

export default ApplicationPage