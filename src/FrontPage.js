import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './FrontPage.css';

const FrontPage = () => {
  const initialValues = { email: '', password: '' };
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
  });

  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <span className="chat-box">Chat Box</span>
        <div>
          <button className="sign-in">Sign In</button>
          <button className="sign-up">Sign Up</button>
        </div>
      </nav>

      {/* Login Form Centered */}
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
              <div className="form-group">
                <label>Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <button type="submit" className="login-button">Login</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;