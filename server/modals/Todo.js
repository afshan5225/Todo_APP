import mongoose from 'mongoose';


const todoSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
      text: {
      type: String, 
      required: true,
    },
    completed:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});


const Todo = mongoose.model('Todo',todoSchema);
export default Todo;