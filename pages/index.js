// pages/index.js
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleSearch = async () => {
    // Placeholder for search function
    try {
      const response = await axios.get(`/api/search?username=${searchQuery}`);
      setSelectedPlayer(response.data); // Mocked response
    } catch (error) {
      console.error('Player not found');
    }
  };

  const addPlayer = () => {
    if (selectedPlayer) {
      setPlayers((prevPlayers) => [...prevPlayers, selectedPlayer]);
      setSelectedPlayer(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-2xl w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Roblox Player Tracker</h1>
          <p className="text-gray-400">Search and track Roblox players</p>
        </header>

        <div className="flex mb-6 space-x-2">
          <input
            type="text"
            placeholder="Search player..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 px-4 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
          <button
            onClick={addPlayer}
            className="bg-green-500 px-4 py-3 rounded-lg hover:bg-green-600 transition"
          >
            Add Player
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {players.map((player) => (
            <div
              key={player.id}
              className="p-4 rounded-lg bg-gray-700 flex justify-between items-center shadow-md"
            >
              <span className="font-semibold">{player.username}</span>
              <span className="text-gray-400">Status: {player.status || 'Unknown'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
