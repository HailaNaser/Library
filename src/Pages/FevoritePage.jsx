import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Favorite() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    check();
  }, []);

  const check = () => {
    axios
      .get(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`)
      .then((response) => {
        setData(response.data.liked);
        setIsLoading(true);
      });
  };

  const deleteBook = (e) => {
    let array = [...data];
    let index = array.findIndex((i) => i.book.rank === e.book.rank);
    if (index !== -1) {
      array.splice(index, 1);

      axios
        .put(`https://6657370d9f970b3b36c86882.mockapi.io/API/${id}`, {
          liked: array,
        })
        .then(() => {
          check();
        });
    }
  };

  return (
    <>
    <Nav/>
      <div className="max-w-4xl mx-auto px-4  bg-[#eee]">
        <ul className="flex flex-wrap justify-between max-md:grid-cols-1 max-sm:gap-2 mt-12 divide-y">
          {isLoading &&
            data !== undefined &&
            data.map((item, idx) => (
              <li key={idx} className="py-5 flex items-start justify-between">
                <div className="flex gap-3">
                    {/* <div> */}
                  <img
                    src={item.book.book_image}
                    alt={item.book.title}
                    className="flex-none w-[50%] h-[250px]"
                  />
                  <div>
                    <span className="block text-sm text-gray-700 font-semibold">
                      {item.book.title}
                    </span>
                    <span className="block text-sm text-gray-600">
                      {item.book.author}
                    </span>
                    {/* </div> */}
                    <div>
                    <button
                      onClick={() => {
                        navigate(`/details/${item.book.rank}`);
                      }}
                      className=" bg-gradient-to-r from-[#fdcb75] to-[#b6a4cc] w-40 mt-7 text-white cursor-pointer px-2 py-1 rounded"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => {
                        deleteBook(item);
                      }}
                      className="bg-red-400 w-40 mt-3 px-2 py-1  text-white rounded flex justify-center items-center gap-1 border-red bg-transparent border-2"
                    >
                      <span className="px-1">Delete Favorite</span>
                    </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      {/* <Footer/> */}
    </>
  );
}

export default Favorite;
