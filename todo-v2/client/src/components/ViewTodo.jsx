import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const ViewTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/todo/byid/${id}`, {
          withCredentials: true,
        });

        if (!data.success) {
          throw new Error("Failed to fetch todo");
        }

        setTodo(data.todo);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch todo");
      }
    };

    fetchTodo();
  }, [id, apiUrl]);

  if (!todo) return <p>Loading…</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">📄 View Todo</h2>

      <div className="mb-4">
        <strong>Title:</strong>
        <p className="p-2 border border-gray-300 rounded bg-gray-100">{todo.title}</p>
      </div>

      <div className="mb-4">
        <strong>Text:</strong>
        <p className="p-2 border border-gray-300 rounded bg-gray-100 whitespace-pre-wrap">
          {todo.description}
        </p>
      </div>

     

      

      <button
        onClick={() => navigate("/layout/dashboard")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ViewTodo;
