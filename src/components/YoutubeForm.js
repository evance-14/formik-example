import React from 'react'
import{useFormik} from 'formik'
import * as Yup from 'yup'

const initialValues = {
  name : '',
  email :'',
  channel : ''
}

const onSubmit = values => {
  console.log('Form data',values)
}

//form validation
const validate = values => {
  //values.name values.email values.channel
  //errors.name errors.email errors.channel
  //errors.name = 'This field is required'
  let errors ={}
     if(!values.name){
      errors.name = 'Required'
     }
     if(!values.email){
      errors.email = 'Required'
     }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = 'Invalid email format'
     }
     if(!values.channel){
      errors.channel = 'Required'
     }
  return errors
}

const validationSchema = Yup.object({
  name:Yup.string().required('Requred!'),
  email:Yup.string().required('Required!').email('Invalid email format'),
  channel:Yup.string().required('Required!')
})
function YoutubeForm() {
    //declare our formik object and pass initial values
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
        //validate
    })

     //console.log('Form errors',formik.errors)
     //console.log('Form data',formik.values)
     console.log('Visited fields',formik.touched)
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <div className='form-control'>
       <label htmlFor='name'>Name</label>
       <input 
       type='text'
       id='name'
       name='name' 
       onChange={formik.handleChange}
       onBlur ={formik.handleBlur} 
       value={formik.values.name}
       />
      {/*we want to display error messages if exists with use of conditional rendering*/}
      {formik.touched.name && formik.errors.name ? (
      <div className='error'>{formik.errors.name}</div> ) :null}
      </div>

       <div className='form-control'>
       <label htmlFor='email'>E-mail</label>
       <input 
       type='email' 
       id='email' 
       name='email' 
       onChange={formik.handleChange} 
       onBlur ={formik.handleBlur} 
       value={formik.values.email} 
       />
       {formik.touched.email &&formik.errors.email ? (
       <div className='error'>{formik.errors.email}</div> ) :null}
       </div>

       <div className='form-control'>
       <label htmlFor='channel'>Channel</label>
       <input 
       type='text' 
       id='channel' 
       name='channel'  
       onChange={formik.handleChange} 
       onBlur ={formik.handleBlur} 
       value={formik.values.channel}
       />
       {formik.touched.channel &&formik.errors.channel ?( 
       <div className='error'>{formik.errors.channel}</div>) :null}
       </div>

       <button type='submit'>Submit</button>

      </form>
    </div>
  )
}

export default YoutubeForm;
