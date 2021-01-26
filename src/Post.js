import React from 'react'
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

function Post({id, username, caption, imageUrl}) {
    
    return (
        <div id= {id}className="post">
        <div className="post__header">
        <Avatar
        className="post__avatar"
         alt="Shivam Sharma"
         src="/static/images/avatar/1.jpg" 
         />
         <h3>{username}</h3>
        </div> 
            {/*header --> avatar + Username */}
            {/*avatar using material ui  */}
           <img className="post__image" alt="" src={imageUrl}/>
            {/* image  */}
           <h4 className="post__text"><strong>{username}</strong>{caption}</h4>
            {/* username + caption */}
        
        </div>
    )
}

export default Post;
