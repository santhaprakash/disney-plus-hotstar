import styled from 'styled-components';
import { auth,provider } from "../firebase";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import {
    selectUserName,
    selectUserPhoto,
    setUserLoginDetails,
    setSignOutState,
  } from "../features/user/userSlice";
import  { useEffect } from "react";

const Header = (props) =>{
    const dispatch =useDispatch();
    const userName =useSelector(selectUserName);
    const history =useHistory();
    const userPhoto =useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            setUser(user);
            history.push("/home");
          }
        });
      }, [userName]);

      const handleAuth = () => {
        if (!userName) {
          auth
            .signInWithPopup(provider)
            .then((result) => {
              setUser(result.user);
              console.log(result);
            })
            .catch((error) => {
              alert(error.message);
            });
        } else if ( userName ) {
          auth
            .signOut()
            .then(() => {
              dispatch(setSignOutState());
              history.push("/");
            })
            .catch((err) => {
              alert(err.message);
        });
      };
    };
    const setUser =(user)=>{
        dispatch(
            setUserLoginDetails({
        name :user.displayName,
        email :user.email,
        photo :user.photoURL,
             } )
        );
    };


    return (
        <Nav>
          <Logo src="https://raw.githubusercontent.com/CleverProgrammers/cp-disney-plus-clone/64f94469c32e9d788a4af86200a333031c6bb835/public/images/logo.svg">
          </Logo>
         
             {!userName ?(
 <SignIn onClick={ handleAuth }>LOGIN</ SignIn>
             ):(
                 <>
          <NavMenu>
              <a >
                  <img src="./images/homeicon.jpg"   alt="" />
                  <span >HOME</span>
              </a>
              <a >
                  <img src="./images/search-icon.png"  alt="" style={{height:"20px",width:"20px"}}/>
                  <span>SEARCH</span>
              </a>
              <a >
                  <img src="./images/watchlist.png"  alt="" />
                  <span>WATCHLIST</span>
              </a>
              <a>
                  <img src="./images/originals.png"   alt="" />
                  <span>ORIGINALS</span>
              </a>
              <a >
                  <img src="./images/movie-icon.jpg"  alt=""  style={{height:"35px",width:"35px"}}/>
                  <span>MOVIES</span>
              </a>
              <a >
                  <img src="./images/series-icon.jpg"  alt=""  style={{height:"40px",width:"40px"}}/>
                  <span>SERIES</span>
              </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SignOut>
         </>
             )}
        </Nav>
    );
};

export default Header;


const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
   position:fixed;
   top:0;
   left:0;
   right:0;
   z-index:100;
`

const Logo = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;
    position:relative;
    a {
        display: flex; 
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
        img {
            height: 20px;
        }
        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;
            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0; 
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
            }
        }
        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
    @media (max-width: 768px) {
      display: none;
    } 
`;

const SignIn=styled.a`
background-color: rgba(0, 0, 0, 0.6);
padding: 8px 16px;
text-transform: uppercase;
letter-spacing: 1.5px;
border: 1px solid #f9f9f9;
position:absolute;
top:15;
right:20px;
border-radius: 4px;
transition: all 0.2s ease 0s;
&:hover {
  background-color: #f9f9f9;
  color: #000;
  border-color: transparent;
  cursor:pointer;
}
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top:20px;
  right: 40px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: absolute;
  top:10;
  right:3px;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;
