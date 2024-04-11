import React from 'react'

const AllTransactions = () => {

    const data = [{
        username: 'Amandeep',
        firstname : 'amandeep@123',
        date :'10Mar,2024 10.50 PM',
        payment : '600'
    },{
         username: 'ranveer',
        firstname : 'ranveer@singh',
        date :'22Mar,2024 1.50 AM',
        payment : '1000'
    },{
        username: 'sukhman',
        firstname : 'sukhman@kaur',
        date :'12Mar,2024 12.50 AM',
        payment : '1600'
    }]


  return (
    <div style = {{display:'flex' , flexDirection:'column',margin:'2% 10%'}}>
         <h1> Transactions </h1>

         <div>
            
            {data?.map((i) => 
                <div key = {i.date}>

                    <div style = {{display:'grid',gridTemplateColumns:'2fr 1fr' ,justifyContent:'space-between',backgroundColor:'lightgrey',padding:'1%'}}>

                        <div>
                            <h2> {i.username} </h2>
                            <span> {i.firstname} </span>
                            <div> {i.date} </div>
                        </div>

                        <div>
                            <h2> Rs. {i.payment} </h2>
                        </div>

                    </div>
                </div>
            )}

         </div>
    </div>
  )
}

export default AllTransactions