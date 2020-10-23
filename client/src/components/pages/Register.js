import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/authContext/authContext'

const Register = ({history}) => {
    const {registerUser, userAuth, errors, setError, clearError} = useContext(AuthContext)
    
    useEffect(()=>{
        if(userAuth){
            history.push('/')
        }
    },[userAuth, history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
 
    const {name, email, password, password2 } = user

    
    const changeHandler=(e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        clearError()
    }

    const onSubmit =(e)=> {
        e.preventDefault();
        if(password !== password2){
            setError({msg: 'Passwords do not match'})
            

        } else {
            registerUser({name, email, password})
            clearError()
        }

    }


    return (
        <div className="register">
            <h1>Sign Up</h1>
            <form onSubmit={onSubmit}>
                <input type="text" name='name' value={name} onChange={changeHandler} placeholder='insert name'/>
                <input type="email" name='email' value={email} onChange={changeHandler} placeholder='insert email'/>
                <input type="password" name='password' value={password} onChange={changeHandler} placeholder='insert password'/>
                <input type="password" name='password2' value={password2} onChange={changeHandler} placeholder='confirm password'/>
                <input type="submit" value='register' className='btn'/>
            </form>
            <div className="question">
                {errors !== null && <button className='danger'>
                    {errors.msg ? errors.msg : errors.error[0].msg  }
                <span onClick={()=> clearError()}>X</span></button>}
                <p>Already SignUp?? {" "} <Link to='/login'>Sign In!</Link></p>
            </div>
            
        </div>
    )
}

export default Register
