
import React, { useState, useEffect } from 'react';
import Nav from '../Components/Nav';
import bookImage from '../assets/book.png';
import axios from 'axios';
import AboutUs from './AboutUs';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import { ToastContainer, toast } from "react-toastify";
// import { Toast } from 'primereact/toast';
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [state, setState] = useState(false);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filterElements, setFilterElements] = useState([]);
  const navigate = useNavigate();

// 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=ZNO6ALAh7xGE3h5H71lZXJGu1ipPlzDF'

  useEffect(() => {
    axios.get('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=cody2W0ce3f6xz9OFvGC3EGHnh2q8xWF')
      .then((res) => {
        setBooks(res.data.results.books);
        setFilterElements(res.data.results.books);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filterSearch = () => {
    if (search === '') {
      setBooks(filterElements);
    } else {
      const filtered = filterElements.filter(el =>
        el.title.toUpperCase().includes(search.toUpperCase())
      );
      setBooks(filtered);
    }
    setSearch('');
  };

  return (
    <div>
       <ToastContainer autoClose={1000} />
      <Nav />
      <div className='relative'>
        <section className='flex justify-between h-[70vh] bg-[#f0e9e4] mb-[40px] relative'>
          <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex">
            <div className='flex-none space-y-5 max-w-xl'>
              <h4 className="text-[20px] text-gray-700 font-bold sm:text-4xl">
                Your Ultimate Destination for Books!
              </h4>
              {/* <Link to='/SignUp' className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gradient-to-r from-[#fdcb75] to-[#b6a4cc] duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </Link> */}
              <p>
                We believe that books are a window to new worlds, which is why we provide a broad range of books across different genres and fields. Whether you're looking for the latest releases or classic literary treasures, you'll find everything you need here.
              </p>
                  {/* <Link to='/SignUp' className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gradient-to-r from-[#fdcb75] to-[#b6a4cc] duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </Link> */}
            </div>
            <div className='flex-1 hidden md:block'>
              <img src={bookImage} className="max-w-xl mr-[20px] mt-[-40px]" alt="Books" />
            </div>
          </div>
          <svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="-300 0 950 270">
            <path d="M-314,267 C105,364 400,100 812,279" fill="none" stroke="#fff" strokeWidth="120" strokeLinecap="round" />
          </svg>
        </section>

        <section>
          <div className="relative w-full max-w-xl mx-auto bg-white rounded-full mb-[20px]">
            <input
              placeholder="Search book"
              className="rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-[teal-200] focus:border-[#b6a4cc]"
              onKeyDown={(e) => (e.key === 'Enter' ? filterSearch() : null)}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              name="query"
              id="query"
            />
            <button
              type="submit"
              onClick={filterSearch}
              className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-gradient-to-r from-[#fdcb75] to-[#b6a4cc] sm:px-6 sm:text-base sm:font-medium hover:bg-[#b6a4cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b6a4cc]"
            >
              <svg className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>

          <div className='grid max-md:grid-cols-1 max-sm:gap-2 gap-6 max-sm:ps-7 m-auto p-3 grid-cols-4 w-[80%]'>
            {books.length === 0 ? (
              <div>
                <img src="" alt="No Book Found" />
                <h1>No Book Found</h1>
              </div>
            ) : (
              books.map((el) => (
                <div key={el.rank} className='w-60 max-w-sm mr-[20px] m-[auto] bg-[#f0e9e4] shadow-md rounded hover:scale-105'>
                  <img className="w-full" src={el.book_image} alt={el.title} />
                  <div className="px-2 p-1 bg-[ddd]">
                    <div className="mb-2">{el.title}</div>
                    <button onClick={()=> {
                        if(localStorage.getItem('userId') !== null){
                          navigate(`/Details/${el.rank}`)
                        }
                        else {
                          
                           toast("Please login to continue");
                         
                        }
                    }
                    
                    }>
                    <span className='text-[#7a6f88] text-[15px]'>view details</span>
                    </button>
                    
                    {/* </Link> */}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        <AboutUs/>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Nav from "./Nav";
// import imgHero from "./assets/ss.png";
// import imgHero1 from "./assets/herop.png";
// import Footer from "./Footer";
// import searchImg from "./assets/search.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Home() {
//   const [api, setapi] = useState([]);
//   const [filter, setFilter] = useState([]);
//   const [alerta, setalerta] = useState("none");
//   const [erro, seterror] = useState("");
//   const [search, setsearch] = useState("");
//   const navigate = useNavigate();
//   useEffect(() => {
//     axios
//       .get(
//         `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=cody2W0ce3f6xz9OFvGC3EGHnh2q8xWF`
//       )
//       .then((e) => {
//         setapi(e.data.results.books);
//         setFilter(e.data.results.books);
//       });
//     axios
//       .get("https://6657370d9f970b3b36c86882.mockapi.io/API")
//       .then(function (response) {
//         // setfilter(response.data.results.books)
//         // setapi(response.data.books)
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       });
//   }, []);
//   const searchFilterData = () => {
//     console.log(filter);
//     if (search === "") {
//       setapi(filter);
//     } else {
//       const filtered = filter.filter((product) =>
//         product.title.toLowerCase().includes(search.toLowerCase())
//       );
//       setapi(filtered);

//       // setapi(a);

//       setsearch("");
//     }
//     //
//   };
//   // const notify = () => toast("Wow so easy!");
//   return (
//     <section>
//       {/* <ToastContainer autoClose={1000} /> */}
//       <section className="relative bg-60 h-[70vh] max-md:h-max">
//         {/* <Nav /> */}
//         <div className=" m-auto  flex justify-center">
//           <div className="flex items-center ">
//             <div className="w-[50vw] max-sm:w-60 max-sm:ms-4 flex flex-col">
//               <h1 className="text-3xl font-bold max-sm:my-2 my-5 max-sm:text-xl ">
//                 2024 Reading Challenge
//               </h1>
//               <p className="w-[40vw] max-sm:text-sm max-sm:w-full text-xl  ">
//                 We aim to make culture and knowledge acquired from books
//                 accessible to everyone, promoting reading as a fundamental
//                 activity that enriches the lives of individuals and communities.
//               </p>{" "}
//               <br />
//               <button
//                 // onClick={() => {
//                 //   navigate("/About");
//                 // }}
//                 className="bg-20  text-gray-50 
//   max-sm:w-max font-bold text-lg w-40 p-2 rounded"
//               >
//                 Learn more{" "}
//               </button>
//               <br />
//             </div>

//             {/* <img className="w-[30%]" src={imgHero} alt="" /> */}
//           </div>{" "}
//         </div>
//       </section>

//       <section className=" ">
//         <br />
//         <div className="shadow-lg m-auto border-[1px] w-max  ">
//           <input
//             onKeyDown={(e) => (e.key === "Enter" ? searchFilterData() : null)}
//             onChange={(e) => {
//               setsearch(e.target.value);
//             }}
//             className=" p-3 w-72 focus:outline-none"
//             type="text"
//             placeholder="search book"
//           />
//           <button
//             onClick={searchFilterData}
//             className="bg-20 text-gray-50 font-bold text-lg p-3 h-full"
//           >
//             Search{" "}
//           </button>
//         </div>

//         <br />

//         <br />
//         <div>
//           {api.length == 0 ? (
//             <div className="flex-col items-center justify-center flex ">
//               {/* <img className="w-80" src={searchImg} alt="" /> */}
//               <h1>No Book Found</h1>
//             </div>
//           ) : (
//             <div
//               className="grid max-md:grid-cols-1
//             max-sm:gap-2 
//          gap-6 max-sm:ps-7 m-auto  p-3  grid-cols-4 w-[80%] "
//             >
//               {api.map((e, i) => (
//                 <button
//                   className="w-60 shadow-xl hover:scale-105"
//                   onClick={() => {
//                     if (localStorage.getItem("userId") !== null) {
//                       navigate(`/Details/${e.rank}`);
//                     } else {
//                       // toast("Please login to continue");
//                     }
//                   }}
//                   key={i}
//                 >
//                   {/* {console.log(e.title)} */}
//                   <img
//                     className="w-60 shadow-xl h-72"
//                     src={e.book_image}
//                     alt={e.title}
//                   />
//                   <h1> {e.title} </h1>

//                   <span className=" ">{e.author}</span>
//                 </button>
//               ))}
//             </div>
//           )}

//           <br />
//         </div>
//       </section>

//       {/* <Footer /> */}
//     </section>
//   );
// }
// export default Home;

