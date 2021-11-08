import React, {useRef, useState} from 'react'
import {Card, Form,Container} from 'react-bootstrap'
import {Button} from '@mui/material'
import {db} from '../firebaseConfig'
import { collection, addDoc } from "firebase/firestore"
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider';


export default function UserForm() {
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const birthdayRef = useRef()
    const genderRef = useRef()
    const [loading, setLoading] = useState(false)


const [value, setValue] = React.useState(Date.now());
const handleChange = (newValue) => {
          setValue(newValue);
        };

    async function handleSubmit(e){
        e.preventDefault()

        try{

            setLoading(true)
            const docRef = await addDoc(collection(db, "users"), {
                first: firstNameRef.current.value,
                last: "Lovelace",
                born: 1815
              });
              console.log("Document written with ID: ", docRef.id);


        }catch(e){
            console.error("Error adding document: ", e);
        }
        setLoading(false)
        
    }

    return (
        <>
        <Container style={{minWidth:'350px',maxWidth:'400px'}}>
        <Card className='shadow rounded' style={{background:'#83c5be'}}>
            <Card.Body>
                <h2 className="text-center mb-4">Create Profile</h2>
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" ref={firstNameRef} required/> 
                    </Form.Group>
                    <Form.Group id="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" ref={lastNameRef} required/> 
                    </Form.Group>

                    <Form.Group id="gender" >
                        <Form.Label>Gender</Form.Label>
                        {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3" >
                        <Form.Check
                            
                            inline
                            label="Male"
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                        />
                        <Form.Check
                            inline
                            label="Female"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                        />
                        <Form.Check
                            defaultChecked
                            inline
                            label="Other"
                            name="group1"
                            type={type}
                            id={`inline-${type}-3`}
                        />
                        </div>
                    ))}                 
                        </Form.Group>      
                <Form.Group id="birthday">
                <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <DesktopDatePicker
                        required
                        label="Date desktop"
                        inputFormat="dd/MM/yyyy"
                        value={value}
                        onChange={handleChange}
                        ref={birthdayRef}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                </Form.Group>



                        <Button disabled={loading} type='submit' className="w-100 mt-sm-2" variant='contained' color='primary'>
                        Send Data
                    </Button>

                </Form>               
            </Card.Body>
        </Card>

            </Container>
    </>
    )
}
