import "./SignUp.css"
import {useState} from "react"
import SignUpModal from "./SignUpModal"

const SignUp = ({signInToggle, setSignInToggle, signUpToggle, setSignUpToggle}) => {

  return(
    <div className='sign-up-container'>
      <button onClick={()=>setSignUpToggle(!signUpToggle)}className='sign-up' type="button">Sign Up</button>
      <SignUpModal {...{signInToggle}} {...{setSignInToggle}} signUpToggle={signUpToggle} setSignUpToggle={setSignUpToggle} />
    </div>
  )
}


export default SignUp
