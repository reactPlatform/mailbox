import React from 'react'
import EmailComponent from './EmailComponent'
import { useSelector } from 'react-redux'
const SentEmail = () => {
    const sentEmails = useSelector(state => state.mail.sentEmails);
  return (
    <div className='inboxContainer'>
            <span id='inboxTitle'>Sent Box</span>
            <div className='inboxTable'>
                {
                    sentEmails && sentEmails.map((email, index) => {
                        return (
                            <EmailComponent key={index} email={email} />
                        )
                    })
                }
            </div>
        </div>
  )
}

export default SentEmail