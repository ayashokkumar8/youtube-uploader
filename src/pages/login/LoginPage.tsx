import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { TextField } from "components/fields/TextField";
import { GreenButton } from "components/buttons/Buttons";
import fetch from "services/fetch";
import { useMutation } from "react-query";
import { AppContext, User } from "AppContext";
import styles from "./LoginPage.module.scss";
import Checkbox from "components/fields/Checkbox";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Url } from "routes";
import { history } from "App";
import { AxiosResponse } from "axios";
import styled from "styled-components";


type Login = {
  username: string;
  password: string;
  returnSecureToken: boolean;
};

const initialForm: Login = {
  username: "",
  password: "",
  returnSecureToken: false
};

//const [submitted, setSubmitted] = useState(false);

const validation = Yup.object().shape<Login>({
  username: Yup.string()
    //.email("Email non valida")
    .required("Inserire username"),
  password: Yup.string().required("Inserire password"),
  returnSecureToken: Yup.bool().oneOf([true], "Non hai accettato la Privacy Policy")
});

const LoginPage = () => {
  const { isAuthenticated, login } = useContext(AppContext);

  const form = useForm<Login>({
    defaultValues: initialForm,
    mode: "onBlur",
    validationSchema: validation
  });

const [reqLogin, { error, data, status }] = useMutation<
  AxiosResponse<User>,
  Login
>(values => fetch.post("https://identitytoolkit.googleapis.com/v1/accounts/   verifyPassword?key="+process.env.REACT_APP_FIREBASE_KEY, values));


const serverError = () => {
  const err = (error as any)?.response;
  if(err?.status === 404){
    return "Le credenziali inserite non sono valide";
  }
  else if(err?.status === 401){
    return "Le credenziali inserite non sono valide";
  }
  else if(err?.status === 400){
    return err?.data?.error
  }
}

  const onSubmit = async (values: Login) => {
    //localStorage.removeItem("Jwt");
    return await reqLogin(values)
      .then(res => login(res.data))
      .catch(err => {});
  };
  useEffect(() => {
    if (isAuthenticated()) history.push(Url.dashboard);
  }, [isAuthenticated]);

  const usernameError = form.errors["username"];
  const passwordError = form.errors["password"];
  const privacyError = form.errors["returnSecureToken"];

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
        <img
          alt=""
          className={styles.logo}
          src="/images/Mercitalia Logistics.svg"
        />
        <TextField
          label="Username"
          name="username"
          className={styles.input}
          error={!!usernameError}
          helperText={usernameError ? usernameError.message : undefined}
          inputRef={form.register}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          className={styles.input}
          error={!!passwordError}
          helperText={passwordError ? passwordError.message : undefined}
          inputRef={form.register}
        />
        <Checkbox
          name="returnSecureToken"
          id="returnSecureToken"
          className={styles.input}
          inputRef={form.register}
          label={
            <>
              <Typography className={styles.inline}>Accetto la </Typography>
              <div className={styles.errorField}>{privacyError?.message}</div>
            </>
          }
        />
        
        <Typography className={styles.errorField}>{serverError()}</Typography>
        <GreenButton className={styles.submitButton} disabled={status === "loading"} type="submit">Log In</GreenButton>      
      </form>
      {/* <pre>{JSON.stringify(form.errors, null, 2)}</pre> */}
    </div>
  );
};

export default LoginPage;
