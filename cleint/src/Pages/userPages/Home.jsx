import React from 'react'
import Navbar from '../../Components/Navbar'
import Stats from '../../Components/Stats'
import Header from '../../Components/Header'
import heroSection from '../../Components/heroSection'
import cover from '../../Assests/cover.jpeg'
import Testonomicals from '../../Components/Testonomicals'
export default function Home() {
  return (
    <div className='bg-gray-200'>
      <Navbar/>
      <div className='themeColor'>
      <heroSection/>
      <img src={cover} className=' bgCover'/>
      <Header className="mt-3"/>
      <Stats/>  
      <Testonomicals/>
      </div>
    </div>
  )
}
