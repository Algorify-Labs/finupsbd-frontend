import DetailsViewUserProfile from '@/components/user/profile/user-profile-dashboard'
import { userData } from '@/components/user/sample-data'
import { getSingleUsers } from '@/services/superAdmin/users'
import React from 'react'


interface PageProps {
  params: Promise<{ id: string }>;
}


const DetailsViewUserProfilePage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  console.log({ id })
  let userData;

  try {
    userData = await getSingleUsers(id)
  } catch (error) {
    console.error("Failed to fetch user data:", error)
    return (
      <div>Error loading user data</div>
    )
  }

  console.log(userData)

  return (
    <div>
      <DetailsViewUserProfile user={userData.data} />
    </div>
  )
}

export default DetailsViewUserProfilePage
