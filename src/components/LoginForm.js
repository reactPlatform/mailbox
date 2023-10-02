import React from 'react';
import { useState } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
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
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleLogin = async (e) => {
   
      e.preventDefault();
      await signInWithEmailAndPassword(auth,email,password).then((data)=>{
        dispatch(authActions.getUser(data.user));
        console.log('User signed in successfully!');
        history('/home');
      }).catch((err) => alert(err));
  }
  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={10} lg={8} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
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

                    
                  </Row>
                  <div className="d-grid">
                    <Button variant="primary" type="submit" onClick={(e)=>handleLogin(e)}>
                      Login
                    </Button>
                  </div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0  text-center">
                    Don't have an account?{" "}
                    <a href="/" className="text-primary fw-bold">
                      Sign Up
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