import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";


function Details() {
  const params = useParams();
  const id = localStorage.getItem("userId");
  const [api, setapi] = React.useState([]);
  const [a, seta] = React.useState("Add");
  const [btn, setBtn] = React.useState(true);

  React.useEffect(() => {
    check();
  }, []);
  const check = () => {
    axios
      .get(
        `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=cody2W0ce3f6xz9OFvGC3EGHnh2q8xWF`
      )

      .then(function (response) {
        const fin = response.data.results.books.find(
          (e) => e.rank == params.id
        );
        setapi(fin);
      });
    axios
      .get(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`)
      .then((res) => {
        let i = res.data.liked.find((e) => e.book.rank == api.rank);
        if (i) {
          setBtn(false);
        }
        console.log(i);
      });
  };
  const addBookToFevorit = () => {
    let array = [];
    
    axios
      .get(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`)
      .then((res) => {
        console.log(res.data.liked);
        if (res.data.liked == undefined) {
          array.push({ book: api });
          // console.log(api);
        } else {
          array = res.data.liked;
          array.push({ book: api });
        }

        axios
          .put(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`, {
            liked: array,
          })
          .then((_) => {
            check();
            setBtn(false);
          });
      });
  };

  return (
    <>
      {api ? (
        <div>
          <Nav/>
          <section className="relative bg-60 h-screen mt-[20px]">
            <div className=" m-auto flex justify-center">
              <div className="flex max-sm:flex-col-reverse items-center max-sm:justify-center">
                <div className="w-[50vw] flex flex-col text-xl font-light font-serif">
                  <h1 className="text-4xl font-bold text-gray-700 my-5 max-sm:text-2xl">
                    {api.title}
                  </h1>
                  <span className="font-extrabold text-gray-700">
                    by <span className="opacity-100 text-gray-700">{api.author}</span>{" "}
                    (Author)
                  </span>
                  <p className="w-[40vw] text-[#777] mt-[10px]">{api.description}</p>
                  {/* <div className='h-96 w-96 -z-10 -bottom-40 -left-32 rounded-full absolute bg-60'></div> */}

                  <br />
                  <div className="flex  max-sm:flex-col h-20 items-center">
                    <h1
                      className="
                      text-xl text-40  me-7 text-gray-700"
                    >
                      Sites to buy the book:{" "}
                    </h1>
                    <div className="flex ">
                      <button
                        onClick={() => {
                          window.open(api.buy_links[0].url, "_blank");
                        }}
                        className="rounded-full 
                      hover:scale-105 bg-40 w-16 h-16 max-sm:w-12  max-sm:h-12  "
                      >
                        <img
                          className="w-full rounded-full  "
                          src="data:image/jpeg;base64,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jC44bnngdWVYJndQaAa6dzukfTbjcnj6/ADyB+hV4tnCKtepGoqss1pWT+hjj4UouGRWurs/Wuc1zXMcWuachwOCD2hSqg2jasoYhEy7OlYBgdPG2QjzIyfMqKIvXtc4DcXzVF8vzdy7XKaeIHIi4MZ/S0AHzWnREAREQgREQBERAbiy6jr7Thkb+mpx+pkPAfJPV7u5Ta16stlfhsknosx+JNwHk7kqxReXjOEYbFdJq0u1fs7cPj61DRO67GW5VWW112XT0UDy747W4J8xxWpqNEWqT80+ph7mv3h9IKglFcq6gx6HVyxAfFa71fYeC3lNre6RYE8dPOO9pafaPwXlvhfEcP7irdfW34eh3LG4Or72nZ+u82EugW/qbi4fLhz7ivA6BqM8LjER3wkfesiHXzMDprc8Hr3JQfeAvca8oMcaOrB/l/FYZ+OQ0tf7TLLwyXpmC3QM/wAa4xjwhP4rJi0DAPz1wld3MjDfflfT9e0v6ugqD8pzR7srCqNeVTsinoYY+97y73YWS9uVPl9pH7Mh8/E3lNo2zw4L45ZyP8yQ+4YWbLLZrDHl3otJw5MaA53kOJVfVmprxWAh9Y6Np+LCNz6Rx+lalxLnFziS48yTklbY8GxNb+1WbXYv90/BrfEaNP3FPv8AXmTC8a3kkDorVEYhy6eQZd5N5Dz9ijdDBLdrtDDLI576iT+8e52TjmTnwBWEi9ihgqWGpuNBWb57s8+rialaalUd12El1neY6+eOio3A0lN1t5Pdy4dwHD2qNIi24bDww9JU4bIwrVZVpucuYREW81BERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAf/2Q=="
                          alt=""
                        />
                      </button>
                      <button
                        onClick={() => {
                          window.open(api.buy_links[1].url, "_blank");
                        }}
                        className="rounded-full 
                      bg-40  hover:scale-105 mx-5 w-16 h-16  max-sm:h-12  max-sm:w-12"
                      >
                        <img
                          className="w-full rounded-full  "
                          src="data:image/jpeg;base64,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"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>

                  <br />

                  <button
                    onClick={ addBookToFevorit}
                    className={
                      "bg-40 rounded w-max  text-40 max-sm:my-3 flex justify-center items-center gap-3 text-4xl border-40 bg-transparent border-2 "
                    }
                  >
                    <span className="text-xl  px-3 text-gray-700">{a} Favorite</span>
                    <span
                      className={
                        btn
                          ? "text-gray-50  w-max p-1 rounded"
                          : " text-gray-50 w-max p-1 rounded"
                      }
                      style={{ color: !btn ? "gold" : "#0d2f53" }}
                    >
                      {!btn ? (
                         <i class="fa-solid fa-heart"></i>
                      ) : (
                        <i class="fa-regular fa-heart"></i>
                      )}
                    </span>
                  </button>
                </div>

                <img
                  className="w-[30%]  max-sm:w-[50%] shadow-lg shadow-40"
                  src={api.book_image}
                  style={{ transform: 'scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)' }}
                  alt=""
                />
              </div>
            </div>
          </section>
          <br />
          <br />
          <br />
        </div>
      ) : ""}
      <Footer/>
    </>
  );
}

export default Details;
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Nav from '../Components/Nav';
// import axios from 'axios';

// function Details() {
//     const [books, setBooks] = useState([]); 
//     const params = useParams();
//     // console.log(param.id)
//     const [a, seta] = React.useState("Add");
//     const id = localStorage.getItem("userId");
//     const [btn , setBtn] = useState(false)

//     useEffect(() => {
//         check();
//     }, []);

//     const check = () => {
//         axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=cody2W0ce3f6xz9OFvGC3EGHnh2q8xWF`)
//             .then((res) => {
//               const fin = response.data.results.books.find(
//                 (e) => e.rank == params.id
//               );
//               setBooks(fin);
//             })
//             .catch((error) => {
//                 console.error("Error fetching data: ", error);
//                 setBooks(null); // في حالة وجود خطأ، تعيين القيمة إلى null
//             });
//             axios
//             .get(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`)
//             .then((res) => {
           
//               let i = res.data.liked.find((e) => e.book.rank == books.rank);
//               if (i) {
//                 setBtn(true);
//               }
//               console.log(i);
//             });

//     }

  

//     const addFevoritBook =()=> {
//       let theArray = [];
//       axios.get(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`)
//       .then((res)=> {
//         console.log(res.data.liked);

//         if(res.data.liked == undefined){
//           theArray.push({element: books})
//         }
//         else {
//           theArray = res.data.liked
//           theArray.push({element: books}) 
//         }
//       })

//       axios.put(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`,{
//         liked: theArray,
//       }).then((res)=> {
//         check()
//         setBtn(true)
        
//       })
      

//     }

//     return (
//         <div className='bg-[#f0e9e4] h-[100vh]'>
//             <Nav />
//             {books ? ( // تحقق مما إذا كانت books موجودة
//                 <div className="py-16">
//                     <div className="container m-auto px-6">
//                         <div className="lg:flex justify-between items-center">
//                             <div className="lg:w-6/12 lg:p-0 p-7 text-gray-500">
//                                 <h1 className="text-4xl font-bold text-gray-700 leading-tight mb-5 capitalize">
//                                     {books.title}
//                                 </h1>
//                                 <p className="text-xl font-bold mb-[10px]">
//                                     {books.author}
//                                 </p>
//                                 <p className="text-xl">
//                                     {books.description}
//                                 </p>
//                                 <div className="py-3 flex items-center">
//                                   <p className='mr-[20px]'>Sites to buy the book:</p>
//                                   <div className='w-[22%] flex justify-between'>
//                                     <button
//                                        onClick={() => {
//                                         window.open(books.buy_links[1].url, "_blank");
//                                       }}
//                                         className="rounded-full 
//                                          hover:scale-105 bg-40 w-16 h-16 max-sm:w-12  max-sm:h-12  ">
//                                         <img className='w-full rounded-full' src="data:image/jpeg;base64,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jC44bnngdWVYJndQaAa6dzukfTbjcnj6/ADyB+hV4tnCKtepGoqss1pWT+hjj4UouGRWurs/Wuc1zXMcWuachwOCD2hSqg2jasoYhEy7OlYBgdPG2QjzIyfMqKIvXtc4DcXzVF8vzdy7XKaeIHIi4MZ/S0AHzWnREAREQgREQBERAbiy6jr7Thkb+mpx+pkPAfJPV7u5Ta16stlfhsknosx+JNwHk7kqxReXjOEYbFdJq0u1fs7cPj61DRO67GW5VWW112XT0UDy747W4J8xxWpqNEWqT80+ph7mv3h9IKglFcq6gx6HVyxAfFa71fYeC3lNre6RYE8dPOO9pafaPwXlvhfEcP7irdfW34eh3LG4Or72nZ+u82EugW/qbi4fLhz7ivA6BqM8LjER3wkfesiHXzMDprc8Hr3JQfeAvca8oMcaOrB/l/FYZ+OQ0tf7TLLwyXpmC3QM/wAa4xjwhP4rJi0DAPz1wld3MjDfflfT9e0v6ugqD8pzR7srCqNeVTsinoYY+97y73YWS9uVPl9pH7Mh8/E3lNo2zw4L45ZyP8yQ+4YWbLLZrDHl3otJw5MaA53kOJVfVmprxWAh9Y6Np+LCNz6Rx+lalxLnFziS48yTklbY8GxNb+1WbXYv90/BrfEaNP3FPv8AXmTC8a3kkDorVEYhy6eQZd5N5Dz9ijdDBLdrtDDLI576iT+8e52TjmTnwBWEi9ihgqWGpuNBWb57s8+rialaalUd12El1neY6+eOio3A0lN1t5Pdy4dwHD2qNIi24bDww9JU4bIwrVZVpucuYREW81BERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAf/2Q==" alt="" />
//                                     </button>
//                                     <button
//                                            onClick={() => {
//                                             window.open(books.buy_links[1].url, "_blank");
//                                           }}
//                                         className="rounded-full 
//                                          hover:scale-105 bg-40 w-16 h-16 max-sm:w-12  max-sm:h-12  ">
//                                         <img className='w-full rounded-full' src="data:image/jpeg;base64,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" alt="" />
//                                     </button>
//                                     </div>
//                                 </div>
//                                 <button onClick={addFevoritBook} className='border-2 border-gray-500 p-2 rounded-[8px]'><span className='mr-[10px]'>{a}Add Favorite</span>
                            
//                                        <span
//                             className={
//                               !btn
//                                 ? "text-gray-50  w-max p-1 rounded"
//                                 : " text-gray-50 w-max p-1 rounded"
//                             }
//                             style={{ color: !btn ? "gold" : "#0d2f53" }}
//                           >
//                             {btn ? (
//                               <i class="fa-regular fa-heart"></i>
//                             ) : (
//                               <i class="fa-solid fa-heart"></i>
//                             )}
//                           </span>
//                               {/* </span> */}
//                               {/* heart */}


//                               {/* end */}
//                               </button>
//                             </div>
//                             <div className="lg:w-5/12 order-2">
//                                 <img
//                                     src={books.book_image}
//                                     alt="Example"
//                                     className="rounded"
//                                     style={{ transform: 'scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)' }}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <p>...Loading</p> // أو أي محتوى بديل تريده في حالة عدم وجود تفاصيل
//             )}
//         </div>
//     );
// }

// export default Details;


