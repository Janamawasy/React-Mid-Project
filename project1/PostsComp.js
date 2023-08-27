import React, { useState , useEffect } from 'react'
import axios from 'axios'

const PostsComp = ({post,active}) => {
if (active===true){
  return (
    <div style={{border : `2px solid purple`,textAlign:'left',float:'left',width:'300px'}}>
        Title: {post.title}<br/>
        Body: {post.body}
    </div>

  )}
}

export default PostsComp
