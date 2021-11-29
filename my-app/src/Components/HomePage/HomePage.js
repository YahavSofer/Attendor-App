import React from 'react'
import { Container,Row,Col,Card} from 'react-bootstrap'
import './Style/HomePage.css'

export default function HomePage() {
    return (
        <>
    <div className='bodyDiv'>         
        <Container className='flex-warp' fluid>
            <Row>
                <Col xl={8}>
                    Events Feed
                </Col>
                <Col xs={2}>
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
