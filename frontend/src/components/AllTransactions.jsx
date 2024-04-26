import React, { useEffect } from 'react'
import  { useDispatch, useSelector } from 'react-redux';
import { AllTransaction } from '../Slices/userSlice';

const AllTransactions = () => {

    const { usertoken , userData } = useSelector(state => state?.users);
    console.log('usertoken =',usertoken);

    console.log('userDataall =',userData);

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

    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(AllTransaction({usertoken}))
    },[])



  return (
    <div style = {{display:'flex' , flexDirection:'column',margin:'2% 10%'}}>
         <h1> Transactions </h1>

         <div>
            
            {userData?.transactions?.map((i) => 
                <div key = {i?.amount}>

                    <div style = {{display:'grid',gridTemplateColumns:'2fr 1fr' ,justifyContent:'space-between',backgroundColor:'lightgrey',padding:'1%'}}>

                        <div>
                            <h2 className='font-bold'> {i?.username} </h2>
                            <span> {i?.fullname} </span>
                            <div> {i?.tag} </div>
                        </div>

                        <div>
                            <h2 className='font-bold'> Rs. {i?.amount} </h2>
                        </div>

                    </div>
                </div>
            )}

         </div>
    </div>
  )
}

export default AllTransactions