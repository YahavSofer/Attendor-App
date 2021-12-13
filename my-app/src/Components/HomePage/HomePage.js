import React from 'react'
import { Container,Row,Col,Card} from 'react-bootstrap'
import './Style/HomePage.css'
import Feed from './Feed/Feed'
import SideBar from './Feed/SideBar'


export default function HomePage() {
    return (
        <>
    <div className='bodyDiv'>         
        <Container className='flex-warp' fluid>
            <Row>
            <Col className='sticky'>
                <SideBar/>

            </Col>
            <Col style={{maxWidth: '95%'}}>
                    <Feed/>
            </Col>

            </Row>
        </Container>
    </div>
    </>
    )
}
