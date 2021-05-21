import React from 'react'
import styled from 'styled-components'
import Imageslider from './Imageslider'
import Viewers from './Viewers'
import Recommend from './Recommend'
import Trending from './Trending'
import Originals from './Originals'
import NewDisney from './NewDisney'
import { useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { setMovies } from "../features/movies/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import db from '../firebase';


function Home() {

    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    let recommends = [];
    let newDisneys = [];
    let originals = [];
    let trending = [];
  
    useEffect(() => {
     db.collection("movies").onSnapshot((Snapshot) => {
        Snapshot.docs.map((doc) => {
          console.log(recommends);
          switch (doc.data().type) {
            case "recommend":
              recommends = [...recommends, { id: doc.id, ...doc.data() }];
              break;
  
            case "new":
              newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
              break;
  
            case "original":
              originals = [...originals, { id: doc.id, ...doc.data() }];
              break;
  
            case "trending":
              trending = [...trending, { id: doc.id, ...doc.data() }];
              break;
          }
        });
  
        dispatch(
          setMovies({
            recommend: recommends,
            newDisney: newDisneys,
            original: originals,
            trending: trending,
          })
        );
      });
    }, [userName]);
    return (
       <Container>
          <Imageslider />
          <Viewers />
          <Recommend />
          <Trending />
          <Originals />
          <NewDisney />
       </Container>
    )
}

export default Home

const Container = styled.main`
position: relative;
padding:30px 50px;
overflow:hidden;

    &:before {
        background: url("/images/home-background.png") center center / cover
        no-repeat fixed;        
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -100000;
    }
    `;