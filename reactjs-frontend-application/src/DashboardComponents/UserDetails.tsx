import React, { useEffect, useState } from 'react'
import { Card } from '../components/ui/card'
// import profilEpic from "../../images/profilepic.png";
import { MdOutlineClose } from "react-icons/md";


interface UserDetailProps {
  onClickDrawer: any
  details: any
}

const UserDetails = ({ onClickDrawer, details }: UserDetailProps) => {
  return (
    <div className='max-h-full overflow-y-auto'>
      <div className="p-8">
        <div className="flex flex-wrap justify-between items-center">
          <h3 className="text-xl font-bold leading-[21.82px] text-left text-primary">
            User Details
          </h3>
        <MdOutlineClose className='text-2xl text-primary cursor-pointer'             onClick={onClickDrawer}
        />
        </div>
        <div className="flex justify-between items-center mt-8">
          <div>
            <p className="text-secondary text-xs">Email: </p>
            <p className="text-secondary font-semibold mt-3 text-sm">
              {details?.email}
            </p>
          </div>
          <div>
            <p className="text-secondary text-xs">Name:</p>
            <p className="text-secondary font-semibold mt-3 ml-1 text-sm">
              {details.username}
            </p>
          </div>
          <div>
            <p className="text-secondary text-xs">Role:</p>
            <p className="text-secondary font-semibold mt-3 text-sm">
              {details?.roles[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails