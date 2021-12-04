import React from 'react'
import { Container,Row,Col,Card} from 'react-bootstrap'
import './Style/HomePage.css'
import Feed from './Feed/Feed'
import { maxWidth } from '@mui/system'
export default function HomePage() {
    return (
        <>
    <div className='bodyDiv'>         
        <Container className='flex-warp' fluid>
            <Row>
                <Col style={{maxWidth: '85%'}}>
                    Events Feed
                    <Feed/>
                </Col>
                <Col style={{maxWidth:'15%'}}>
                    <div className='sticky' >
                        Sticky sidebar
                    </div>
                </Col>
            </Row>
        </Container>

        
    </div>
    </>
    )
}
