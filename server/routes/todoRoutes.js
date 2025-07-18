import express from 'express';
import { createTodo, deleteTodo, getAllTodos, getTodos, updateTodo,getTodoById  } from '../controllers/todoController.js';
import auth from '../middlewares/auth.js';



const todoRouter = express.Router();


todoRouter.get("/all",getAllTodos);
todoRouter.get("/fetch",auth,getTodos);
todoRouter.get("/byid/:id",auth,getTodoById )
todoRouter.post("/create",auth,createTodo);
todoRouter.put("/:id",auth,updateTodo);
todoRouter.delete("/:id",auth,deleteTodo);


export default todoRouter;



