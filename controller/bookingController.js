
const booktab = require('../modules/bookModule');

exports.addbook = async (req, res) => {
    const booking = new booktab(req.body);
    try {
        await booking.save();
        res.status(200).json(booking);

    } catch (error) {
        res.status(200).json(error);
    }
};

exports.getallbooking = async (req, res) => {
    try {
        const getallbooking = await booktab.find();
        res.status(200).json(getallbooking);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getsinglebook = async (req, res) => {
    try {
        const getsinglebook = await booktab.findById(req.params.id);
        if (!getsinglebook) {
            return res.status(404).json({ mes: 'invalide id' });
        }
        return res.status(200).json(getsinglebook);
    } catch (error) {
        return res.status(500).json(error);
    }
};
