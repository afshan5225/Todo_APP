import Todo from "../modals/Todo.js";

export const getAllTodos = async(req,res)=>{
    try {
        const todos = await Todo.find();
        res.json({success: true,
            todos})
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }
}

//create_todo

export const createTodo = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    console.log("req.body:", req.body);

    const { title, text } = req.body;

    if (!title || !text) {
      return res.status(400).json({ message: 'Title & text are required' });
    }

    const todo = new Todo({
      user: req.user.userId,
      title,
      text,
    });

    await todo.save();

    res.status(201).json({ success: true, todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//fetching all the todos for profile;

export const getTodos = async(req,res)=>{

    try {
        const todos = await Todo.find({user:req.user.userId}).sort({createdAt:-1})
        res.json({ success: true, todos });
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }

}


//editing 

export const updateTodo = async(req,res)=>{
    try {
        const {title,text,completed}  = req.body;
        const todo = await Todo.findById(req.params.id)

        if(!todo){
            return res.status(404).json({message:"todo not found!"})
        }

        if(title!==undefined) todo.title = title;
        if(text !==undefined) todo.text = text;
        if(completed !== undefined) todo.completed=completed;
        await todo.save()
        res.json(todo);
    } catch (error) {

        res.status(500).json({message:error.message})

        
    }
}


//deletion


export const deleteTodo = async(req,res)=>{
    try {
        const todo = await Todo.findById(req.params.id);

        if(!todo){
            return res.status(404).json({message:"todo not found!"})
        }

        await todo.deleteOne()

        res.json({message:'Todo is deleted'})
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }
}


//by id

export const getTodoById = async (req, res) => {
  try {
   

    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      
      return res.status(404).json({ message: "Todo not found!" });
    }

    console.log("✅ Todo found:", todo);

    if (String(todo.user) !== String(req.user.userId)) {
     
      return res.status(403).json({ message: "Not authorized to view this todo" });
    }

   
    res.json({ success: true, todo });

  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
};