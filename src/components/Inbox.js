import React, { useState } from 'react'
import '../styles/inbox.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { mailActions, getEmailsFromDatabase } from '../redux/slices/mailSlice'
import EmailComponent from './EmailComponent'
const Inbox = () => {
    const [allEmails, setAllEmails] = useState([]);
    const user = useSelector(state => state.auth.user);
    const inboxEmails = useSelector(state => state.mail.inboxEmails);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            dispatch(mailActions.updateUserDetails(user));
            fetch('https://mailboxclient-156f6-default-rtdb.firebaseio.com/emails.json').then((data) => {
                return data.json();
            }).then((data) => {
                setAllEmails(data);
                dispatch(mailActions.updateEmails(data));

            })
        }

    }, [user])
    return (

        <div className='inboxContainer'>
            <span id='inboxTitle'>Inbox <span className='material-icons'>refresh</span></span>
            
            <div className='inboxTable'>
                {
                    inboxEmails && inboxEmails.map((email, index) => {
                        return (
                            <EmailComponent key={index} email={email} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Inbox