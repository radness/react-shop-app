const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { auth } = require("../middleware/auth");

const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        if (ext !== '.jpg' || ext != '.png') {
            return cb(res.status(400).end('only jpg, png are allowed.'), false);
        }
        cb(null, true);
    }
})

var upload = multer({ storage: storage }).single("file");

//=================================
//             Product
//=================================

router.post("/uploadImage", auth, (req, res) => {
    //after getting tha image form client
    // we need to save it inside node server

    // Multer library
    // 이미지 저장을 성공하면 uploads 경로에 저장이 되고,
    // 아니면 file의 path와 filename을 frontend에 알려준다.
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, image: res.req.file.path, filename: res.req.file.filename })
    });
});

router.post("/uploadProduct", auth, (req, res) => {

    // save all the data we got from the client into the database
    const product = new Product(req.body);

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true });
    })


});

module.exports = router;
