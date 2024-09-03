import axios from 'axios';
import React from 'react';
import { useState , useEffect } from 'react';
import { Link , Navigate, useNavigate } from 'react-router-dom';
import img from '../assets/sign.png'

 function Login() {
    const [dataApi , setDataApi] = useState([])
    const [error , setError] = useState('')
    const navegate = useNavigate();



    const check = () => {
      let array = []
        axios.get('https://6657370d9f970b3b36c86882.mockapi.io/API').then((res) => {
          let dataUser = res.data;
          const result = dataUser.find((el) =>
            {if(el.Email == dataApi.Email) {
              array.push(el)
              console.log(el)
              console.log(array)
            }} );

          if (dataApi.Email == undefined || dataApi.Pass == undefined) {
            setError("Email and password cannot be empty");
          
          }

           else if (array.length == 0) {
            setError("Email is not found");
          } else if (array[0].Email !== dataApi.Email) {
            setError("email is incorrect");
          } else if (array[0].Pass !== dataApi.Pass) {
            setError("password is incorrect");
          }  
          else {
            localStorage.setItem('userId', array[0].id);
            navegate('/');
          }
        }).catch(error => {
          console.error("There was an error!", error);
        });
      };
      



  return (
    <div className='bg-[#f0e9e4]'>
        <div className="hero  min-h-screen bg-[#f0e9e4]">
    <div className="hero-content flex-col lg:flex-row-reverse">
          <img className='w-full h-full bg-[#f0e9e4]' src={img} alt="" />
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            {/* input */}
            <input type="email" placeholder="email"  onChange={(e)=> setDataApi({...dataApi , Email: e.target.value})} className="input input-bordered" required />
            <span>{error}</span>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text" >Password</span>
            </label>
            
            {/* input */}
            <input type="password" placeholder="password"  onChange={(e)=> setDataApi({...dataApi , Pass: e.target.value})} className="input input-bordered" required />
            <span>{error}</span>
            <Link to='/SignUp'>
              <p className="text-[#575050] text-[14px] py-2">Don't have acount ? SignUp</p>
              </Link>
          </div>
          {/* <div className="form-control mt-6"> */}
            {/* <Link to='/'> */}
            <button className="btn bg-gradient-to-r from-[#fdcb75] to-[#b6a4cc]" onClick={check}>Login</button>
            {/* </Link> */}
          </div>
        {/* </div> */}
      </div>
    </div>
  </div>
  </div>
  )
}

export default Login