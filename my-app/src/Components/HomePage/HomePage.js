import React from 'react'
import { Container,Row,Col,Card} from 'react-bootstrap'
import './Style/HomePage.css'
import Feed from './Feed/Feed'
import { maxWidth } from '@mui/system'
import SideBar from './Feed/SideBar'
export default function HomePage() {
    return (
        <>
    <div className='bodyDiv'>         
        <Container className='flex-warp' fluid>
            <Row>
                <Col style={{maxWidth: '80%'}}>
                    <Feed/>
                </Col>
                <Col style={{maxWidth:'20%'}}>
                    <div className='sticky' >
                        <SideBar/>
                    </div>
                </Col>
            </Row>
        </Container>

        
    </div>
    </>
    )
}
