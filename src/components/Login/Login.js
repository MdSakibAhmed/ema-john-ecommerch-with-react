import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";

//import UserContext from "../../App"
import firebaseConfig from "./firebase.config";


!firebase.apps.length &&firebase.initializeApp(firebaseConfig)


function Login() {
    const  [loggedInUser,setLoggedInUser] = useContext(UserContext)   
  const [user,setUser] = useState({
    isSignedIn : false,
    name:"",
    email:"",
    password:"",
    phoneNumber:"",
    photo:"",
    error:"",
    success:false

  })


  
  const [newUser, setNewUser] = useState(false)
  let history = useHistory()
  let location = useLocation()
  let {from} = location.state || {from: { pathname:"/"}}
  
  const provider = new firebase.auth.GoogleAuthProvider()
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider).then(result =>{
      const credential = result.credential;
      // Googl API
      const token = credential.accessToken;
      // User Info 
      const {email, displayName, photoURL} = result.user;

      const singedInUser = {
        isSignedIn : true,
        name:displayName,
        email:email,
        photo:photoURL

      }

      setUser(singedInUser)

    
            history.replace(from)
      console.log(email,displayName,photoURL);

    })
    .catch(err => {
      console.log(err.massage);
      console.log(err.code);
      console.log(err.massage);
      console.log(err.email);
    })
  }
  const handleSingOut = () => {
    firebase.auth().signOut().then(res => {
      const signOutUser = {
     isSignedIn : false,
    name:"",
    email:"",
    photo:""
   
      }
      setUser(signOutUser)
      console.log(res);


    }).catch(err => {
      console.log(err.massage);
    })

  }


 // Email and password authentication

  const handleChange = (e) => {
      let isFiledValid = true;

      console.log( e.target.name,e.target.value);
      if(e.target.name === "email"){
          isFiledValid =   /\S+@\S+\.\S+/.test(e.target.value)
          
      }
      if(e.target.name === "password"){
         const  isPasswordValid = e.target.value.length > 6
         const passwordHasNumber =  /\d{2}/.test(e.target.value)
         console.log(isPasswordValid && passwordHasNumber);
         isFiledValid = isPasswordValid && passwordHasNumber;

      }
      if(isFiledValid){
          const   newUser = {...user}
          newUser[e.target.name] = e.target.value;
          setUser(newUser)
      }
  }
  const handleUserState = (  success,error) =>{
    const newUser = {...user}
    newUser.error = error
    newUser.success = success;
   setLoggedInUser(newUser)
    setUser(newUser)
    console.log(user);
   
   console.log(loggedInUser);
  }
  const handleUserInfo = (name,phoneNumber) => {
      const user = firebase.auth().currentUser;
      user.updateProfile({
          displayName:name,
          phoneNumber:phoneNumber
      }).then(res => {
          console.log("user name updated successfully")
          console.log(res);
      }).catch(err =>  {
          console.log(err);

      })
      ;

  }
  const handleSubmit = (e) => {
      const {email,password,name,phoneNumber} = user
      console.log(phoneNumber);
   
    if( newUser && email && password){
        firebase.auth().createUserWithEmailAndPassword(email,password).then(res => {
            console.log(res.user);

            // const newUser = {...user}
            // newUser.error = ""
            // newUser.success = true;
            // setUser(newUser)
            handleUserState(true,"")
             handleUserInfo(name,phoneNumber)
            


        }).catch(err => {
            // const newUser = {...user}
            // newUser.error = err.code;
            // newUser.success = false;

            // setUser(newUser)
            handleUserState(false,err.code)
            console.log(err.code);

        })
    }
    if( !newUser&& email&& password){
        firebase.auth().signInWithEmailAndPassword(email,password).then(res => {
            handleUserState(true,"")
            console.log(res,res.user);
            // let{from} = location.state || {from: {pathname:"/"}}
            history.replace(from)


            
        }).catch(err => {
            handleUserState(false,err.code)
        })
    }
    e.preventDefault()
}
  return (<div style={{textAlign:"center"}}>
  
    <h1>firebase</h1>
    {
      user.isSignedIn ?  <button onClick={handleSingOut}>sign out </button>:<button onClick={handleSignIn}>sign in with google </button>
    }

    {
      user.isSignedIn && <div><p>Welcome,{user.name}</p>
      <p>{user.email}</p>
      <img src={user.photo} alt=""/></div>
    }

    <div>
        <p>Email:{user.email}</p>
        <p>Password:{user.password}</p>
        <p>Name: {user.name}</p>
        {
            user.success ? <h2 style={{color:"green"}}>Successfully { newUser?"created":"Logged in"} account</h2>:<h2 style={{color:"red"}}> {user.error}</h2>
        }
        
    </div>

<input onChange={() => setNewUser(!newUser) } type="checkbox" name="" id="newUser"/>
<label htmlFor="newUser">new user</label>
    <form onSubmit={handleSubmit}>
    <br/>
    { newUser && <input onBlur={handleChange} name = "name" type="text" placeholder="Your name" />}
  
        <input name="email" onBlur={handleChange} type="text" placeholder="Your email" required/>
        <br/> 
        <br/>
   {/* <h2>{loggedInUser.email}</h2> */}
        <input placeholder="Your password" name="password" onBlur={handleChange} type="password"  id="" required/>
        <input type="number" onBlur={handleChange} name="phoneNumber" id=""/>
        <br/>
        <br/>

        <input type="submit" value={newUser?"sign up":"sign in"}/>

    </form>

   </div> 
  );
}

export default Login;
