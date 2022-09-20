import React, { useEffect, useState } from 'react'
import Comment from './components/Comment'
import CommentInput from './components/CommentInput';
import ReplyComments from './components/ReplyComments';
import Swal from 'sweetalert2';
import uuid from 'react-uuid'
import './App.css';


function App() {
    const [comments , setComments] = useState(JSON.parse(localStorage.getItem('comments')) ?? []) 
    const [currentUser , setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) ?? null)

   
    useEffect(()=>{
        if (!localStorage.getItem('comments')) {
            fetch('/data.json')
            .then((res)=>{
                return res.json()
            })
            .then((data)=>{
                setComments((prevComments)=>{
                    return prevComments.concat(data.comments);
                })
    
                setCurrentUser(()=>{
                    return data.currentUser
                })
            })
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('comments' , JSON.stringify(comments))
        localStorage.setItem('currentUser' , JSON.stringify(currentUser))
    },[comments , currentUser])

    const handleCommentAdd=(commentToAdd)=>{
        if (commentToAdd.content == '' || commentToAdd.content ==' ') return
        setComments((prevComments)=>{
            return prevComments.concat(commentToAdd)
        })
    } 
    
    const handleReplyAdd = (reply , id)=>{
        if (reply.content == '' || reply.content == ' ') return
        let newComments = [...comments];
        newComments.forEach((newComment)=>{
            if (id === newComment.id) {
                newComment.replies.push(reply)
            }
        })

        setComments(newComments)
    }



    const handleEdit = (editedContent , editedId , editedType , commentId )=>{
        let newComments = [...comments]
        if(editedType == 'comment'){
            newComments.forEach((newComment)=>{
                if (newComment.id == editedId) {
                    newComment.content = editedContent
                }
            })
        }
        else{
            newComments.forEach((newComment)=>{
                if (newComment.id == commentId) {
                    newComment.replies.forEach((reply)=>{
                        if (editedId == reply.id) {
                            reply.content = editedContent
                        }
                    })
                }
            })
        }
        setComments(newComments)
    }

    
        
    const handleDelete = (isDeleting , setDeleting , deletedType , deletedId , commentId)=>{
        Swal.mixin({
            customClass:{
                container : 'swal-container',
                actions: 'swal-actions',
            }
        })
        .fire({
            title: 'Delete Comment ?',
            text: "Are you sure you want to delete this comment ? this will remove the and can't be undone",
            width: '400px' ,
            confirmButtonColor: 'hsl(358, 79%, 66%)',
            cancelButtonColor: 'hsl(211, 10%, 45%)',
            confirmButtonText: 'yes, delete',
            showCancelButton: true
            
        })
        .then((result)=>{
            if (result.isConfirmed){
                let newComments = [...comments]
                if (deletedType == 'comment') {
                    newComments = newComments.filter((newComment)=>{
                            return newComment.id !== deletedId
                        
                    })
                }
                else{
                    newComments.forEach((newComment)=>{
                        if (newComment.id === commentId) {
                            newComment.replies = newComment.replies.filter((reply)=>{
                                return reply.id !== deletedId
                            })
                        }
                    })
                }
                setComments(newComments)
            }
            setDeleting(false)
        })        
    }


    const handleScore= (add , votedId , votedType , commentId)=>{
        const newComments = [...comments]
        if (votedType == 'comment') {
            newComments.forEach((newComment)=>{
                if(newComment.id === votedId) {
                    console.log(newComment.id)
                    newComment.score = newComment.score+add
                }
            })
        }
        else{
            newComments.forEach((newComment)=>{
                if(newComment.id === commentId){
                    newComment.replies.forEach((reply)=>{
                        if(reply.id === votedId) {
                            reply.score = reply.score+add
                        }
                    })
                }
            })
        }
        setComments(newComments)
    }



    
    function calcDate (date){
        let nowDate =  new Date()
        let pastDate = date

        const diff_In_Time = nowDate.getTime() - pastDate
        const diff_In_Seconds = parseInt(diff_In_Time /1000 )
        const diff_In_Minutes =parseInt(diff_In_Seconds / 60)
        const diff_In_Hours = parseInt(diff_In_Minutes/60)
        const diff_In_Days = parseInt(diff_In_Hours / 24)
        const diff_In_Weeks = parseInt(diff_In_Days / 7)
        const diff_In_Months = parseInt(diff_In_Days / 30) 

        if (diff_In_Months >= 1) return diff_In_Months + (diff_In_Months==1 ?' Month ago' :' Months ago' )
        if (diff_In_Weeks >= 1) return diff_In_Weeks + (diff_In_Weeks==1 ?' Week ago' :' Weeks ago') 
        if (diff_In_Days >= 1) return diff_In_Days + (diff_In_Days==1 ?' Day ago' :' Days ago') 
        if (diff_In_Hours >= 1) return diff_In_Hours + (diff_In_Hours==1 ?' Hour ago' :' Hours ago' )
        if (diff_In_Minutes >= 1) return diff_In_Minutes + (diff_In_Minutes==1 ?' Minute ago' :' Minutes ago') 
        if (diff_In_Minutes < 1) return 'Just Now'
        
    }  

    
    return(
        <div className='wrapper'>
            {currentUser  && comments.map((comment )=> {
                return (
                    
                    <Comment  key={comment.id} calcDate={calcDate} currentUser={currentUser} setScore={handleScore} setDelete={handleDelete} setEdit={handleEdit} setReply={handleReplyAdd}   commentData={comment}></Comment>
                    
                )
            })}
            {currentUser && <CommentInput buttonType="send" user={currentUser} setComment={handleCommentAdd} ></CommentInput>}
        </div>
    )
}

export default App