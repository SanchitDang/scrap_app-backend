// export default upload;
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// If using ES modules and __dirname is not defined
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userType = req.body.user_type;
    let folder = 'uploads'; // Default folder
    if (userType === 'admin') {
      folder = 'uploads/admin';
    } else if (userType === 'agent') {
      folder = 'uploads/agent';
    } else if (userType === 'user') {
      folder = 'uploads/user';
    } else if (userType === 'product') {
      folder = 'uploads/product';
    } else if (userType === 'category') {
      folder = 'uploads/category';
    }

    const dir = path.join(__dirname, `../public/${folder}`);
    
    // Ensure the directory exists
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const userId = req.body.user_id;
    const fileExt = path.extname(file.originalname);
    cb(null, `${userId}${fileExt}`);
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('profilePic'); // Expect a field named 'profilePic'

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

export default upload;
