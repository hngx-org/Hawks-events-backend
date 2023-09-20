const userModel = require('../models/user')

const alloha = async (req,res) => {
        res.status(200).json({message:"It's still day one!"})
}

const register = async (req,res) => {

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
    const userId = req.user.id; // Replace with your authentication mechanism
  
    try {
      // Check if the group exists and the user is the creator
      const [groupRows] = await db.query('SELECT * FROM groups WHERE id = ? AND creator_id = ?', [groupId, userId]);
      if (groupRows.length === 0) {
        return res.status(404).json({ error: 'Group not found or unauthorized' });
      }
  
      // Update group details
      await db.query('UPDATE groups SET name = ?, description = ? WHERE id = ?', [name, description, groupId]);
  
      res.json({ message: 'Group details updated successfully' });
    } catch (error) {
      console.error('Error updating group:', error);
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