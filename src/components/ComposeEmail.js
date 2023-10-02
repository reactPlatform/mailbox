// Install required packages using:
// npm install react-bootstrap bootstrap react-quill

// SimpleMailbox.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, DropdownDivider } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/composeEmail.css';
import { addEmailInDatabase } from '../redux/slices/mailSlice';
import { useSelector, useDispatch } from 'react-redux/';
import { mailActions } from '../redux/slices/mailSlice';

const ComposeEmail = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ];

  const handleSendClick = (e) => {
    e.preventDefault();
    dispatch(mailActions.addEmail({toAddress: to, fromAddress: user.email, subject, body}));    
    setTo('');
    setSubject('');
    setBody('');
  };

  useEffect(() => {
    dispatch(mailActions.getEmails());
  },user)
  return (
    <Container >
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <Form style={{width:'150%'}}> 
            <Form.Group controlId="formTo" id='formto'>
              <span>To</span>
              <Form.Control
                type="email"
                className='composeInput'
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group controlId="formSubject" id='formsubject'>
              <span>Subject</span>
              <Form.Control
                type="text"
                className='composeInput'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group controlId="formBody" id='formbody'>
              
              <ReactQuill
                value={body}
                onChange={(value) => setBody(value)}
                modules={modules}
                formats={formats}
                placeholder='Type your message here'
                style={{ height: '200px',display:'flex', flexDirection:'column-reverse',width:'100%' }}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSendClick} id='mailSendBtn'>
              Send
            </Button>
            <span class="material-icons" id='deleteCompose'>delete</span>   
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ComposeEmail;
