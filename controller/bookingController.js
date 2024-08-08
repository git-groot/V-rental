
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
