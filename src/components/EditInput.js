import React from "react";
import './styles/CommentInput.css'

export default function EditInput({user , setEdit , value , setEditing , editedId,commentId ,editedType}){
    return(
        <div className="comment-input edit-input">
            <div className="image"><img alt="profile picture" src={user.image.png}></img></div>
            <textarea defaultValue={value}  placeholder="Add a comment..." className={"new-comment-area edit-comment-area"} ></textarea>
            <button className='send' onClick={()=>{setEdit(document.querySelector('.edit-comment-area').value , editedId, editedType , commentId) ; setEditing(false)}}>Update</button>
        </div>
    )
}