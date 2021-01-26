import React from 'react';
import './App.css';
import Post from './Post';
import {useState, useEffect} from 'react'
import {auth, db} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

//Material UI styling for modal

function getModalStyle() {
// positions from top and left
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {
  //State
  const [posts, setPosts] = useState([]);
  //State to keep track of modal open and close
  const classes = useStyles();
  const [open,setOpen] = useState(false)
  const [modalStyle] = React.useState(getModalStyle);
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
//For hardoded posts
//     {
//       username: "shivamsharma",
//       caption:"WOW it works",
//       imageUrl:"https://images.unsplash.com/photo-1610658089070-8bb4c5faac39?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
//     }, 
//     {
//       username: "shivamsharma",
//       caption:"WOW it works",
//       imageUrl:"https://images.unsplash.com/photo-1610658089070-8bb4c5faac39?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
    
//     }
// ]);

  //useEffect -> Runs a piece of code based on specific condition
  //Accessing data from database
  useEffect(() =>{
  //runs eveytime the variable posts changes
  db.collection('posts').onSnapshot(snapshot =>{
    //everytime posts added, this code will fire
    setPosts(snapshot.docs.map(doc =>({
      id:doc.id,
      post:doc.data()
    })));
    })
  }, []);

  const signUp = (event)=>{
    event.preventDefault();
    
    auth
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
}
  return (
    <div className="App">
    <Modal
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
  {/* Render this thing */}
  <div style={modalStyle} className={classes.paper}>
      <center>
      <img
      className="app__headerImage"
      src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
      alt="" />
      <form className="app__signup">
      <Input 
        type="text"
        placeholder="username"
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
      />
      <Input 
        type="text"
        placeholder="email"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
      />
      <Input 
        type="password"
        placeholder="password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
      />
      <Button type="submit" onClick={(e)=>signUp()} >Sign Up</Button>
      </form>
      </center>
      
    </div>
    {/* {body} */}
  </Modal>
    <div className="app__header">
      <img
      className="app__headerImage"
      src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
      alt="" />
    </div>
    <Button onClick={() => setOpen(true)}>SignUp</Button>

    <h1>Hello world!</h1>
    {
      //By giving id to every component it will not refresh old posts but only add the post with new unique id
      posts.map(({id,post})=>(
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
      ))
    }
    {/* <Post username="shivamsharma" caption="WOW it works" imageUrl="https://images.unsplash.com/photo-1610658089070-8bb4c5faac39?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
    <Post username="RiyaSharma" caption="Beautiful Sunday" imageUrl="https://images.unsplash.com/photo-1610642674834-8df5a795486a?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
    <Post username="DeepikaSharma" caption="Amazing Day" imageUrl="https://images.unsplash.com/photo-1496440737103-cd596325d314?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" /> */}


    {/* Posts */}
    </div>
  );
}

export default App;
