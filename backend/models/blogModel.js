import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images:{
    type:[String],
     default:[]
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  createdAt:{
    type:Date,
    default:Date.now
  }

});


const blogModel = mongoose.model("Blog",blogSchema);

export default blogModel;