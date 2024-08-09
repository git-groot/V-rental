const { now } = require('mongoose');
const adminschema = require('../modules/adminModule');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png/;
    const mimeType = allowed.test(file.mimeType);
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
        return cb(null, true);
    }
    else {
        cb(new Error('only image is allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
})











exports.addadmin = async (req, res) => {
    const admin = new adminschema(req.body);
    try {
        return res.status(200).json(admin);
    } catch (error) {
        return res.status(500).json(error);
    }
};