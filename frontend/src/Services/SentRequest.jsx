import { Button } from 'flowbite-react'
import React from 'react'
import {  Tabs  } from "flowbite-react";
import { useRef, useState } from "react";
import { useSelector } from 'react-redux';
  
const SentRequest = () => {
  
  const { userData } = useSelector(state => state?.users);
  console.log('userData =',userData);
  
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className='font-bold text-2xl text-center'>
         <div> Sent Requests </div>
          <div className="flex flex-col gap-3">

            <Tabs aria-label="Default tabs" style="default" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>

              <Tabs.Item active title="Pending">
                   <span className="font-bold text-gray-800 dark:text-white">
                    {userData?.sentRequest?.map((item) => 
                        <div key = {item?._id} className='bg-lime-100 p-2 m-2'>
                            <div> amount = {item?.amount} </div>
                            <div> username = {item?.username} </div>
                            <div> status = {item?.status} </div>
                        </div>
                  )}
                  </span> 
              </Tabs.Item>
              <Tabs.Item title="Paid" >
              {userData?.transactions?.map((item) => 
                        <div key = {item?._id} className='bg-lime-200 p-2 m-2'>
                            <div> amount = {item?.amount} </div>
                            <div> username = {item?.username} </div>
                            <div> status = {item?.tag} </div>
                        </div>
                  )}
              </Tabs.Item>
              <Tabs.Item title="Rejected">
               Rejected 
              </Tabs.Item>

            </Tabs>
           </div>
      </div>
    </>
  )
}

export default SentRequest