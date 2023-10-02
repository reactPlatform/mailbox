import React from 'react';
import { useState } from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/slices/authSlice';
import {auth} from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import {
  InputGroup,
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
} from "react-bootstrap";

export default function SignUp() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmpass,setConfirmPass] = useState('');
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleSignup = async (e) => {
    if(password == confirmpass){
      e.preventDefault();
      await createUserWithEmailAndPassword(auth,email,password).then((data)=>{
        dispatch(authActions.setUser(data.user));
        console.log('User signed up successfully!');
        history('/home');
      }).catch((err) => console.log(err));
    }
    else{
      alert('Passwords Not Matched');
    }
    
    
  }
  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={10} lg={8} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <h2 className="fw-bold mb-2 text-uppercase">SignUp</h2>
                <Form>
                  <Row className="mb-3">
                    <Form.Group
                      className="mb-3"
                      controlId="formUsername"
                    >
                      <InputGroup>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicPassword"
                    >
                      <Form.Control type="password" 
                      placeholder="Password" 
                      required 
                      value={password}
                      onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group
                      
                      className="mb-3"
                      controlId="formBasicConfirmPassword"
                    >
                      <Form.Control type="password" 
                      placeholder="Confirm Password"
                      required
                      value={confirmpass}
                      onChange={e => setConfirmPass(e.target.value)} 
                      />
                    </Form.Group>
                  </Row>
                  <div className="d-grid">
                    <Button variant="primary" type="submit" onClick={(e)=>handleSignup(e)}>
                      Sign Up
                    </Button>
                  </div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0  text-center">
                    Have an account?{" "}
                    <a href="/login" className="text-primary fw-bold">
                      Login
                    </a>
                  </p> 
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}