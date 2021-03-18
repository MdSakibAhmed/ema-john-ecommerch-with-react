import React from 'react';
import { useForm } from 'react-hook-form';



const Shipment = () => {
    const {register,handleSubmit,watch,errors} = useForm()
    const onSubmit = data => console.log(data);
    return (
          
    <form onSubmit={handleSubmit(onSubmit)}>
    {/* register your input into the hook by invoking the "register" function */}
      <input name="example" placeholder="Your name" defaultValue="Your name" ref={register} />
      <br/>
      
      {/* include validation with required or other standard HTML validation rules */}
      <input name="exampleRequired" placeholder="Your email" defaultValue="" ref={register({ required: true })} />
      <br/>
  
      {errors.exampleRequired && <span style={{color:"red"}}>This field is required</span>}
    
      <input name="exampleRequired" placeholder="Your phone number" defaultValue="" ref={register} />
      <br/>
      {/* errors will return when field validation fails  */}
    
      
      <input type="submit" />
    </form>
    )
}

export default Shipment;