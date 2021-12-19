import React from 'react'
import { Container,Row,Col,Card} from 'react-bootstrap'
import './Style/HomePage.css'
import Feed from './Feed/Feed'
import FeedFilters from './Feed/FeedFilters'


export default function HomePage() {
    return (
        <>
    <div className='bodyDiv'>  
           
        <Container className='flex-warp' fluid>

            <Row>
            <FeedFilters/>
            </Row>
            
            <Row>
                <Feed/>
            </Row>
        </Container>
    </div>
    </>
    )
}
