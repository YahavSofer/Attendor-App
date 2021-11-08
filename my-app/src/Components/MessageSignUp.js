import React from 'react'
import {Card,Container} from 'react-bootstrap'

export default function MessageSignUp() {
    return (
        <>
        <Container style={{minWidth:'350px',maxWidth:'400px'}}>
        <Card className='shadow rounded' style={{minHeight:'400px',background:'#83c5be'}}>
            <Card.Body>
                <h2 className="text-center mb-4">Email Sent</h2>
                <Card className="text-center mb-4" style={{justifyContent:'center', display: 'flex',alignItems:'center',background:'#e5e5e5',minHeight:'250px'}}>
                    <p style={{color:'#0081A7',fontSize:'18px'}}>verification email sent to your email address, Please check your email.
                    </p>
                </Card>
            </Card.Body>
        </Card>
            </Container>
    </>
    )
}
