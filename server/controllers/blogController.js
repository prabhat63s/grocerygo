import Blog from "../models/blogModel.js";

// Create a new blog
export const createBlog = async (req, res) => {
   const { title, message } = req.body;
   const domainName = req.protocol + "://" + req.get("host");
   const blogImage = req.file ? `${domainName}/uploads/blogs/${req.file.filename}` : "";

   const blog = new Blog({ blogImage, title, message, });

   try {
      const newBlog = await blog.save();
      res.status(201).json(newBlog);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
   try {
      const blogs = await Blog.find();
      res.json(blogs);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// Get a blog by ID
export const getBlogById = async (req, res) => {
   try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
         return res.status(404).json({ message: 'Blog not found' });
      }
      res.json(blog);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// Update a blog by ID
export const updateBlog = async (req, res) => {
   try {
      const { title, message } = req.body;
      const domainName = req.protocol + "://" + req.get("host");
      const blogImage = req.file ? `${domainName}/uploads/Blogs/${req.file.filename}` : null;

      // Build update object
      const updateData = { title, message };
      if (blogImage) {
         updateData.blogImage = blogImage;
      }

      const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!blog) {
         return res.status(404).json({ message: 'Blog not found' });
      }

      res.json({ message: 'Update successfully' });
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};


// Delete a blog by ID
export const deleteBlog = async (req, res) => {
   try {
      const blog = await Blog.findByIdAndDelete(req.params.id);
      if (!blog) {
         return res.status(404).json({ message: 'Blog not found' });
      }
      res.json({ message: 'Blog deleted successfully' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};
