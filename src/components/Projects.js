import React, { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { pythonCode } from '../constants/pythonCode';
import { Copy, Check, Search, Filter, Loader2 } from 'lucide-react';
import orgrimmarArena from '../assets/orgrimmararena.jpg';

// Constants for Snake Game
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [[10, 10]];
const INITIAL_DIRECTION = [1, 0];
const INITIAL_FOOD = [15, 15];

// Pokemon type colors
const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};


const Projects = () => {
  const [projectsRef, isVisible] = useScrollAnimation(0.1);
  const [activeProject, setActiveProject] = useState('snake');
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        
        setPokemonData(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = [...pokemonData];
    
    if (searchTerm) {
      filtered = filtered.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(searchTerm)
      );
    }
    
    if (selectedType) {
      filtered = filtered.filter(pokemon => 
        pokemon.types.some(type => type.type.name === selectedType)
      );
    }
    
    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemonData]);

  const SnakeGame = () => {
    const canvasRef = useRef(null);
    const gameLoopRef = useRef(null);
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [food, setFood] = useState(INITIAL_FOOD);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyCode = async () => {
      try {
        await navigator.clipboard.writeText(pythonCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    };

    const resetGame = () => {
      setSnake(INITIAL_SNAKE);
      setDirection(INITIAL_DIRECTION);
      setFood(INITIAL_FOOD);
      setIsGameOver(false);
      setScore(0);
    };

    const handleClick = (e) => {
      if (isGameOver) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      const headX = snake[0][0] * CELL_SIZE + CELL_SIZE / 2;
      const headY = snake[0][1] * CELL_SIZE + CELL_SIZE / 2;
      
      const dx = clickX - headX;
      const dy = clickY - headY;
      
      if (Math.abs(dx) > Math.abs(dy)) {
        const newDir = [dx > 0 ? 1 : -1, 0];
        if (newDir[0] !== -direction[0]) {
          setDirection(newDir);
        }
      } else {
        const newDir = [0, dy > 0 ? 1 : -1];
        if (newDir[1] !== -direction[1]) {
          setDirection(newDir);
        }
      }
    };

    const handleTouch = (e) => {
      e.preventDefault();
      handleClick(e.touches[0]);
    };

    useEffect(() => {
      if (isGameOver) {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
        return;
      }

      const moveSnake = () => {
        setSnake(currentSnake => {
          const newHead = [
            (currentSnake[0][0] + direction[0] + GRID_SIZE) % GRID_SIZE,
            (currentSnake[0][1] + direction[1] + GRID_SIZE) % GRID_SIZE
          ];

          if (newHead[0] === food[0] && newHead[1] === food[1]) {
            setScore(s => s + 1);
            const newFood = [
              Math.floor(Math.random() * GRID_SIZE),
              Math.floor(Math.random() * GRID_SIZE)
            ];
            setFood(newFood);
            return [newHead, ...currentSnake];
          }

          const newSnake = [newHead, ...currentSnake.slice(0, -1)];
          const collision = newSnake.slice(1).some(
            segment => segment[0] === newHead[0] && segment[1] === newHead[1]
          );

          if (collision) {
            setIsGameOver(true);
            return currentSnake;
          }

          return newSnake;
        });
      };

      gameLoopRef.current = setInterval(moveSnake, 150);
      return () => clearInterval(gameLoopRef.current);
    }, [direction, food, isGameOver]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);

      ctx.fillStyle = '#C79C6E';
      snake.forEach(([x, y], index) => {
        if (index === 0) {
          ctx.fillStyle = '#FFD700';
        } else {
          ctx.fillStyle = '#C79C6E';
        }
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
      });

      ctx.fillStyle = '#FF0000';
      ctx.fillRect(food[0] * CELL_SIZE, food[1] * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    }, [snake, food]);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Game Section */}
        <div className={`bg-black/20 p-6 rounded-lg border border-wow-border animate-scale ${isVisible ? 'scale-end' : 'scale-start'} relative group`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wow-gold to-transparent opacity-50" />
          <h3 className="text-xl font-bold text-wow-gold mb-4">Snake Game</h3>
          <div className="flex flex-col items-center space-y-4">
            <canvas
              ref={canvasRef}
              width={GRID_SIZE * CELL_SIZE}
              height={GRID_SIZE * CELL_SIZE}
              className="border-2 border-wow-border rounded cursor-pointer hover:border-wow-gold transition-colors duration-300"
              onClick={handleClick}
              onTouchStart={handleTouch}
            />
            <div className="flex items-center space-x-4">
              <p className="text-wow-gold">Score: {score}</p>
              {isGameOver && (
                <button
                  onClick={resetGame}
                  className="px-4 py-2 bg-wow-gold/20 text-wow-gold border border-wow-gold rounded hover:bg-wow-gold/30 transition-colors"
                >
                  Play Again
                </button>
              )}
            </div>
            <div className="text-center">
              <p className="text-white text-sm mb-1">Click/tap in any direction around the snake's head to change direction</p>
              <p className="text-wow-gold/80 text-xs italic">Collect the red orbs to increase your score</p>
            </div>
          </div>
        </div>

        {/* Code Section */}
        <div className={`bg-black/20 p-6 rounded-lg border border-wow-border animate-scale stagger-1 ${isVisible ? 'scale-end' : 'scale-start'} relative group`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wow-gold to-transparent opacity-50" />
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-wow-gold">Python Implementation</h3>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-2 px-4 py-2 bg-wow-gold/20 text-wow-gold border border-wow-gold rounded hover:bg-wow-gold/30 transition-colors"
            >
              {isCopied ? <Check size={16} /> : <Copy size={16} />}
              {isCopied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          <div className="relative h-[600px] overflow-auto rounded bg-black/40 p-4 border border-wow-border group-hover:border-wow-gold transition-colors duration-300">
            <pre className="text-white font-mono text-sm">
              <code>{pythonCode}</code>
            </pre>
          </div>
        </div>
      </div>
    );
  };

  const PokemonCard = ({ pokemon }) => (
    <div className="bg-black/40 rounded-lg p-4 border border-wow-border hover:border-wow-gold transition-all duration-300 group">
      <div className="relative">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto transform group-hover:scale-110 transition-transform duration-300"
        />
        <span className="absolute top-0 right-0 text-wow-gold/80 text-sm">#{pokemon.id.toString().padStart(3, '0')}</span>
      </div>
      <h3 className="text-wow-gold text-lg font-semibold capitalize text-center mb-2">
        {pokemon.name}
      </h3>
      <div className="flex justify-center gap-2">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className="px-3 py-1 rounded-full text-white text-sm capitalize"
            style={{ backgroundColor: `${typeColors[type.type.name]}80` }}
          >
            {type.type.name}
          </span>
        ))}
      </div>
      <div className="mt-4 text-sm">
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(pokemon.stats.reduce((acc, stat) => {
            acc[stat.stat.name] = stat.base_stat;
            return acc;
          }, {})).map(([stat, value]) => (
            <div key={stat} className="flex justify-between items-center">
              <span className="text-white/80 capitalize">{stat.replace('-', ' ')}:</span>
              <span className="text-wow-gold">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Pokedex = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 bg-black/20 p-4 rounded-lg border border-wow-border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wow-gold/50" size={20} />
          <input
            type="text"
            placeholder="Search by name or number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-wow-border rounded-lg text-white placeholder-wow-gold/30 focus:border-wow-gold focus:outline-none transition-colors"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wow-gold/50" size={20} />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="pl-10 pr-4 py-2 bg-black/40 border border-wow-border rounded-lg text-white focus:border-wow-gold focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="">All Types</option>
            {Object.keys(typeColors).map(type => (
              <option key={type} value={type} className="capitalize">{type}</option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 text-wow-gold animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPokemon.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );

  const ProjectSelector = () => (
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={() => setActiveProject('snake')}
        className={`px-6 py-2 rounded-lg transition-all duration-300 border-2 
          ${activeProject === 'snake' 
            ? 'border-wow-gold bg-wow-gold/20 text-wow-gold' 
            : 'border-wow-border text-white hover:border-wow-gold/50'}`}
      >
        Snake Game
      </button>
      <button
        onClick={() => setActiveProject('pokedex')}
        className={`px-6 py-2 rounded-lg transition-all duration-300 border-2 
          ${activeProject === 'pokedex' 
            ? 'border-wow-gold bg-wow-gold/20 text-wow-gold' 
            : 'border-wow-border text-white hover:border-wow-gold/50'}`}
      >
        Pokédex
      </button>
    </div>
  );

  return (
    <section
      ref={projectsRef}
      id="projects"
      className="relative mb-12 rounded-lg border-2 border-wow-border group scroll-mt-24"
    >
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${orgrimmarArena})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/85 group-hover:bg-black/80 transition-colors duration-300" />
      </div>

      <div className="p-8 relative">
        <h2 className={`text-3xl font-bold text-wow-gold mb-6 animate-slide-right ${isVisible ? 'slide-right-end' : 'slide-right-start'}`}>
          Projects
        </h2>

        <ProjectSelector />

        {activeProject === 'snake' ? (
          <SnakeGame />
        ) : (
          <Pokedex />
        )}
      </div>
    </section>
  );
};

export default Projects;