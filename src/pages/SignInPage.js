import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './SignInPage.css';
import { login } from '../store/authSlice';

function SignInPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const API_URL = 'http://localhost:5164';

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Enter your email'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Enter your password'),
        }),
        onSubmit: async (values) => {
            try {
                // console.log('Submitting values:', values);
                const response = await axios.post(`${API_URL}/api/auth/login`, {
                    name: '',
                    email: values.email,
                    password: values.password,
                });

                console.log('Login successful:', response.data);
                const token = response.data.token;

                // Store token in Redux and localStorage
                dispatch(login(token));
                localStorage.setItem('token', token);

                navigate('/ChatPage');
            } catch (error) {
                console.error('Login failed:', error.response ? error.response.data : error.message);
                if (error.response && error.response.data) {
                    alert(error.response.data);
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            }
        },
    });

    return (
        <div className="signin-container">
            <div className="signin-card">
                <h2 className="signin-title">Login</h2>
                <form onSubmit={formik.handleSubmit}>
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

                    <button type="submit" className="login-btn">Login</button>
                </form>

                <p className="register-link">
                    Don't have an account? <span onClick={() => navigate('/SignUpPage')} className="link">Register</span>
                </p>
            </div>
        </div>
    );
}

export default SignInPage;