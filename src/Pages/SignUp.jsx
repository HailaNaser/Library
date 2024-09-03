
import { useState , useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import img from '../assets/sign.png'
import axios from 'axios';
// /!S+@\S+\.\S+/
// /!S+@\S+\.\S+/
 function SignUp() {
    const [data , setData] = useState([]);
    const  [error , setError] = useState({})
    const navegate = useNavigate()


    const handleClick =()=> {
        
            if(data.name == undefined || data.email == undefined || data.pass == undefined){
                setError({...error , all: 'must be feilds not empty'})
            }
            else if (data.name.length < 3){
                setError({...error , 'name': 'must be more 3 character' , all :''})
            }
            else if(!data.email.match( /^\S+@\S+\.\S+$/)){
                setError({...error , email: 'Please enter vaild an email' , name: '' ,all : '' })
            }
            else if (data.pass < 5){
                setError({...error , name: '' , email: '' , pass: 'Password must be at least 6 ' ,all : ''})
            }
                
            
        
        else {
            axios.post('https://6657370d9f970b3b36c86882.mockapi.io/API', {
                Name: data.name,
                Email: data.email,
                Pass: data.pass,
                // userId :
                
            }).then((res)=> {
                
                navegate('/Login')
                console.log(data)
            })
            .catch((error) => {
                // إدارة الخطأ، على سبيل المثال، إظهار تنبيه أو تسجيل الخطأ
                console.error('حدث خطأ:', error);
            });
        }

       
    }

  return (
    <>
    <div>
    <div className="hero bg-[#f0e9e4] min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse">
    <img className='w-full h-full' src={img} alt="" />
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          {/* input */}
          <input type="text" placeholder="Name" onChange={(e)=> setData({...data , name : e.target.value})} className="input input-bordered" required />
          <span>{error.name}</span>
        </div>
        {/* end */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          {/* input */}
          <input type="email" placeholder="email"
           onChange={(e)=> setData({...data , email: e.target.value})} 
           className="input input-bordered" required />
           <span className='text-[#fa3939] text-[14px] mt-[2px]'>{error.email}</span>
        </div>
        {/* //////end */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          {/* input */}
          <input type="password" placeholder="password" 
          onChange={(e)=> setData({...data , pass: e.target.value})} className="input input-bordered" required />
          <span className='text-[#fa3939] text-[14px] mt-[2px]'>{error.pass}</span>
          {/* <label className="label"> */}
            {/* <a href="#" className="label-text-alt link link-hover">Forgot password?</a> */}
            <span className='text-[#fa3939] text-[14px] mt-[2px]'>{error.all}</span>
          {/* </label> */}
          {/* <label className="label"> */}
              <Link to='/Login'>
              <p className="text-[#575050] text-[14px] py-2">Already ou have acount? Login</p>
              </Link>
            {/* </label> */}
        </div>
        {/* <div className="form-control mt-6"> */}
            {/* button */}
          <button className="btn bg-gradient-to-r from-[#fdcb75] to-[#b6a4cc]" onClick={handleClick}>Login</button>
        {/* </div> */}
      </div>
    </div>
  </div>
</div>
    </div>
    </>
  )
}

export default SignUp