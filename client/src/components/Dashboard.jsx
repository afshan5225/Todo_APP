import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/todo/fetch`, { withCredentials: true });
      setTodos(data.todos);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleCompletion = async (todo) => {
    try {
      await axios.put(
        `${apiUrl}/api/todo/${todo._id}`,
        { completed: !todo.completed },
        { withCredentials: true }
      );
      toast.success("✅ Todo updated!");
      fetchTodos();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update todo");
    }
  };

  const deletionHandler = async (todo) => {
    try {
      await axios.delete(
        `${apiUrl}/api/todo/${todo._id}`,
        { withCredentials: true }
      );
      toast.success("🗑️ Todo deleted!");
      fetchTodos();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete todo");
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Your Todos</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Completed</th>
            <th className="border p-2">Actions</th>
            <th className='border p-2'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id}>
              <td className="border p-2">{todo.title}</td>
              <td className="border p-2">{new Date(todo.createdAt).toLocaleString()}</td>
              <td className="border px-9">
                <button
                  type='button'
                  className='bg-gray-700 px-2 py-1 rounded hover:bg-green-400'
                  onClick={() => toggleCompletion(todo)}
                >
                  {todo.completed ? <FaCheck /> : <FaTimes />}
                </button>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => navigate(`/layout/edittodo/${todo._id}`)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
              <td className='border px-9'>
                <button
                  type='button'
                  className='bg-gray-700 px-2 py-1 rounded hover:bg-red-500'
                  onClick={() => deletionHandler(todo)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
