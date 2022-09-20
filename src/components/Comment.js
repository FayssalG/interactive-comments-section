import React, { Children , useEffect, useRef, useState} from 'react'
import './styles/Comment.css';
import ReplyComments from './ReplyComments';
import CommentInput from './CommentInput';
import EditInput from './EditInput';
/*
const mobileMedia = '500px'
const cssVars = {
    ModerateBlue : 'hsl(238, 40%, 52%)',
    LightGray: 'hsl(223, 19%, 93%)',
    GrayishBlue: 'hsl(211, 10%, 45%)',
    DarkBlue: 'hsl(212, 24%, 26%)',
    White: 'hsl(0, 0%, 100%)',
    VeryLightGray :'hsl(228, 33%, 97%)'
}


const Div = styled.div`
    margin: 10px;
    padding: 10px;
    font-size: 16px;
    background-color: ${cssVars.White};
    border-radius: 5px;
    min-width : 300px;
    max-width: 600px;
    min-height : 160px;
    display:flex;
    align-items : center; 

`
const Container = styled.div`
   display: flex;
   flex-direction : row-reverse;
   margin: 0 10px;
   position : relative;

   @media (max-width: ${mobileMedia}){
        flex-direction : column;
   }
`

const Content = styled.div`
    width : 85%;
    margin:0 20px;
    & ${Content} p {
        color: ${cssVars.GrayishBlue}
    }

    @media (max-width: ${mobileMedia}){
        margin:20px 0;
    }
    
`
const Top = styled.div`
    display: flex;
    flex-direction : row;
    align-items: center;
    margin-bottom: 10px;    
`
const Image = styled.div`
    &${Image} img{
        width:100%
    }
    width : 40px;
`


const SpanName = styled.span`
    color: ${cssVars.DarkBlue};
    font-weight: 700;
    margin: 0 15px;
`
const SpanDate = styled.span`
    color: ${cssVars.GrayishBlue}
`

const Upvote = styled.div`
    & ${Upvote} a {
        color: ${cssVars.GrayishBlue};
    }
    & ${Upvote} p {
        color: ${cssVars.ModerateBlue};
        font-weight: 700;
    }
    font-size: 20px;
    display: flex;
    flex-direction : column;
    align-items : center;
    justify-content: space-evenly;
    border-radius: 9px;
    width: 9%;
    min-height: 120px;
    background-color: ${cssVars.VeryLightGray};
    @media (max-width: ${mobileMedia}){
        flex-direction : row;
        width:40%;
        min-height: 30px;
    
   }
`

const Reply = styled.a`
    color: ${cssVars.ModerateBlue};
    font-weight: 700;
    position: absolute;
    right: 0;

    @media (max-width: ${mobileMedia}){
        bottom:5px;
        
   }
`
*/



function Comment({ calcDate ,currentUser  , commentData  , setReply , setEdit , setDelete , setScore}){
    const [isReplying , setReplying] = useState(false)
    const [isEditing , setEditing] = useState(false)
    const [isDeleting , setDeleting] = useState(false)

    let initialVote = useRef(commentData.score)



    const voting = (add)=>{
        if (add==1){
            if (commentData.score > initialVote.current) return
            setScore(add , commentData.id , 'comment')
        }
        
        else{
            if (commentData.score == initialVote.current) return
            setScore(add , commentData.id , 'comment')
        }

    }
       
    
    
    
    return(
        <>

        { !isEditing &&
        <div  className={'comment-container'}>
                <div className='comment'>
                    <div className='content'> 
                        <div className='top'>
                            <div className='image'><img alt='profile picture' src={commentData.user.image.png}></img></div>
                            <span className='name'>{commentData.user.username}</span>
                            {currentUser.username==commentData.user.username && <span className='you'>you</span>}
                            <span className='date'>{calcDate(commentData.createdAt)}</span>
                        </div>
                        
                        <p>{commentData.content}</p>
                    </div>   
                    <div className='vote'>
                        <button onClick={()=>voting(1)}>+</button>
                        <p>{commentData.score}</p>
                        <button onClick={()=>voting(-1)}>-</button>
                    </div>

                    
                    <div className="edit-delete-reply">
                        {currentUser.username==commentData.user.username &&
                            <>
                            <button className="delete" onClick={()=>{setDeleting(!isDeleting)}} >
                                <img alt='delete' src='../images/icon-delete.svg'></img>
                                Delete
                            </button> 
                            <button className="edit"  onClick={()=>{setEditing(!isEditing)}} >
                            <img alt='edit' src='../images/icon-edit.svg'></img>
                            Edit
                            </button>
                            </>
                        }
                        {currentUser.username!=commentData.user.username &&
                            <button className="reply" onClick={()=>{setReplying(!isReplying) }}>
                                <img alt='reply' src='../images/icon-reply.svg'></img>
                                Reply
                            </button>
                        }
                    </div>
                    
                </div>    
        </div>
        }
        
            {isEditing &&<><div className="overlay"></div> <EditInput user={currentUser} setEdit={setEdit} editedType='comment' editedId={commentData.id} value={commentData.content} setEditing={setEditing} /> </>}
        
        
            {isReplying && <CommentInput buttonType='reply' user={currentUser} commentId={commentData.id} replyingTo={commentData.user.username} setReply={setReply} setReplying={setReplying}></CommentInput>}
            <ReplyComments calcDate={calcDate} setScore={setScore} setDelete={setDelete} setEdit={setEdit} commentId={commentData.id}  currentUser={currentUser} setReply={setReply} replies={commentData.replies}/>

            {
                isDeleting && setDelete(isDeleting , setDeleting , 'comment' , commentData.id)
            }
         
            
            
    </>
    )
}

export default Comment