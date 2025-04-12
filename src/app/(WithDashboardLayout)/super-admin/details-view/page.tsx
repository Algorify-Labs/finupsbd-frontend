import { loanApplicationData } from '@/components/super-admin/dashboard/lib/sample-data'
import DetailsViewFrom from '@/components/super-admin/dashboard/loan-application-confirmation'
import React from 'react'

const DetailsViewPage = () => {
    return (
        <div>
            <DetailsViewFrom loanApplication={loanApplicationData} />
        </div>
    )
}

export default DetailsViewPage