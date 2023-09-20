const userModel = require('../models/user')

const alloha = async (req,res) => {
        res.status(200).json({message:"It's still day one!"})
}

const register = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}


const login = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}


const profile = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

const updateProfile = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

const updateGroupDetails = async (req, res) => {
    const { groupId } = req.params;
    const { name, description } = req.body;
  
    try {
      const group = await Group.findByPk(groupId);
  
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
  
      // Check if the user is the owner of the group (you may implement user authentication)
      if (group.userId !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
  
      // Update group details
      group.name = name || group.name;
      group.description = description || group.description;
  
      await group.save();
  
      res.json(group);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not update group' });
    }
  };
  

module.exports = {
    alloha,
    register,
    login, 
    profile, 
    updateProfile,
    updateGroupDetails
}