import User from '../../models/userModel.js'

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

export default getAllUsers