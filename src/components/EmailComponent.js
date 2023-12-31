import React from 'react'
import '../styles/emailComponent.css'
import { useDispatch } from 'react-redux'
import { mailActions } from '../redux/slices/mailSlice';
const EmailComponent = ({email}) => {
    const dispatch = useDispatch();
    const emailClick = (id) => { 
        dispatch(mailActions.updateEmailDetails(id));
    }  
    const deleteClick = (id) => {
      dispatch(mailActions.deleteEmails(id));
    }
  return ( 
    <div className='emailContainer' onClick={()=>emailClick(email.id)}> 
        <input type='checkbox' className='emailSelectionCheckbox'/> 
        <span className='emailReadStatus' style={{backgroundColor: email.isEmailRead ? 'green' : '#1ca6d3'}}></span> 
        <span className='emailSubject'>{email.subject}</span> 
        <span className='emailBody' dangerouslySetInnerHTML={{__html:email.body}} style={{marginTop: '13px'}}></span>
        <span className="material-icons deleteEmail" onClick={() => deleteClick(email.id)} style={{display: email.isDeleted ? 'none' : 'inline-block'}}>delete</span>   
 
    </div> 
  )
}

export default EmailComponent