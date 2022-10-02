import { Auth } from "aws-amplify";
import React, { useState } from "react";

export const Login: React.FC = () => {

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const signin = () => {
    const res = Auth.signIn(email, pass)
    //   console.log(res)
  }
  return (
    <div>
      <p>
        サインインする
      </p>
      <p>email</p>
      <input value={email} onChange={(e) => { setEmail(e.target.value as string) }} />
      <p>password</p>
      <input type={"password"} value={pass} onChange={(e) => { setPass(e.target.value as string) }} />
      <br />
      <button onClick={signin}>Sign In</button>
    </div>
  )
}