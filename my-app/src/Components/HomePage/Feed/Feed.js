import React ,{useEffect,useState} from 'react'
import { Container } from 'react-bootstrap'
import Event from '../Events/Event'
import Loader from './Loader';
import EndMsg from './EndMsg';
import Comment from './Comment';

import {db,storage} from '../../../firebaseConfig'
import {getDocs,collection,limit,startAfter,doc} from "firebase/firestore"

//  npm install --save react-infinite-scroll-component
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Feed() {
    const [items, setItems] = useState([]);

    const [hasMore, sethasMore] = useState(true);
  
    const [page, setpage] = useState(2);

    const [latestDoc, setLatestDoc] = useState(0)

    useEffect(() => {
      const getComments = async (req, res) => {
        const AllEvents = await getDocs(collection(db,'Events'))
        .then(function(querySnapshot) {
          return querySnapshot.docs.map(doc => Object.assign(doc.data(), {id: doc.id})
          )})

        
        //   `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=20`
        //   // For json server use url below
        //   // `http://localhost:3004/comments?_page=1&_limit=20`
        // );
        // const data = await res.json();
        setItems(AllEvents);
        console.log(AllEvents);
      };
  
      getComments();
    }, []);
  
    const fetchComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`
        // For json server use url below
        // `http://localhost:3004/comments?_page=${page}&_limit=20`
      );
      const data = await res.json();
      return data;
    };
  
    const fetchData = async () => {
      const commentsFormServer = await fetchComments();
  
      setItems([...items, ...commentsFormServer]);
      if (commentsFormServer.length === 0 || commentsFormServer.length < 20) {
        sethasMore(false);
      }
      setpage(page + 1);
    };





    return (
        <>
    <Container style={{paddingRight:'100px'}}>

    {/* this is the way to render the posts */}

    {/* {EventsData.map((p) => (
          <Event key={p.id} post={p} />
        ))} */}                             
            {/* <Event/> */}


    {/* <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={fetchData}
      hasMore={hasMore}
      loader={<Loader />}
      endMessage={<EndMsg />}
    >
      <div className="container">
        <div className="row m-2">
          {items.map((item) => {
            return <Comment key={item.id} item={item} />;
          })}
        </div>
      </div>
    </InfiniteScroll> */}
  


        
    </Container>
    </>
    )
}
