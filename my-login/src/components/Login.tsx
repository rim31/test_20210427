
import React from 'react';
import '../App.css';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import checkData from '../utils/utils';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

/**
 * schema for error message if the inputs are wrong in login
 */
const schema = yup.object().shape({
  email: yup.string().required("email is required"),
  password: yup.string().required("password is required"),
})

type Inputs = {
  email: string,
  password: string,
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });
  const history = useHistory();
  const [showPwd, setShowPwd] = React.useState<boolean>(false)
  const [ShowError, setShowError] = React.useState<boolean>(true)

  /**
   * onSubmit function()
   * check data email and password are corrects with checkData() and display error or redirect then
   * @param data 
   */
  const onSubmit = (data: any) => {
    if (checkData(data) === true) {
      history.push("/home/users");
    } else {
      setShowError(false);
    }
  };
  return (
    <div className="Login" >

      <form onSubmit={handleSubmit(onSubmit)} className="log-form container">
        <h1>Connectez vous <br /> à MyUnisoft</h1>
        <div>
          <div>
            <label htmlFor="email" className="label">Adresse email</label>
            <input {...register("email")} className="inputForm" placeholder=""
            />
            {errors.email ? <p className="error">please enter a valid email</p> : <p className="error"></p>}
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="password" className="label">Mot de passe</label>
            <input {...register("password", { required: true })} className="inputForm" type={showPwd ? "text" : "password"} placeholder="" />
            <span id="eyeIcon" className="fa fa-eye" onClick={() => setShowPwd(!showPwd)}>{!showPwd ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</span>
            <span className="forgot" onClick={() => alert("email sent")}>Forgot Username?</span>
            {errors.password ? <p className="error">This field is required</p> : <p className="error"></p>}
          </div>
        </div>

        <button type="submit" className="btn">
          Se connecter
          </button>
        {!ShowError ? <p className="error">Bad credentials</p> : <p className="error"></p>}

      </form>

    </div >
  );
}