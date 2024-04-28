import { Button } from 'flowbite-react'
import React from 'react'
import {  Tabs  } from "flowbite-react";
import { useRef, useState } from "react";


const SentRequest = () => {
  
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className='font-bold text-4xl text-center'>

         <div> Sent Requests </div>
  
          <div className="flex flex-col gap-3">

            <Tabs aria-label="Default tabs" style="default" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>

              <Tabs.Item active title="Pending">
                This is <span className="font-medium text-gray-800 dark:text-white">
                Pending 
                  </span> 
              </Tabs.Item>
              <Tabs.Item title="Paid" >
                  Paid 
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