const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const multer = require('multer');
const path = require('path');
const authMiddleware = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
   
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB dosya boyutu limiti
});

router.post('/',authMiddleware, isAdmin,  upload.array('images', 10), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id',authMiddleware, isAdmin,  upload.array('images', 10), productController.updateProduct);
router.delete('/:id',authMiddleware, isAdmin,  productController.deleteProduct);

module.exports = router;