
import React from 'react';
import '../App.css';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
// import { content } from '../static';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import checkData from '../utils/utils';

const schema = yup.object().shape({
  email: yup.string()
    // .matches(/^demo@myunisoft.fr$/, "mauvais email test")
    .required("email is required"),
  password: yup.string()
    // .matches(/^myunisoft$/, "mauvais mot de passe")
    .required("password is required"),
})
type Inputs = {
  email: string,
  password: string,
};

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });
  const history = useHistory();
  const onSubmit = (data: any) => {
    console.log("submit", data)
    if (checkData(data))
      history.push("/results");
  };
  const [showPwd, setShowPwd] = React.useState<boolean>(false)

  // console.log(watch("email")) // debug
  // console.log(watch("password")) // debug
  return (
    <div className="App" >

      <form onSubmit={handleSubmit(onSubmit)} className="log-form container">
        <h1>Title : Login</h1>
        <div>
          <p>
            <label htmlFor="email" className="label">Adresse email</label>
            <input {...register("email")} className="inputForm" placeholder=""
            />
          </p>
          <p className="error">
            {errors.email ? <span>please enter a valid email</span> : <span></span>}
          </p>
        </div>

        <div>
          <p>
            <label htmlFor="password" className="label">Mot de passe</label>
            <input {...register("password", { required: true })} className="inputForm" type={showPwd ? "text" : "password"} placeholder="" />
            <span id="eyeIcon" className="fa fa-eye" onClick={() => { setShowPwd(!showPwd); console.log(`showPwd`, showPwd) }}>👁️</span>
            <span className="forgot" onClick={() => alert("email sent")}>Forgot Username?</span>
          </p>
          <p className="error">
            {errors.password && <span>This field is required</span>}
          </p>
        </div>


        <button type="submit" className="btn">
          Submit
          </button>
      </form>

    </div >
  );
}