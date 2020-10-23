import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/authContext/authContext'
const Login = ({history}) => {
    const {loginUser, userAuth, errors, clearError} = useContext(AuthContext)
    
    useEffect(()=>{
        if(userAuth){
            history.push('/')
            clearError()
        } else {
            clearError()
        }
    },[userAuth, history])
 

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const {email, password } = user

    
    const changeHandler=(e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        clearError()
    }

    const onSubmit =(e)=> {
        e.preventDefault();
        loginUser({email, password})
        clearError()
    }

    return (
        <div className="register">
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
               
                <input type="email" name='email' value={email} onChange={changeHandler} placeholder='insert email'/>
                <input type="password" name='password' value={password} onChange={changeHandler}  placeholder='insert password'/>
                <input type="submit" value='login' className='btn'/>
            </form>
            <div className="question">
            {errors !== null && <button className='danger'>
                    {errors.msg }
                <span onClick={()=> clearError()}>X</span></button>}
                <p>Not registered?? {" "} <Link to='/register'>Sign Up!</Link></p>
            </div>
            
        </div>
    )
}

export default Login
