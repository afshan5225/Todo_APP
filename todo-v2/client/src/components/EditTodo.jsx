import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/todo/byid/${id}`,
          { withCredentials: true }
        );

        if (!data.success) {
          throw new Error("Failed to fetch todo");
        }

        setTitle(data.todo.title);
        setDescription(data.todo.description); // 👈 backend sends `description`
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch todo");
      }
    };

    fetchTodo();
  }, [id, apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${apiUrl}/api/todo/${id}`,
        { title, text: description }, // 👈 send `text` in body, backend maps it to `description`
        { withCredentials: true }
      );

      toast.success("✅ Todo updated!");
      navigate("/layout/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update todo");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="Enter title"
          className="p-2 border border-gray-400 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setDescription((prev) => prev + "\n• ");
            }
          }}
          placeholder="Type tasks... Use Enter to add bullet points"
          className="p-2 border border-gray-400 rounded min-h-[150px]"
        />

        <button
          type="submit"
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
        >
          Save changes
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
