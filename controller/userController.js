
const { json } = require('body-parser');
const userModule = require('../modules/userModule');
const { use } = require('../routes/userRoute');




exports.adduser = async (req, res) => {
    const user = new userModule(req.body);
    try {
        await user.save();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
};

exports.getallUser = async (req, res) => {
    try {

        const alluser = await userModule.find();
        res.status(200).json(alluser);
    }
    catch (error) {
        res.status(500).json(error)
    }
},

    exports.getsingle = async (req, res) => {
        const user = await userModule.findById(req.params.id);
        try {
            if (!user) {
                return res.status(404).json({ mess: 'invalide user id' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        };

    },

    exports.loginUser = async (req, res) => {
        const { email, mobile, password } = req.body;
        try {
            const user = await userModule.findOne({ $or: [{ email }, { mobile }] });
            // res.json(user);
            if (!user) {
                return res.status(404).json({ mes: 'invalide email or mobile' });
            }
            if (userModule.password !== password) {
                 res(404).json({ mes: "incorrect password" });
            }
            res.json(user);

        } catch (error) {
            res.status(500).json(error);
        }
    }