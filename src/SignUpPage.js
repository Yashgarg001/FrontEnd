import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Import Axios
import './SignUpPage.css';

function SignUpPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5164/api/auth/signup', { // Replace '/api/signup' with your API endpoint
          name: values.name,
          email: values.email,
          password: values.password
        });
        console.log('Signup successful:', response.data);
        // Handle successful signup, e.g., redirect to login or show success message
        navigate('/SignInPage'); // Redirect to login after successful signup
      } catch (error) {
        console.error('Signup failed:', error.response ? error.response.data : error.message);
        // Handle signup error, e.g., show error message to the user
        // You can access error details from error.response.data if the server returns a specific error message.
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message); // show error message to user
        }
      }
    },
  });

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Register</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />

            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />

            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />

            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>

          {/* Signup Button */}
          <button type="submit" className="signup-btn">Register</button>
        </form>

        {/* Login Link */}
        <p className="login-link">
          Already have an account? <span onClick={() => navigate('/SignInPage')} className="link">Login</span>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;