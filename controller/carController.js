const cartab = require('../modules/carMoodule');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowType = /jpeg|jpg|png/;
    const mimeType = allowType.test(file.mimetype);
    const extname = allowType.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
        return cb(null, true);
    } else {
        cb(new Error('only images are allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

exports.addcars = async (req, res) => {
    upload.single('uploadImage')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const car = new cartab({
            ...req.body,
            carImage: req.file ? req.file.filename : null
        });

        try {
            await car.save();
            res.status(200).json(car);
        } catch (error) {
            res.status(500).json(error);
        }
    });
};

exports.getCars = async (req, res) => {
    try {
        const cars = await cartab.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getCarById = async (req, res) => {
    try {
        const car = await cartab.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteCar = async (req, res) => {
    try {
        const car = await cartab.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.updateCar = async (req, res) => {
    upload.single('uploadImage')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const updateData = {
            ...req.body,
        };

        if (req.file) {
            updateData.carImage = req.file.filename;
        }

        try {
            const car = await cartab.findByIdAndUpdate(req.params.id, updateData, { new: true });
            if (!car) {
                return res.status(404).json({ message: 'Car not found' });
            }
            res.status(200).json(car);
        } catch (error) {
            res.status(500).json(error);
        }
    });
};