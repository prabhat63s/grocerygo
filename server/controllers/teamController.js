import Team from '../models/teamModel.js';

// Create team member
export const createTeam = async (req, res) => {
   try {
      const { name, designation, description, facebook, youtube, instagram } = req.body;
      const domainName = req.protocol + "://" + req.get("host");
      const teamImage = `${domainName}/uploads/team/${req.file.filename}`;
      const teamMember = new Team({ name, designation, description, facebook, youtube, instagram, teamImage });
      await teamMember.save();
      res.status(201).json(teamMember);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
};

// Get all team members
export const getAllTeam = async (req, res) => {
   try {
      const team = await Team.find().sort({ createdAt: -1 });
      res.status(200).json(team);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get team member by ID
export const getTeamById = async (req, res) => {
   try {
      const teamMember = await Team.findById(req.params.id);
      if (!teamMember) return res.status(404).json({ message: 'Team member not found' });
      res.status(200).json(teamMember);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Update team member
export const updateTeam = async (req, res) => {
   try {
      const { name, designation, description, facebook, youtube, instagram } = req.body;

      const domainName = req.protocol + "://" + req.get("host");
      const teamImage = `${domainName}/uploads/team/${req.file.filename}`;

      const teamMember = await Team.findById(req.params.id);
      if (!teamMember) return res.status(404).json({ message: "Team member not found" });

      teamMember.name = name || teamMember.name;
      teamMember.designation = designation || teamMember.designation;
      teamMember.description = description || teamMember.description;
      teamMember.facebook = facebook || teamMember.facebook;
      teamMember.youtube = youtube || teamMember.youtube;
      teamMember.instagram = instagram || teamMember.instagram;
      if (teamImage) teamMember.teamImage = teamImage;

      await teamMember.save();
      res.status(200).json({ message: "Team member updated", teamMember });
   } catch (error) {
      console.error("Update Team Error:", error);
      res.status(500).json({ message: "Server error" });
   }
};

// Delete team member
export const deleteTeam = async (req, res) => {
   try {
      const deleted = await Team.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Team member not found' });
      res.status(200).json({ message: 'Deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
