import "./SignIn.css"
import {useState} from "react"
import LoginModal from "./LoginModal"

const SignIn = ({signInToggle, setSignInToggle, signUpToggle, setSignUpToggle}) => {

  return(
    <div className='sign-in-container'>
      <button onClick={()=>setSignInToggle(!signInToggle)}className='sign-in' type="button">Sign In</button>
      <LoginModal {...{signUpToggle}} {...{setSignUpToggle}}  visible={signInToggle} setVisible={setSignInToggle} />
    </div>
  )
}


export default SignIn
