import React from "react";
import { useAppContext } from "../context/AppContext";

const TodoCards = () => {
  const { todo } = useAppContext();

  const completed_todo = todo.filter(t => t.completed);

  if (completed_todo.length === 0) {
    return <p className="text-center text-gray-500">No completed todos yet!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {completed_todo.map(t => (
        <div
          key={t._id}
          className="border border-gray-300 shadow rounded p-4 bg-white hover:shadow-md transition"
        >
          <h4 className="font-bold text-lg mb-2">{t.title}</h4>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{t.text}</p>
        </div>
      ))}
    </div>
  );
};

export default TodoCards;
