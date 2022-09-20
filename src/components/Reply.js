import React, { useEffect, useRef, useState } from "react";
import "./styles/Comment.css";
import CommentInput from "./CommentInput";
import EditInput from "./EditInput";


export default function Reply({ currentUser  ,setReply ,  reply  ,commentId , setEdit , setDelete ,setScore , calcDate}){
    const [isReplying , setReplying] = useState(false)
    const [isEditing , setEditing] = useState(false)
    const [isDeleting , setDeleting] = useState(false)

    const initialVote = useRef(reply.score)

  
    const voting = (add)=>{
        if (add==1){
            if (reply.score > initialVote.current) return
            setScore(add , reply.id , 'reply' , commentId)
        }
        
        else{
            if (reply.score == initialVote.current) return
            setScore(add , reply.id , 'reply' , commentId)
        }
    }
    return(
        <>
        { !isEditing &&
        <div  className={'comment-container reply-container'}>
                <div className='comment'>
                    <div className='content'> 
                        <div className='top'>
                            <div className='image'><img alt="profile picture" src={reply.user.image.png}></img></div>
                            <span className='name'>{reply.user.username}</span>
                            {currentUser.username==reply.user.username && <span className='you'>you</span>}
                            <span className='date'>{calcDate(reply.createdAt)}</span>
                        </div>
                        
                        <p><span className="mention">@{reply.replyingTo}</span> {reply.content}</p>
                    </div>   
                    <div className='vote'>
                        <button onClick={()=>voting(1)}>+</button>
                        <p>{reply.score}</p>
                        <button onClick={()=>voting(-1)}>-</button>
                    </div>

                    <div className="edit-delete-reply">
                        {currentUser.username==reply.user.username && 
                            <>
                            <button className="delete"  onClick={()=>{setDeleting(!isDeleting)}}>
                                <img alt="delete" src='../images/icon-delete.svg'></img>
                                Delete
                            </button>

                            <button className="edit" onClick={()=>{setEditing(!isEditing) }} >
                                <img alt="edit" src='../images/icon-edit.svg'></img>
                                Edit
                            </button>
                            </>
                        }

                        {currentUser.username!=reply.user.username &&
                            <button className="reply" onClick={()=>setReplying(!isReplying)}>
                                <img alt={'reply to '+reply.user.username} src='../images/icon-reply.svg'></img>
                                Reply
                            </button>
                            }                    
                    </div>
                    
                </div>    
        </div>
        }
        {isEditing && <><div className="overlay"></div> <EditInput user={currentUser} setEdit={setEdit} editedType='reply' editedId={reply.id} value={reply.content} commentId={commentId} setEditing={setEditing} /> </>}
        {isReplying && <CommentInput buttonType='reply' user={currentUser} replyingTo={reply.user.username} commentId={commentId} setReply={setReply} setReplying={setReplying}></CommentInput>}
        {isDeleting && setDelete(isDeleting , setDeleting , 'reply' , reply.id , commentId)}       
    </>
    )
}