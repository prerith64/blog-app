import blogModel from "../models/blogModel.js";

export const addBlog = async (req, res) => {
  try {
    const { title, abstract, description, images } = req.body;
    const userId = req.user.id;

    const newBlog = new blogModel({
      title,
      abstract,
      description,
      images,
      createdBy: userId,
    });

    await newBlog.save();
    return res.status(200).json({ message: "Blog added successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getBlog = async(req,res)=>{
    try {
          const blogs = await blogModel.find();
     return res.status(200).json({blogs})
    } catch (error) {
         return res.status(500).json({message:"server error"})
    }
}

export const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.id;
  const { title, abstract, description, images } = req.body;

  try {
    const blog = await blogModel.findOne({ _id: blogId, createdBy: userId });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found or unauthorized" });
    }


    blog.title = title;
    blog.abstract = abstract;
    blog.description = description;
    blog.images = images;

    await blog.save();
    return res.status(200).json({ message: "Blog updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete a blog by ID (only if it belongs to the authenticated user)
export const deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.id;

  try {
    const deleted = await blogModel.findOneAndDelete({ _id: blogId, createdBy: userId });

    if (!deleted) {
      return res.status(404).json({ message: "Blog not found or unauthorized" });
    }

    return res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};