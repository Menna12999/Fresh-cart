import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import useMutationCart from '../../Hooks/useMutationCart';
import { cachPayment, onlinePayment } from '../Apis/payment';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({cartId}) {
   const[flag,setFlag] = React.useState(false)
  let {mutate,data} = useMutationCart(onlinePayment)
  let {mutate:mutateCach,data:dataCash} = useMutationCart(cachPayment)
    const [open, setOpen] = React.useState(false);
    function handleSubmit(shippingAddress){
      if(flag){
      mutate({cartId,shippingAddress})
      }
      else{
        mutateCach({cartId,shippingAddress})
        
       
        }
      }
      //check data response
        if(dataCash?.data?.status=='success'){
          toast('All is done',{
            toastId:'done'
          })
      }
    
    if(data?.data?.status=='success'){
      window.location.href=data?.data?.session?.url
    }
  let formik = useFormik({
      initialValues:{
          details:'',
          city:'',
          phone:''
      },
      onSubmit:handleSubmit
  })
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <Button variant='contained' color='success' sx={{m:'30px'}} 
        onClick={()=>{handleOpen();setFlag(true)}}>Pay Online</Button>
         <Button variant='contained' color='success' sx={{m:'30px'}} 
        onClick={handleOpen}>Pay Cash</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
           

<form class="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
  <div class="mb-5">
    <label for="details" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
    <input type="text" value={formik.values.details} onChange={formik.handleChange} id="details" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="email" />
  </div>
  <div class="mb-5">
    <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
    <input type="text" value={formik.values.city} onChange={formik.handleChange}  id="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"/>
  </div>
  <div class="mb-5">
    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
    <input type="tel" value={formik.values.phone} onChange={formik.handleChange} id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"/>
  </div>
  
  <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
</form>

          </Box>
        </Modal>
      </div>
    );
  }