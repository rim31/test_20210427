
import React from 'react';
import '../App.css';
import { useForm } from "react-hook-form";
// import { content } from '../static';

type Inputs = {
  email: string,
  password: string,
};

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit = (data: any) => console.log(data);
  const [showPwd, setShowPwd] = React.useState<boolean>(false)


  console.log(watch("email"))
  console.log(watch("password"))
  return (
    <div className="App" >
      <form onSubmit={handleSubmit(onSubmit)} className="log-form container">
        <h1>Title : Login</h1>
        <div>
          <p>
            <label htmlFor="email" className="label">Adresse email</label>
            <input {...register("email")} className="inputForm" placeholder="" />
          </p>
          {errors.email && <span>please enter a valid email</span>}
        </div>

        <div>
          <p>
            <label htmlFor="password" className="label">Mot de passe</label>
            <input {...register("password", { required: true })} className="inputForm" type={showPwd ? "text" : "password"} placeholder="" />
            <span id="eyeIcon" className="fa fa-eye" onClick={() => { setShowPwd(!showPwd); console.log(`showPwd`, showPwd) }}>👁️</span>
            <span className="forgot" onClick={() => alert("email sent")}>Forgot Username?</span>
          </p>
          {errors.password && <span>This field is required</span>}
        </div>


        <button type="submit" className="btn">
          Submit
          </button>
      </form>

    </div >
  );
}