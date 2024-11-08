// pages/api/search.js
import axios from 'axios';

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username query parameter is required.' });
  }

  try {
    const response = await axios.get(`https://users.roproxy.com/v1/users/search?keyword=${username}`);
    const player = response.data.data[0];

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.status(200).json({
      id: player.id,
      username: player.name,
      status: 'Online', // Placeholder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch player data' });
  }
}
