
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
    catch(error){
        res.status(500).json(error)
    }
}