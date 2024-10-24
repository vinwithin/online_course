const express = require("express");
const router = express.Router();
const multer = require("multer")
const path = require('path')
const { register, login, logout } = require("../controller/authController");
const { refreshToken } = require("../controller/refreshToken");
const { verifyToken } = require("../middleware/verify_token");
const { dashboard } = require("../controller/dashboardController");
const { create, destroy, edit, update } = require("../controller/courseController")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

// Initialize upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});

router.get("/admin", verifyToken, dashboard);


router.get("/login", (req, res) => {
  res.render("login", (error = false));
});
router.get("/register", (req, res) => {
  res.render("register", (error = 0));
});

router.post("/admin/course/create", verifyToken, upload.single('file'), create)
router.get("/admin/course/edit/:id", verifyToken, edit)
router.post("/admin/course/update/:id", verifyToken, upload.single('file'), update)
router.post("/admin/course/delete/:id", verifyToken, destroy)



router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
// router.get("/token", refreshToken);

module.exports = router;
