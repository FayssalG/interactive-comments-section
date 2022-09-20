import React, { useEffect, useState } from "react";
import Reply from "./Reply";
import './styles/ReplyComments.css'

export default function ReplyComments({ calcDate , commentId, replies , currentUser ,setReply , setEdit , setDelete , setScore }){

   
    return(
    <div className="replies-container">
        {replies && replies.map((reply)=>{
            return(
                
                <Reply key={reply.id} calcDate={calcDate} setScore={setScore} setDelete={setDelete} setEdit={setEdit} commentId={commentId} currentUser={currentUser} setReply={setReply}  reply={reply}></Reply>
                
            )
        })}

    </div>
    )
}

