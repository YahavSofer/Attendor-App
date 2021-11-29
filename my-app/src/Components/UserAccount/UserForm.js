import React, {useRef, useState} from 'react'
import {Card, Form,Container, Image} from 'react-bootstrap'
import {Button} from '@mui/material'
import {db,storage} from '../../firebaseConfig'
import { setDoc,doc} from "firebase/firestore"
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {  useAuth } from '../../context/AuthContext'
import no_Img from '../../images/no-image-available.jpeg'
import CloseIcon from '@mui/icons-material/Close'

export default function UserForm() {


    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const birthdayRef = useRef()
    const [gender,setGender] = useState("Other")
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [imageUrl, setImageURL] = useState("")
    const [tempImgUrl, setTempImgUrl] =useState(no_Img)
    const {currentUser} = useAuth()
    const [dateValue, setValue] = useState(Date(Date.now()))
    const [closeIconShow, setCloseIconShow] = useState(false)
    const fileRef = useRef()
    
    // storage.ref('/images/web_img_using/no_picture_available.png').getDownloadURL().then(value => { setTempImgUrl(value)})
    // console.log(tempImgUrl)



const handleChangeDate = (newValue) => {
          setValue(newValue);
        };
        
function handleChangePicture(e) {
        setImage(e.target.files[0]);
        setTempImgUrl(URL.createObjectURL(e.target.files[0]))
        setCloseIconShow(true)
          }




function handleGenderChange(e){
    setGender(e.target.id)
    // console.log(e.target.id)
}  

function OnClickCloseIcon(){
    setCloseIconShow(false)
    setTempImgUrl(no_Img)
    fileRef.current.value = ''
}
    async function handleSubmit(e){
        e.preventDefault()

        try{
            setLoading(true)

            if(image !== null){
                        const ref = storage.ref(`/images/profile_pictures/${currentUser.uid}_Profile`);
                        const uploadTask = ref.put(image);
                        uploadTask.on("state_changed", console.log, console.error, () => {
                        ref
                            .getDownloadURL()
                            .then((imageUrl) => {
                                setImage(null);
                                setImageURL(imageUrl);
                            });
                        });
                }




            await setDoc(doc(db, "users",currentUser.uid),{
                first: firstNameRef.current.value,
                last: lastNameRef.current.value,
                birthday: dateValue,
                gender: gender, 
                profileImage: imageUrl


              });


        }catch(e){
            console.error("Error adding document: ", e);
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
                <h2 className="text-center mb-4">Create Profile</h2>
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="firstName" >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" ref={firstNameRef} required/> 
                    </Form.Group>
                    <Form.Group id="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" ref={lastNameRef} required/> 
                    </Form.Group>

                    <Form.Group id="gender" >
                        <Form.Label>Gender</Form.Label>
                        
                        <fieldset value={gender} onChange={(event) => handleGenderChange(event)}>
                                <Form.Check
                                    inline
                                    label="Male"
                                    name="genderGroup"
                                    type="radio"
                                    id="male"
                                />
                                <Form.Check
                                    inline  
                                    label="Female"
                                    name="genderGroup"
                                    type="radio"
                                    id="Female"
                                />
                                <Form.Check
                                    defaultChecked
                                    inline
                                    label="Other"
                                    name="genderGroup"
                                    type="radio"
                                    id="Other"
                                />         
                        </fieldset>               
                        </Form.Group>      
                <Form.Group id="birthday">
                <Form.Label>Birthday</Form.Label>
                <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        
                        required
                        inputFormat="dd/MM/yyyy"
                        value={dateValue}
                        onChange={handleChangeDate}
                        ref={birthdayRef}
                        renderInput={(params) => <TextField {...params} style={{background:'white',borderRadius:'5px',paddingTop:'5px'}} />}
                                            />
                </LocalizationProvider>
                </div>
                </Form.Group>

                <Form.Group  id="profilePicture" className="mb-3 ">
                    <Form.Label>Upload profile pricture</Form.Label>
                    <Form.Control ref={fileRef} type="file" onChange={handleChangePicture} />
                    <Container style={{  display: 'inline-block',position: 'relative'}}>
                        {closeIconShow ? <CloseIcon  style={{ cursor:'pointer', position: 'absolute',right: '70px',top: '10px',lineHeight :'0'}} onClick={OnClickCloseIcon}/> : null}
                        <Image src={tempImgUrl} alt="" fluid className="w-50 h-50 mt-3 mx-auto d-block" rounded />
                    </Container>

                </Form.Group>

                    <Button disabled={loading} type='submit' className="w-100 mt-sm-2" variant='contained' color='primary'>
                        Send Data
                    </Button>

                </Form>               
            </Card.Body>
        </Card>

            </Container>
            </div>
</Container>  
    </>
    )
}
