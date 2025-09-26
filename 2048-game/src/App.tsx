import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

// tipo para el tablero - matriz 4x4
type Board = number[][];

function App() {
	const [board, setBoard] = useState<Board>([]);
	const [score, setScore] = useState(0);

	// Función para crear un tablero vacío
	const createEmptyBoard = (): Board => {
		return Array(4)
			.fill(null)
			.map(() => Array(4).fill(0));
	};

	// Función para obtener celdas vacias
	const getEmptyCells = (board: Board): Array<{ row: number; col: number }> => {
		const emptyCells = [];
		for (let row = 0; row < 4; row++) {
			for (let col = 0; col < 4; col++) {
				if (board[row][col] === 0) {
					emptyCells.push({ row, col });
				}
			}
		}
		return emptyCells;
	};

	// Función para agregar un nuevo número (2 o 4) en una celda vacía
	const addRandomNumber = (board: Board): Board => {
		const emptyCells = getEmptyCells(board);
		if (emptyCells.length === 0) return board;

		const newBoard = board.map((row) => [...row]);
		const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
		const randomValue = Math.random() < 0.9 ? 2 : 4; // 90% probabilidad de 2, 10% de 4

		newBoard[randomCell.row][randomCell.col] = randomValue;
		return newBoard;
	};

	// Función para iniciar el juego
	const initializeGame = () => {
		let newBoard = createEmptyBoard();
		// Agregar dos números al inicio del juego
		newBoard = addRandomNumber(newBoard);
		newBoard = addRandomNumber(newBoard);
		setBoard(newBoard);
		setScore(0);
	};

	// Función para reiniciar el juego
	const restartGame = () => {
		initializeGame();
	};

	// Función para obtener el color de la celda según su valor
	const getCellColor = (value: number): string => {
		if (value === 0) return "bg-gray-300 text-gray-600";
		if (value === 2) return "bg-gray-100 text-gray-800";
		if (value === 4) return "bg-gray-200 text-gray-800";
		if (value === 8) return "bg-orange-200 text-gray-800";
		if (value === 16) return "bg-orange-300 text-white";
		if (value === 32) return "bg-orange-400 text-white";
		if (value === 64) return "bg-orange-500 text-white";
		if (value === 128) return "bg-yellow-300 text-white";
		if (value === 256) return "bg-yellow-400 text-white";
		if (value === 512) return "bg-yellow-500 text-white";
		if (value === 1024) return "bg-red-400 text-white";
		if (value === 2048) return "bg-red-500 text-white";
		return "bg-red-600 text-white";
	};

	// Inicializar el juego cuando el componente se monta
	useEffect(() => {
		initializeGame();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
				{/* Header del juego */}
				<div className="text-center mb-6">
					<h1 className="text-4xl font-bold text-gray-800 mb-2">2048 Game</h1>
					<p className="text-gray-600 text-sm">Use arrow keys to play. Refresh the page to restart.</p>
				</div>

				{/* Score */}
				<div className="text-center mb-6">
					<div className="inline-block bg-gray-100 rounded-lg px-6 py-3 shadow-md">
						<p className="text-sm text-gray-600 uppercase tracking-wide">Score</p>
						<p className="text-2xl font-bold text-gray-800">{score}</p>
					</div>
				</div>

				{/* Game Board */}
				<div className="bg-gray-200 p-4 rounded-lg mb-6">
					<div className="grid grid-cols-4 gap-2">
						{board.map((row, rowIndex) =>
							row.map((cell, colIndex) => (
								<div
									key={`${rowIndex}-${colIndex}`}
									className={`h-16 w-16 rounded-md flex items-center justify-center text-xl font-bold transition-all duration-200 ${getCellColor(
										cell
									)}`}>
									{cell !== 0 ? cell : ""}
								</div>
							))
						)}
					</div>
				</div>

				{/* Restart Button */}
				<div className="text-center">
					<Button variant="outline" onClick={restartGame} className="flex items-center gap-2 mx-auto">
						<RotateCcw size={16} />
						Restart Game
					</Button>
				</div>
			</div>
		</div>
	);
}

export default App;
