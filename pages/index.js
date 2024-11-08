import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?username=${searchQuery}`);
      setSelectedPlayer(response.data); // Assuming it returns player data
    } catch (error) {
      console.error('Player not found');
    }
  };

  const addPlayer = () => {
    if (selectedPlayer) {
      setPlayers((prevPlayers) => [...prevPlayers, selectedPlayer]);
      setSelectedPlayer(null); // Reset search
    }
  };

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Roblox Player Tracker</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search player..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
          <button
            onClick={addPlayer}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Player
          </button>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => (
          <div key={player.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{player.username}</h2>
            <p>Status: {player.status || 'Unknown'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
