import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const [createdTodos, setCreatedTodos] = useState([]);
  const [assignedTodos, setAssignedTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggeduser, setLoggedUser] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchTodos = async () => {
    try {
      const [createdRes, assignedRes, thisloggeduser] = await Promise.all([
        axios.get(`${apiUrl}/api/todo/created`, { withCredentials: true }),
        axios.get(`${apiUrl}/api/todo/assigned`, { withCredentials: true }),
        axios.get(`${apiUrl}/api/auth/me`, { withCredentials: true }),
      ]);

      console.log("Logged in user:", thisloggeduser.data.user.username);

      setCreatedTodos(createdRes.data.todos);
      setAssignedTodos(assignedRes.data.todos);
      setLoggedUser(thisloggeduser.data.user.username);
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
      await axios.delete(`${apiUrl}/api/todo/${todo._id}`, {
        withCredentials: true,
      });
      toast.success("🗑️ Todo deleted!");
      fetchTodos();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete todo");
    }
  };

  if (loading) return <p>Loading…</p>;

  const renderTable = (todos, title, allowDelete, buttonLabel) => (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {todos.length === 0 ? (
        <p>No todos here.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Completed</th>
              <th className="border p-2">Actions</th>
              {allowDelete && <th className="border p-2">Delete</th>}
              {title === "📝 Todos Created By Me" && (
                <th className="border p-2">Assigned to</th>
              )}
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo._id}>
                <td className="border p-2">{todo.title}</td>
                <td className="border p-2">
                  {new Date(todo.createdAt).toLocaleString()}
                </td>

                
                <td className="border px-9">
                  {loggeduser === todo.creator.username ? (
                    <span
                      className={`inline-block px-2 py-1 rounded text-white ${
                        todo.completed ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    >
                      {todo.completed ? "✅ Completed" : "⏳ Pending"}
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="bg-gray-700 px-2 py-1 rounded hover:bg-green-400"
                      onClick={() => toggleCompletion(todo)}
                    >
                      {todo.completed ? <FaCheck /> : <FaTimes />}
                    </button>
                  )}
                </td>

                
                <td className="border p-2">
                  <button
                    onClick={() =>
                      navigate(
                        buttonLabel === "Edit"
                          ? `/layout/edittodo/${todo._id}`
                          : `/layout/viewtodo/${todo._id}`
                      )
                    }
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    {buttonLabel}
                  </button>
                </td>

               
                {allowDelete && (
                  <td className="border px-9">
                    <button
                      type="button"
                      className="bg-gray-700 px-2 py-1 rounded hover:bg-red-500"
                      onClick={() => deletionHandler(todo)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                )}

                
                {title === "📝 Todos Created By Me" && (
                  <td className="border p-2">
                    {todo.assignee?.username || "Unassigned"}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📋 Dashboard</h1>
      {renderTable(createdTodos, "📝 Todos Created By Me", true, "Edit")}
      {renderTable(assignedTodos, "📌 Todos Assigned To Me", false, "View")}
    </div>
  );
};

export default Dashboard;
