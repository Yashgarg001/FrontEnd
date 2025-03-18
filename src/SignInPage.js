import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Import Axios
import './SignInPage.css';

function SignInPage() {
    const navigate = useNavigate();

    // Formik setup with validation schema
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                console.log('Submitting values:', values); // Log the values being sent
                const response = await axios.post('http://localhost:5164/api/auth/login', { // Replace with your login API endpoint
                    name: '',
                    email: values.email,
                    password: values.password,
                });

                // Handle successful login
                console.log('Login successful:', response.data);
                const token = response.data.token; // Extract the token from the response
                // Store the token (e.g., in local storage or cookies)
                localStorage.setItem('token', token); // Store token in local storage
                navigate('/ChatPage'); // Redirect to a dashboard or protected route
            } catch (error) {
                // Handle login error
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

                    {/* Login Button */}
                    <button type="submit" className="login-btn">Login</button>
                </form>

                {/* Register Link */}
                <p className="register-link">
                    Don't have an account? <span onClick={() => navigate('/SignUpPage')} className="link">Register</span>
                </p>
            </div>
        </div>
    );
}

export default SignInPage;