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
    const mimeType = allowed.test(file.mimetype);  // Corrected
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

exports.addadmin = async (req, res) => {
    upload.single('adminProfile')(req, res, async (err) => {
        if (err) {
            return res.status(404).json({ message: err.message }); // Improved error handling
        }
        const admin = new adminschema({
            ...req.body,
            adminProfile: req.file ? `/uploads/${req.file.filename}` : null, // Fixed path
        });

        try {
            await admin.save();
            return res.status(200).json(admin);
        } catch (error) {
            return res.status(500).json({ message: "Server error", error });
        }
    });
};

exports.getadmin = async (req, res) => {
    try {
        const admin = await adminschema.find();
        res.status(200).json(admin); // Removed duplicate response
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getadminById = async (req, res) => {
    try {
        const admin = await adminschema.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin ID not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteadmin = async (req, res) => {
    try {
        const admin = await adminschema.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin ID not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.updateadmin = async (req, res) => {
    upload.single('adminProfile')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const updateData = {
            ...req.body,
        };

        if (req.file) {
            updateData.adminProfile = req.file.filename; // Fixed field name
        }

        try {
            const admin = await adminschema.findByIdAndUpdate(req.params.id, updateData, { new: true });
            if (!admin) {
                return res.status(404).json({ message: 'Admin ID not found' });
            }
            res.status(200).json(admin);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    });
};

exports.adminlogin = async (req, res) => {
    const { adminId, password } = req.body;
    try {
        const admin = await adminschema.findOne({ adminId });
        if (!admin) {
            return res.status(404).json({ message: 'Invalid admin ID' }); // Improved message
        } else if (admin.password !== password) {
            return res.status(404).json({ message: 'Invalid password' }); // Improved message
        }
        return res.status(200).json({ message: 'Login successfully',admin });
    } catch (error) {
        return res.status(500).json({ message: "API error", error });
    }
};


