// userController.js
const { json } = require('body-parser');
const userModule = require('../modules/userModule');


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
    exports.loginUser=  async (req, res) => {
        const { mobile, password } = req.body;
        try {
            const user = await userModule.findOne({ mobile });
            if (!user) {
                return res.status(404).json({ message: 'Invalid mobile' });
            }
            if (user.password !== password) {
                return res.status(404).json({ message: 'Incorrect password' });
            }
            res.status(200).json({ message: 'Login successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred', error });
        }
    };

    // exports.loginUser = async (req, res) => {
    //     const { email, mobile, password } = req.body;
    //     try {
    //         const user = await userModule.findOne({ $or: [{ email }, { mobile }] });
    //         // res.json(user);
    //         if (!user) {
    //             return res.status(404).json({ mes: 'invalide email or mobile' });
    //         }
    //         if (user.password !== password) {
    //             res(404).json({ mes: "incorrect password" });
    //         }
    //         res.status(200).json(user);

    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },
    exports.updateUser = async (req, res) => {
        try {
            const userId = req.params.id;
            const updatedcont = req.body;

            const updateUser = await userModule.findByIdAndUpdate(userId, updatedcont, { new: true });

            if (!updateUser) {
                res.status(404).json({ mes: 'failed to update' });
            }
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    exports.deleteUser = async (req, res) => {
        try {

            const userId = req.params.id;

            const deleteUser = await userModule.findByIdAndDelete(userId);

            if (!deleteUser) {
                res.status(404).json({ mes: 'invalide user id' });
            }
            res.status(200).json({ mes: 'delete sucessfully' });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    exports .adminLogin =async(req,res)=>{

        const documents=await test
    }