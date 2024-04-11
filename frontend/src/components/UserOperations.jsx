import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaCircleArrowRight } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import Modal from 'react-modal' ;

const UserOperations = () => {

    const [modalIsOpen, setIsOpen] = useState(false);

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

  return (
    <div>
         <div style = {{padding:'2%' , display:'grid', gridTemplateColumns:'1fr 1fr 1fr' , backgroundColor:'lightsalmon' , margin:'2%'}}>   
           
            <div>
                <button style = {{padding:'1%'}}>
                    <span> <FaCircleArrowRight /> </span>
                    <Link to = "/users" > Pay Money  </Link> 
                </button>
            </div>

            <div> 
                <button  style = {{padding:'1%'}}> 
                <span> <MdPayments /> </span>
                <Link to = "/alltransaction" >  All Transactions  </Link>  
                </button>
            </div>

           
            <button onClick={openModal}> <MdPayments /> Add Money </button>
           <div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp ={false}
                contentLabel="Example Modal">
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
                </form>
            </Modal>
    </div>

    </div>
 </div>
       
  )
}

export default UserOperations




