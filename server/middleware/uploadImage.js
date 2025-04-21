import multer from "multer";
import path from "path";
import fs from "fs";

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine the destination folder based on the route
    let uploadPath = "uploads/";  // Default upload path

    if (req.baseUrl.includes("users")) {
      uploadPath = "uploads/users/";
    } else if (req.baseUrl.includes("categories")) {
      uploadPath = "uploads/categories/";
    } else if (req.baseUrl.includes("products")) {
      uploadPath = "uploads/products/";
    } else if (req.baseUrl.includes("chooseUsUi")) {
      uploadPath = "uploads/chooseUsUi/";
    } else if (req.baseUrl.includes("why-choose-us")) {
      uploadPath = "uploads/whychooseus/";
    } else if (req.baseUrl.includes("gallery")) {
      uploadPath = "uploads/gallery/";
    } else if (req.baseUrl.includes("team")) {
      uploadPath = "uploads/team/";
    } else if (req.baseUrl.includes("blogs")) {
      uploadPath = "uploads/blogs/";
    } else if (req.baseUrl.includes("tutorial")) {
      uploadPath = "uploads/tutorial/";
    } else if (req.baseUrl.includes("banner")) {
      uploadPath = "uploads/banner/";
    } else if (req.baseUrl.includes("sliders")) {
      uploadPath = "uploads/sliders/";
    }


    // Ensure the destination directory exists, create it if it doesn't
    fs.promises.mkdir(uploadPath, { recursive: true })
      .then(() => {
        cb(null, uploadPath);
      })
      .catch((err) => {
        console.error("Error creating directory:", err);
        cb(new Error("Failed to create directory"));
      });
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// Initialize multer with storage settings
export const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /webp|jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    // Send a meaningful error message
    cb(new Error("Only .jpeg, .jpg, and .png files are allowed!"));
  },
});
