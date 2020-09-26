import { Button } from '@material-ui/core'
import React from 'react'
import { signInWithGoogle } from '../../Firebase/firebase.utils'
import './Login.css'

const Login = () => {
    // const signIn = () => {
    // }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png" alt="" />
                <div className="login__text">
                    <h1>Sign in to Whatsapp</h1>
                </div>

                <Button onClick={signInWithGoogle}>
                    Sign in with google
                </Button>
            </div>

        </div>
    )
}

export default Login
