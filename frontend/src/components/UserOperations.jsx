import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaCircleArrowRight } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import Modal from 'react-modal' ;
import { useDispatch } from 'react-redux';

const UserOperations = () => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalamount,setmodalamount] = useState(0);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    let subtitle;

    const customStyles = {
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        },
    };

     const MoneyButtons = [
        { amount : 10 ,id : 1 },
        { amount : 100 ,id : 2 },
        { amount : 500 ,id : 3 },
        { amount : 1000 ,id : 4 },
     ]

     const dispatch = useDispatch();

     const showmamount = (e) => {
         e.preventDefault();
         const finalamount = e.target.textContent ;
         console.log('finalamount ==',Number(finalamount));
         console.log('modalamount ==',Number(modalamount));
         setmodalamount(Number(finalamount) + Number(modalamount));
     }  

     const onchangeamount = (e) => {
        const amountchanged = e.target.value;
        console.log('event amount chg=',amountchanged);
        setmodalamount(amountchanged);
     }

        // if modalinput = ' ' just add btn clicked amount 
        // modalinput = 100
        // modalinput = btn clicked amount + modalinput 

  return (
    <>
         <div className='mt-5 bg-slate-300 grid grid-cols-2 text-center p-4 '>   
           
         <div>

            <div className='m-4'>
                <button className='bg-blue-400 p-2 px-8  font-bold border-2 border-black'> 
                    <Link to = "/users" > Pay /Request Money  </Link> 
                </button>
            </div>

            <div className='m-4'>
                    <button className='bg-blue-400 p-2 px-8  font-bold border-2  border-black'> Received Requests </button>
            </div> 
         

        </div>
         
        <div>

                <div className='m-4'>
                    <button className=' font-bold bg-blue-400 p-2 px-8 border-2 border-black'> Sent Requests </button>
                </div>   

                <div>
                    <button className='bg-blue-400 p-2 px-8 font-bold border-2 border-black' onClick={openModal}>  Add Money </button>
                 </div>

        </div>

        <div className='m-4 flex'> 
                <button className='bg-blue-400 p-2 px-8  font-bold border-2 border-black'>
                <Link to = "/alltransaction" >  All Transactions  </Link>  
                </button>
        </div>
           
            {/*  Add Money Modal  */}

           <div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp ={false}
                contentLabel="Example Modal">
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                <div style = {{display:'flex' ,justifyContent:'space-between'}}>
                    <h2> Add Money </h2>
                    <button onClick={closeModal}>close</button>
                </div>
                <form style = {{display:'flex' ,flexDirection:'column' , justifyContent:'space-evenly'}}>
                    <div style = {{margin:'4% 2%'}}>
                         <input  type = "number" placeholder='Enter Amount ' 
                         style = {{padding:'2%'}}
                         value = {modalamount}
                         onChange={(e) => onchangeamount(e)}
                         />
                    </div>

                     <div style = {{margin:'12% 2%'}}>
                        <div style = {{display:'grid' ,gridTemplateColumns:'1fr 1fr' }} >
                                {MoneyButtons?.map((item) =>
                                    <div key = {item.id}>
                                         <button onClick={(e) => showmamount(e)}  style = {{padding:'2% 1%'}}> {item.amount}  </button>
                                    </div>
                                    )}
                        </div>
                     </div>

                </form>
            </Modal>
           </div>

    </div>
 </>
       
  )
}

export default UserOperations




