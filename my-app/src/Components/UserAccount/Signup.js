import React, {useRef, useState} from 'react'
import {Alert, Card, Form,Container} from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link ,useHistory } from 'react-router-dom'
import {Button} from '@mui/material'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passworConfirmationdRef =useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()


 async function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== passworConfirmationdRef.current.value){
                return setError('Passwords do not match')
        }

        try{
            setError("")
            setLoading(true)
            await signup(emailRef.current.value , passwordRef.current.value)

            history.push("/messagesignup")

        }catch{
            setError('Failed to create an account')
        }
        setLoading(false)
        
    }
    return (
        <>
        <Container className = 'd-flex align-items-center justify-content-center' style={{minHeight:"100vh"}}  id="noNavBar" >
        <div className='w-100'> 
        <Container style={{minWidth:'350px',maxWidth:'400px'}}>
        <Card className='shadow rounded' style={{background:'#83c5be'}}>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/> 
                    </Form.Group>    
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required/> 
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type='password' ref={passworConfirmationdRef} required/> 
                    </Form.Group>
                    
                    {/* <Button disabled={loading} type='submit' className='w-100'>
                    </Button> */}
                    <Button disabled={loading} type='submit' className="w-100 mt-sm-2" variant='contained' color='primary'>
                    Sign up
                    </Button>

                </Form>               
            </Card.Body>
        </Card>
            <div className="w-100 text-center mt-2"> 
                Already have an account ? <Link to='/'>Log In</Link>    
            </div>
            </Container>
            </div>
</Container>    
    </>
    )
}
