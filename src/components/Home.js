import React,{useState} from 'react'
import ComposeEmail from './ComposeEmail'
import '../styles/home.css'
import maillogo from '../images/PngItem_1924154.png';
import Inbox from './Inbox';
const Home = () => {
  const [selectedButton, setSelectedButton] = useState('inbox');
  const SentComponent = () => <div>This is the Sent component.</div>;

  const renderContent = () => {
    switch (selectedButton) {
      case 'inbox':
        return <Inbox />;
      case 'compose':
        return <ComposeEmail />;
      case 'sent':
        return <SentComponent />;
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
        <button onClick={() => setSelectedButton('inbox')} className='mailBtn'>Inbox</button>
        <button onClick={() => setSelectedButton('sent')} className='mailBtn'>Sent</button>
      </div>

      {/* Right side with content based on selected button */}
      <div style={{backgroundColor:'white', width: '100%'}}>
        {renderContent()}
      </div>
    </div>
  )
}

export default Home