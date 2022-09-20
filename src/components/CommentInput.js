import React, { useEffect } from "react";
import uuid from "react-uuid";
import './styles/CommentInput.css';
export default function CommentInput({user , buttonType , commentId , replyingTo  , setComment , setReply , setReplying}){
    const regex = new RegExp('@'+replyingTo , 'g')

     



    const newReply = ()=>{
        return {
        id: uuid(),
        content: document.querySelector('.reply-comment-area').value.replace(regex , ''),
        createdAt : Date.now(),
        replyingTo : replyingTo ,
        score : 0,
        user : {
            image: {
                png :user.image.png,
                webp: user.image.webp
                },
            username : user.username
            }    
        }
    }

    const newComment = ()=>{
        
        return {
            id: uuid(),
            content: document.querySelector('.new-comment-area').value,
            createdAt : Date.now(),
            replies : [],
            score : 0,
            user : {
                image: {
                    png :user.image.png,
                    webp: user.image.webp
                    },
                username : user.username
                }    
            }  
    }
    
    const clearInput = ()=>{
        document.querySelector('.new-comment-area').value =''
    }
    return(
        <div className="comment-input">
            <div className="image"><img alt="profile picture" src={user.image.png}></img></div>
            <textarea defaultValue={replyingTo ?'@'+ replyingTo+' ' : ''}  placeholder="Add a comment..." className={ replyingTo? 'reply-comment-area':"new-comment-area"} type='text-area'></textarea>
            <button className='send' onClick={replyingTo!=undefined ? ()=>{setReply(newReply() , commentId) ; setReplying(false) ;} : ()=>{setComment(newComment()) ; clearInput()}}>{buttonType}</button>
        </div>
    )
}

