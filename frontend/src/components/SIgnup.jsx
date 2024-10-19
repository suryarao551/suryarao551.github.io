import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import womenpic from '../assets/protection.png';

export default function Signup(){
  const [formData, setFormData] = useState({ username: '', email: '', password: '', phone:''});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, phone } = formData;
    console.log('User signed up:', formData);

    const res=await axios.post('http://10.0.14.8:3000/api/signup',{
      username:username,
      email:email,
      phone:phone,
      password:password
    });

    if(res.status===200){
      navigate('/login');
    }

  };
  
  return (
    <div className="signup-card mb-3 mt-3 text-dark shadow p-4">
      <div className="profile-image text-center ">
          <img src={womenpic} alt="profile" className="img-fluid" style={{ width: '250px' }} />
      </div>
      <div className="form-container col-12 col-md-6 mx-auto mt-4">
        <div className="mb-4 w-100 fs-2 fw-bolder font-san-serif">Sign up</div>      
          <form onSubmit={handleSubmit} className='signup-form'>
            <input className="form-control" type="text" name="username" placeholder="Username" onChange={handleChange} required/>
            <input className="form-control" type="email" name="email" placeholder="Email" onChange={handleChange} required/>
            <input className="form-control" type="password" name="password" placeholder="Password" onChange={handleChange} required/>
            <input className="form-control" type="phone" name="phone" placeholder="Phone Number" onChange={handleChange} required/>
            <button type="submit" className="btn btn-primary shadow w-100">
                Sign-up
            </button>
            <p>Already Registered? <a href="" onClick={()=>{
              navigate('/login')
            }}>Log In</a></p>
          </form>
        <div/>
      </div>
    </div>
  );
};

