import React, {useRef, useState} from 'react'
import {Alert, Button, Card, Form,Container} from 'react-bootstrap'
import { Link ,useHistory } from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'


export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passworConfirmationdRef =useRef()
    const emailConfirmationRef = useRef()
    const { currentUser , updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== passworConfirmationdRef.current.value){
                return setError('Passwords do not match')
        }

        if(emailRef.current.value !== emailConfirmationRef.current.value){
            return setError('Something wrong with you email address...')
    }

        const promises =[]
        setLoading(true)
        setError("")

        if((emailRef.current.value === emailConfirmationRef.current.value) !==currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }

        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        console.log(promises);
        
        Promise.all(promises).then(()=> {
            history.push('/')
        }).catch(()=>{
            setError('Failed to update account')
        }).finally(()=>{
            setLoading(false)
        })
    
    }
    return (
        <>
                <Container className = 'd-flex align-items-center justify-content-center' style={{minHeight:"100vh"}}  id="noNavBar" >
        <div className='w-100'> 
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/> 
                    </Form.Group>    
                    <Form.Group id="email-confirm">
                        <Form.Label>Re-Enter Email</Form.Label>
                        <Form.Control type="email" ref={emailConfirmationRef} required defaultValue={currentUser.email}/> 
                    </Form.Group>   
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} placeholder="Leave blank to keep the same"/> 
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type='password' ref={passworConfirmationdRef} placeholder="Leave blank to keep the same"/> 
                    </Form.Group>
                    
                    <Button disabled={loading} type='submit' className='w-100'>
                        Update
                    </Button>

                </Form>               
            </Card.Body>
        </Card>
            <div className="w-100 text-center mt-2"> 
                <Link to='/'>Cancel</Link>    
            </div>
            </div>
</Container>  
            
    </>
    )
}
