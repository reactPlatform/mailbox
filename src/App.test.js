import {render,screen, fireEvent, waitFor} from '@testing-library/react';
import SignUp from './components/registerForm';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {auth} from './firebaseConfig';

import { Provider } from 'react-redux';
import store from './redux/store';
test('SignUp test',() => {
  render(
    <Provider store={store}>
      <SignUp />
    </Provider>
  
  );
  const linkEle = screen.queryByText('SignUp');
  expect(linkEle).toBeInTheDocument();
  //userEvent.click(buttonEle);
});

jest.mock('./firebaseConfig', () => ({
  auth: {
    createUserWithEmailAndPassword: jest.fn(),
  },
}));

test('allows user to sign up', async () => {
  render(
    <Provider store={store}>
      <SignUp />
    </Provider>
  
  );
  // Fill out the form and submit
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'kavi123@gmail.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'KAVI123@sri' } });
  fireEvent.click(screen.getByText('Sign Up'));

  // Wait for the sign-up process to complete
  await waitFor(() => {
    expect(require('./firebaseConfig').auth.createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  // Ensure that the user signed up successfully
  expect(console.log).toHaveBeenCalledWith('User signed up successfully!');
});





