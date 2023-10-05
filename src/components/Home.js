import React,{useState} from 'react'
import ComposeEmail from './ComposeEmail'
import '../styles/home.css'
import maillogo from '../images/PngItem_1924154.png';
import Inbox from './Inbox';
import Trash from '../components/Trash';
import SentEmail from './SentEmail';
import { useSelector } from 'react-redux';
const Home = () => {
  const [selectedButton, setSelectedButton] = useState('inbox');
  let inboxEmails = useSelector(state => state.mail.inboxEmails);
  inboxEmails = inboxEmails.filter(email => email.isEmailRead == false);
  const renderContent = () => {
    switch (selectedButton) {
      case 'inbox':
        return <Inbox />;
      case 'compose':
        return <ComposeEmail />;
      case 'sent':
        return <SentEmail />;
      case 'trash':
        return <Trash />
      default:
        return null;
    }
  };

  return (
    
    <div style={{ display: 'flex', backgroundColor: '#d8ded9' }}>
      
      {/* Left side with buttons */}
      <div id='lefthomeContainer'>
        <a href='/login'><img src={maillogo} className='emailImg'/></a>
        <button onClick={() => setSelectedButton('compose')} id='composeBtn'>Compose</button>
        <button onClick={() => setSelectedButton('inbox')} className='mailBtn' style={{display:'flex',justifyContent:'space-evenly'}}>Inbox <span>{inboxEmails.length}</span></button>
        <button onClick={() => setSelectedButton('sent')} className='mailBtn'>Sent</button>
        <button onClick={() => setSelectedButton('trash')} className='mailBtn'>Trash</button>
      </div>

      {/* Right side with content based on selected button */}
      <div style={{backgroundColor:'white', width: '100%'}}>
        {renderContent()}
      </div>
    </div>
  )
}

export default Home