// pages/api/search.js
import axios from 'axios';

export default async function handler(req, res) {
  const { username } = req.query;
  
  try {
    // Fetch player information from Roblox API
    const response = await axios.get(`https://users.roblox.com/v1/users/search?keyword=${username}`);
    const player = response.data.data[0]; // Assuming it returns a list of players

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.status(200).json({
      id: player.id,
      username: player.name,
      status: 'Online', // Placeholder status; replace with actual status if available
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch player' });
  }
}
