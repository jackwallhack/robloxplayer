// pages/api/search.js
import axios from 'axios';

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username query parameter is required.' });
  }

  try {
    // Updated endpoint for player search, if necessary
    const response = await axios.get(`https://users.roblox.com/v1/users/search?keyword=${username}`);
    
    if (response.data.data.length === 0) {
      // No player found with the given username
      return res.status(404).json({ error: 'Player not found' });
    }

    // Use the first player result as an example
    const player = response.data.data[0];
    res.status(200).json({
      id: player.id,
      username: player.name,
      status: 'Online', // Placeholder status
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch player data. Please try again later.' });
  }
}
