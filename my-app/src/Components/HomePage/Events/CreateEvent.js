import React, {useRef, useState,useEffect} from 'react'
import {Card, Form,Container, Image} from 'react-bootstrap'
import {Button} from '@mui/material'
import {db,storage} from '../../../firebaseConfig'
import { addDoc,doc,getDocs,collection, query, where  } from "firebase/firestore"
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {  useAuth } from '../../../context/AuthContext'
import no_Img from '../../../images/no-image-available.jpeg'
import CloseIcon from '@mui/icons-material/Close'
import { format } from 'date-fns'

export default function CreateEvent() {


    const eventTitleRef = useRef()
    const eventLocationRef = useRef()
    const eventDateRef = useRef()
    const discriptionRef = useRef()
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [imageUrl, setImageURL] = useState("")
    const [tempImgUrl, setTempImgUrl] =useState(no_Img)
    const {currentUser} = useAuth()
    const [dateValue, setValue] = useState(Date(Date.now()))
    const [closeIconShow, setCloseIconShow] = useState(false)
    const fileRef = useRef()
    const costRef = useRef()
    const minPartiRef = useRef()
    const maxPartiRef = useRef()

const handleChangeDate = (newValue) => {
          setValue(newValue);
        };
        
function handleChangePicture(e) {
        setImage(e.target.files[0]);
        setTempImgUrl(URL.createObjectURL(e.target.files[0]))
        setCloseIconShow(true)
          }


function OnClickCloseIcon(){
    setCloseIconShow(false)
    setTempImgUrl(no_Img)
    fileRef.current.value = ''
}

async function CountUserEvents(){
    const eventsDB = collection(db, "Events")
    const q = query(eventsDB, where("userid", "==", currentUser.uid)); 
    const querySnapshot = await getDocs(q).then(res =>{
            return res.size
        })
    return querySnapshot
}  

async function handleCreatePathName(){
    const eventCounter = ((await CountUserEvents()))
    const imgPath = currentUser.uid + '_' + eventCounter + '_event'
    console.log(imgPath , eventCounter)
    return imgPath
}

    async function handleSubmit(e){
        e.preventDefault()
        
        try{
            setLoading(true)

            if(image !== null){
                const path = await handleCreatePathName()
                const ref = storage.ref(`/images/event_pictures/${path}`);

                const uploadTask = ref.put(image);
                uploadTask.on("state_changed", console.log, console.error,() => {
                    ref
                        .getDownloadURL()
                        .then(async (url)=>{
                            await addDoc(collection(db, "Events"),{
                                userid: currentUser.uid,
                                title: eventTitleRef.current.value,
                                location: eventLocationRef.current.value,
                                eventDate: dateValue,
                                eventImage: url, 
                                eventCost: costRef.current.value,
                                eventMinParti: minPartiRef.current.value,
                                eventMaxParti: maxPartiRef.current.value,
                                discription: discriptionRef.current.value              
                
                              });
                        
                        
                        });
                })}
            else{        
                    await addDoc(collection(db, "Events"),{
                        userid: currentUser.uid,
                        title: eventTitleRef.current.value,
                        location: eventLocationRef.current.value,
                        eventDate: dateValue,
                        eventImage: imageUrl, 
                        eventCost: costRef.current.value,
                        eventMinParti: minPartiRef.current.value,
                        eventMaxParti: maxPartiRef.current.value,
                        discription: discriptionRef.current.value              

                    });
            }


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
                <h2 className="text-center mb-4">Create New Event</h2>
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="eventname" >
                        <Form.Label>Event Title</Form.Label>
                        <Form.Control type="text" ref={eventTitleRef} required/> 
                    </Form.Group>
                    <Form.Group id="eventlocation">
                        <Form.Label>Event Location</Form.Label>
                        <Form.Control type="text" ref={eventLocationRef} required/> 
                    </Form.Group>

                <Form.Group id="eventDate">
                <Form.Label>Event Date</Form.Label>
                <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        
                        required
                        inputFormat="hh:mm dd/MM/yyyy"
                        value={dateValue}
                        onChange={handleChangeDate}
                        ref={eventDateRef}
                        renderInput={(params) => <TextField {...params} style={{background:'white',borderRadius:'5px',paddingTop:'5px'}} />}
                                            />
                </LocalizationProvider>
                </div>
                </Form.Group>
                {/* https://mui.com/components/pickers/ */}

                <Form.Group  id="eventPicture" className="mb-3 ">
                    <Form.Label>Upload Event pricture</Form.Label>
                    <Form.Control ref={fileRef} type="file" onChange={handleChangePicture} />
                    <Container style={{  display: 'inline-block',position: 'relative'}}>
                        {closeIconShow ? <CloseIcon  style={{ cursor:'pointer', position: 'absolute',right: '70px',top: '10px',lineHeight :'0'}} onClick={OnClickCloseIcon}/> : null}
                        <Image src={tempImgUrl} alt="" fluid className="w-50 h-50 mt-3 mx-auto d-block" rounded />
                    </Container>

                </Form.Group>

                {/* <Form.Group id="cost" className="mb-3">
                    <Form.Control aria-label="Amount (to the nearest shekel)" ref={costRef}/>
                    <Form.Group.Text>₪</Form.Group.Text>
                    <Form.Group.Text>.00</Form.Group.Text>
                </Form.Group> */}
                {/* https://react-bootstrap.github.io/components/input-group/ */}

                <Form.Group id="Minimum Participants" >
                        <Form.Label>Minimum Participants</Form.Label>
                        <Form.Control type="number" ref={minPartiRef} required/> 
                </Form.Group>

                <Form.Group id="Maximum Participants" >
                        <Form.Label>Maximum Participants</Form.Label>
                        <Form.Control type="number" ref={maxPartiRef} required/> 
                </Form.Group>


                <Form.Group id="discription" >
                        <Form.Label>Discription</Form.Label>
                        <Form.Control type="text" as="textarea" rows={5} ref={discriptionRef} required/> 
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
