import React, {useRef, useState} from 'react' 
import {Card, Form,Container, Image} from 'react-bootstrap' // components with style
import {Button} from '@mui/material' // material-ui == react bootstrap 
import {auth, db,storage} from '../firebaseConfig' 
import { setDoc,doc} from "firebase/firestore"
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {  useAuth } from '../context/AuthContext'


export default function UserForm() {
    

    const EventNameRef = useRef()
    const EventLocationRef = useRef()
    const EventDateRef = useRef()
    const DiscriptionRef = useRef()
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [imageUrl, setImageURL] = useState("")
    const [tempImgUrl, setTempImgUrl] =useState("")
    const {currentUser} = useAuth()
    const [dateValue, setValue] = useState(Date.now())

    // storage.ref('/images/web_img_using/no_picture_available.png').getDownloadURL().then(value => { setTempImgUrl(value)})
    // console.log(tempImgUrl)


const handleChangeDate = (newValue) => {
          setValue(newValue);
        };
        
function handleChangePicture(e) {
        setImage(e.target.files[0]);
        setTempImgUrl(URL.createObjectURL(e.target.files[0]))
          }


    async function handleSubmit(e){
        e.preventDefault()

        try{
            setLoading(true)

            if(image !== null){
                        const ref = storage.ref(`/images/event_pictures/${currentUser.uid}_event`);
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




            await setDoc(doc(db, "Events",currentUser.uid),{
                name: EventNameRef.current.value,
                location: EventLocationRef.current.value,
                eventDate: {dateValue},
               eventImage: imageUrl,
               discription: DiscriptionRef.current.value


              });


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
                <h2 className="text-center mb-4">Create Event</h2>
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="Event Name" >
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control type="text" ref={EventNameRef} required/> 
                    </Form.Group>
                    <Form.Group id="EventLocation">
                        <Form.Label>Event Location</Form.Label>
                        <Form.Control type="text" ref={EventLocationRef} required/> 
                    </Form.Group>

                   
                <Form.Group id="EventDate" >
                <Form.Label>Event Date</Form.Label>
                <div>
                <LocalizationProvider dateAdapter={AdapterDateFns} >

                    <DesktopDatePicker 
                        required
                        inputFormat="dd/MM/yyyy" 
                        value={dateValue}
                        onChange={handleChangeDate}
                        ref={EventDateRef}
                        renderInput={(params) => <TextField {...params} style={{background:'white',borderRadius:'5px',paddingTop:'5px'}} />}
                    />
                </LocalizationProvider>
                </div>
                </Form.Group>

                <Form.Group  id="EventPicture" className="mb-3 ">
                    <Form.Label>Upload Event Picture</Form.Label>
                    <Form.Control type="file" onChange={handleChangePicture} />

                    <Image src={tempImgUrl} alt="" fluid className="w-50 h-50 mt-3 mx-auto d-block" rounded />

                </Form.Group>

                <Form.Group id="Discription" >
                        <Form.Label>Discription</Form.Label>
                        <Form.Control type="text" ref={DiscriptionRef} required/> 
                    </Form.Group>

                    <Button disabled={loading} type='submit' className="w-100 mt-sm-2" variant='contained' color='primary'>
                        Create event
                    </Button>

                </Form>               
            </Card.Body>
        </Card>

            </Container>
    </>
    )
}
