import React, {useRef, useState,useEffect} from 'react'
import {Card, Form,Container, Image,InputGroup} from 'react-bootstrap'
import {Button} from '@mui/material'
import {db,storage} from '../../../firebaseConfig'
import { setDoc,doc,getDocs,collection, query, where,Timestamp  } from "firebase/firestore"
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {  useAuth } from '../../../context/AuthContext'
import no_Img from '../../../images/no-image-available.jpeg'
import CloseIcon from '@mui/icons-material/Close'
import { useHistory } from 'react-router-dom'

export default function UpdateEvent(props) {

    
    const eventTitleRef = useRef()
    const eventLocationRef = useRef()
    const descriptionRef = useRef()
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [imageUrl, setImageURL] = useState("")
    const [tempImgUrl, setTempImgUrl] =useState(no_Img)
    const {currentUser} = useAuth()
    const [dateValue, setDateValue] = useState(Date.now())
    const [closeIconShow, setCloseIconShow] = useState(false)
    const [cost,setCost] = useState(0)
    const [MaxParti, setMaxParti] = useState("No Limit")
    const fileRef = useRef()
    const costRef = useRef()
    const maxPartiRef = useRef()
    const history = useHistory()

function keepOnFormatStr(str)  {
        return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
    }    

const handleChangeDate = (newValue) => {

        setDateValue(newValue)

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

function HandleCost(){
    console.log(costRef.current.value);

    if (costRef.current.value === null){
        setCost(0)
    }
    else{
        setCost(costRef.current.value)
    }
}

const HandleMaxParti = (newValue) => {
    if (newValue.value === null){
        setMaxParti("No Limit")
        }
    else{
        setMaxParti(Number(newValue.value))
        }
    };

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

            HandleCost()
            
            let timestemp = new Date(dateValue)
            let ftime =Timestamp.fromDate(timestemp).toDate()

            if(image !== null){
                const path = await handleCreatePathName()
                const ref = storage.ref(`/images/event_pictures/${path}`);

                const uploadTask = ref.put(image);
                uploadTask.on("state_changed", console.log, console.error,() => {
                    ref
                        .getDownloadURL()
                        .then(async (url)=>{
                            await setDoc(doc(db, "Events"),{
                                userid: currentUser.uid,
                                title: eventTitleRef.current.value,
                                location: eventLocationRef.current.value,
                                eventDate: ftime,
                                eventImage: url, 
                                eventCost: Number(cost),
                                eventMaxParti: MaxParti,
                                description: keepOnFormatStr(descriptionRef.current.value),
                                userAttended: [],         
                                userLiked:[]
                            });
                        });
                })}
            else{        
                    await setDoc(collection(db, "Events"),{
                        userid: currentUser.uid,
                        title: eventTitleRef.current.value,
                        location: eventLocationRef.current.value,
                        eventDate: ftime,
                        eventImage: imageUrl, 
                        eventCost: Number(cost),
                        eventMaxParti: MaxParti,
                        description: keepOnFormatStr(descriptionRef.current.value),              
                        userAttended: [],         
                        userLiked:[]
                    });
            }

            // console.log('event added!');
            history.push('/user')
        }catch(e){
            console.error("Error adding document: ", e);
        }
        setLoading(false)
        
    }

   useEffect(()=>{
        const currentEvent =props.location.state.event;

        let timestemp = new Date(currentEvent.e_eventDate.seconds*1000)
        let ftime =Timestamp.fromDate(timestemp).toDate()
        console.log(ftime);

       eventTitleRef.current.value = currentEvent.e_title
       eventLocationRef.current.value=currentEvent.e_location
       setDateValue(ftime)
       fileRef.current.src = currentEvent.e_eventImage
       console.log(currentEvent.e_eventImage)
   },[])



    return (
        
        <>
        <Container className = 'd-flex align-items-center justify-content-center' style={{minHeight:"100vh"}}  id="noNavBar" >
        <div className='w-100'> 
        <Container style={{minWidth:'350px',maxWidth:'400px'}}>
        <Card className='shadow rounded' style={{background:'#83c5be'}}>
            <Card.Body>
                <h2 className="text-center mb-4">Update Event</h2>
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="eventname" >
                    <Form.Label>Event Title</Form.Label>
                        {/* <Form.Label>Event Title</Form.Label>     */}
                        {/* <Form.Control type="text" ref={eventTitleRef} required/>  */}
                        <TextField  inputRef={eventTitleRef} id="eventTitle" size="small"  variant="outlined" required style={{background:'white',borderRadius:'5px',marginBottom: '10px',paddingTop:'5px',width:'100%',maxHeight:'50px'}} />
                    </Form.Group>
                    <Form.Group id="eventlocation">
                    <Form.Label>Event Location</Form.Label>
                        {/* <Form.Label>Event Location</Form.Label> */}
                        {/* <Form.Control type="text" ref={eventLocationRef} required/>  */}
                        <TextField  required inputRef={eventLocationRef} id="eventlocation" size="small"  variant="outlined" required style={{background:'white',borderRadius:'5px',marginBottom: '10px', paddingTop:'5px',width:'100%',maxHeight:'50px'}} />
                    </Form.Group>

                <Form.Group id="eventDate">
                <Form.Label>Event Date</Form.Label>
                <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                     <DateTimePicker
                            required
                            value={dateValue}
                            onChange={handleChangeDate}
                            renderInput={(params) => <TextField {...params} style={{background:'white',borderRadius:'5px',paddingTop:'5px',marginBottom: '10px'}}  />}
                        />


                </LocalizationProvider>
            </div>
        </Form.Group>
                

                <Form.Group  id="eventPicture" className="mb-3 ">
                    <Form.Label>Upload Event pricture</Form.Label>
                    <Form.Control ref={fileRef} type="file" onChange={handleChangePicture} />
                    <Container style={{  display: 'inline-block',position: 'relative'}}>
                        {closeIconShow ? <CloseIcon  style={{ cursor:'pointer', position: 'absolute',right: '70px',top: '10px',lineHeight :'0'}} onClick={OnClickCloseIcon}/> : null}
                        <Image src={tempImgUrl} alt="" fluid className="w-50 h-50 mt-3 mx-auto d-block" rounded />
                    </Container>
                </Form.Group>

                <Form.Group id="cost" className="mb-3">
                <Form.Label htmlFor="inlineFormInputGroup" >
                        Event Cost
                    </Form.Label>
                    <InputGroup className="mb-2">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control id="inlineFormInputGroup" placeholder="Free" type='number' min="0" ref={costRef}/>
                    </InputGroup>
                    </Form.Group>
                {/* https://react-bootstrap.github.io/components/input-group/ */}


                <Form.Group id="Maximum Participants" >
                        <Form.Label>Maximum Participants</Form.Label>
                        <Form.Control type="number" min="1" ref={maxPartiRef} onChange={HandleMaxParti} style={{background:'white',borderRadius:'5px',marginBottom: '10px',paddingTop:'5px',width:'100%',maxHeight:'50px'}}/> 
                </Form.Group>


                <Form.Group id="description" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" multiline="true" as="textarea" rows={5} ref={descriptionRef} required/> 
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