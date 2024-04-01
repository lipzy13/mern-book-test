import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://mern-book-test-backend.vercel.app/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold my-8">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-4xl text-green-500" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-300 rounded-md">No</th>
              <th className="border border-slate-300 rounded-md">Title</th>
              <th className="border border-slate-300 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-300 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-300 rounded-md ">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-300 text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-300 text-center">
                  {book.title}
                </td>
                <td className="border border-slate-300 max-md:hidden text-center">
                  {book.author}
                </td>
                <td className="border border-slate-300 max-md:hidden text-center">
                  {book.publishYear}
                </td>
                <td className="border border-slate-300 text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link
                      to={`books/details/${book._id}`}
                      className="text-blue-500"
                    >
                      <BsInfoCircle className="text-2xl" />
                    </Link>
                    <Link
                      to={`books/edit/${book._id}`}
                      className="text-blue-500"
                    >
                      <AiOutlineEdit className="text-2xl" />
                    </Link>
                    <Link
                      to={"/books/delete/" + book._id}
                      className="text-red-500"
                    >
                      <MdOutlineDelete className="text-2xl" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
