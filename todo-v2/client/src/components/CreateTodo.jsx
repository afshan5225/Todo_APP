import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateTodo = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [assignee, setAssignee] = useState(""); // 👈 new
  const [users, setUsers] = useState([]); // 👈 list of users

  // Fetch users to populate dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/auth/users`, {
          withCredentials: true,
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        toast.error("❌ Failed to load users!");
      }
    };

    fetchUsers();
  }, [apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title,
        text,
        assigneeId: assignee || null, // send null if unassigned
      };

      const res = await axios.post(`${apiUrl}/api/todo/create`, payload, {
        withCredentials: true,
      });

      console.log("Todo created:", res.data);
      toast.success("✅ Todo created!");
      setTitle("");
      setText("");
      setAssignee("");
    } catch (err) {
      console.error("Error creating todo:", err);
      toast.error(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "❌ Something went wrong!"
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create Todo</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="Enter title"
          className="p-2 border border-gray-400 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setText((prev) => prev + "\n• ");
            }
          }}
          placeholder="Type tasks... Use Enter to add bullet points"
          className="p-2 border border-gray-400 rounded min-h-[150px]"
        />

        {/* 👇 Assignee Dropdown */}
        <select
          className="p-2 border border-gray-400 rounded"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        >
          <option value="">-- Select assignee (optional) --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username} ({user.email})
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-purple-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
