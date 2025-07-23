import Todo from "../modals/Todo.js";
import User from "../modals/User.js"; // optional

// 🔧 helper function for comparing IDs
const isSameId = (a, b) => String(a) === String(b);

// 📄 Get all todos (admin purpose maybe)
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find()
      .populate("creator", "username email")
      .populate("assignee", "username email");

    res.json({ success: true, todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Create todo
export const createTodo = async (req, res) => {
  try {
    const { title, text, assigneeId } = req.body;

    if (!title || !text) {
      return res.status(400).json({ message: "Title & text are required" });
    }

    const todo = new Todo({
      creator: req.user.userId,
      assignee: assigneeId || null,
      title,
      description: text,
    });

    await todo.save();

    res.status(201).json({ success: true, todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// 📄 Get todos *I created*
export const getTodosCreatedByMe = async (req, res) => {
  try {
    const todos = await Todo.find({ creator: req.user.userId })
      .sort({ createdAt: -1 })
      .populate("assignee", "username email")
      .populate("creator", "username email")

    res.json({ success: true, todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Get todos *assigned to me*
export const getTodosAssignedToMe = async (req, res) => {
  try {
    const todos = await Todo.find({ assignee: req.user.userId })
      .sort({ createdAt: -1 })
      .populate("creator", "username email")
      .populate("assignee", "username email")

    res.json({ success: true, todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Update todo
export const updateTodo = async (req, res) => {
  try {
    const { title, text, completed} = req.body;

    const todo = await Todo.findById(req.params.id)
      .populate("creator", "_id")
      .populate("assignee", "_id");

    if (!todo) {
      return res.status(404).json({ message: "Todo not found!" });
    }

    const creatorId = todo.creator?._id || todo.creator;
    const assigneeId = todo.assignee?._id || todo.creator;

    if (!isSameId(assigneeId, req.user.userId)) {
      return res.status(403).json({ message: "Not authorized to update this todo" });
    }

    if (title !== undefined) todo.title = title;
    if (text !== undefined) todo.description = text;
    if (completed !== undefined) todo.completed = completed;
    

    await todo.save();

    res.json({ success: true, todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
      .populate("creator", "_id");

    if (!todo) {
      return res.status(404).json({ message: "Todo not found!" });
    }

    const creatorId = todo.creator?._id || todo.creator;

    if (!isSameId(creatorId, req.user.userId)) {
      return res.status(403).json({ message: "Not authorized to delete this todo" });
    }

    await todo.deleteOne();

    res.json({ success: true, message: "Todo is deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Get todo by id
export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
      .populate("creator", "_id username email")
      .populate("assignee", "_id username email");

    if (!todo) {
      return res.status(404).json({ message: "Todo not found!" });
    }

    const creatorId = todo.creator?._id?.toString();
    const assigneeId = todo.assignee?._id?.toString();
    const loggedInUserId = req.user?.userId?.toString();

    if (
      loggedInUserId !== creatorId &&
      loggedInUserId !== assigneeId
    ) {
      return res.status(403).json({ message: "Not authorized to view this todo" });
    }

    res.json({ success: true, todo });
  } catch (error) {
    console.error("getTodoById error:", error);
    res.status(500).json({ message: error.message });
  }
};
