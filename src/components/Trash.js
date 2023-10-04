import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/inbox.css';
import EmailComponent from './EmailComponent';
const Trash = () => {
    const trashEmails = useSelector(state => state.mail.trashEmails);
    console.log(trashEmails);
    return (
        <div className='inboxContainer'>
            <span id='inboxTitle'>Inbox</span>
            <div className='inboxTable'>
                {
                    trashEmails && trashEmails.map((email, index) => {
                        return (
                            <EmailComponent key={index} email={email} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Trash