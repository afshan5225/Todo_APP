import express from 'express';
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodosCreatedByMe,
  getTodosAssignedToMe,
  updateTodo,
  getTodoById
} from '../controllers/todoController.js';
import auth from '../middlewares/auth.js';

const todoRouter = express.Router();


todoRouter.get("/all", getAllTodos);


todoRouter.get("/created", auth, getTodosCreatedByMe);


todoRouter.get("/assigned", auth, getTodosAssignedToMe);


todoRouter.get("/byid/:id", auth, getTodoById);


todoRouter.post("/create", auth, createTodo);


todoRouter.put("/:id", auth, updateTodo);


todoRouter.delete("/:id", auth, deleteTodo);

export default todoRouter;
