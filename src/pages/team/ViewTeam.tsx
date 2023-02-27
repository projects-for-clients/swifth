import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'
import Header from '../../components/dashboard/Header'

const ViewTeam = () => {
    const location = useLocation()

    console.log({location})
    const {id, name, role} = location && location?.state 
  return (
    <>
      <Header title="Team" />

      <main className="text-[1.6rem] grid gap-10">

        <BiArrowBack/>
        </main>
        </>
  )
}

export default ViewTeam