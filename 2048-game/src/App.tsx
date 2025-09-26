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

	// Función para mover y fusionar hacia la izquierda
	const moveLeft = (board: Board): { newBoard: Board; scoreGained: number } => {
		let scoreGained = 0;
		const newBoard = board.map((row) => {
			// Filtrar ceros
			const filtered = row.filter((cell) => cell !== 0);
			const merged = [];
			let i = 0;

			// Proceso de fusión
			while (i < filtered.length) {
				if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
					// Fusionar números iguales
					const mergedValue = filtered[i] * 2;
					merged.push(mergedValue);
					scoreGained += mergedValue;
					i += 2; // Saltar el siguiente número ya que se fusionó
				} else {
					// Mantener número sin cambios
					merged.push(filtered[i]);
					i += 1;
				}
			}

			// Completar con ceros
			while (merged.length < 4) {
				merged.push(0);
			}

			return merged;
		});

		return { newBoard, scoreGained };
	};

	// Función para mover y fusionar hacia la derecha
	const moveRight = (board: Board): { newBoard: Board; scoreGained: number } => {
		let scoreGained = 0;
		const newBoard = board.map((row) => {
			// Filtrar ceros y invertir para procesar desde la derecha
			const filtered = row.filter((cell) => cell !== 0).reverse();
			const merged = [];
			let i = 0;

			// Proceso de fusión
			while (i < filtered.length) {
				if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
					const mergedValue = filtered[i] * 2;
					merged.push(mergedValue);
					scoreGained += mergedValue;
					i += 2;
				} else {
					merged.push(filtered[i]);
					i += 1;
				}
			}

			// Completar con ceros al inicio y revertir
			while (merged.length < 4) {
				merged.push(0);
			}

			return merged.reverse();
		});

		return { newBoard, scoreGained };
	};

	// Función para mover y fusionar hacia arriba
	const moveUp = (board: Board): { newBoard: Board; scoreGained: number } => {
		let scoreGained = 0;
		const newBoard = createEmptyBoard();

		for (let col = 0; col < 4; col++) {
			// Extraer columna y filtrar ceros
			const column = [];
			for (let row = 0; row < 4; row++) {
				if (board[row][col] !== 0) {
					column.push(board[row][col]);
				}
			}

			// Proceso de fusión en la columna
			const merged = [];
			let i = 0;

			while (i < column.length) {
				if (i < column.length - 1 && column[i] === column[i + 1]) {
					const mergedValue = column[i] * 2;
					merged.push(mergedValue);
					scoreGained += mergedValue;
					i += 2;
				} else {
					merged.push(column[i]);
					i += 1;
				}
			}

			// Llenar la columna en el tablero
			for (let row = 0; row < 4; row++) {
				newBoard[row][col] = merged[row] || 0;
			}
		}

		return { newBoard, scoreGained };
	};

	// Función para mover y fusionar hacia abajo
	const moveDown = (board: Board): { newBoard: Board; scoreGained: number } => {
		let scoreGained = 0;
		const newBoard = createEmptyBoard();

		for (let col = 0; col < 4; col++) {
			// Extraer columna, filtrar ceros e invertir para procesar desde abajo
			const column = [];
			for (let row = 3; row >= 0; row--) {
				if (board[row][col] !== 0) {
					column.push(board[row][col]);
				}
			}

			// Proceso de fusión
			const merged = [];
			let i = 0;

			while (i < column.length) {
				if (i < column.length - 1 && column[i] === column[i + 1]) {
					const mergedValue = column[i] * 2;
					merged.push(mergedValue);
					scoreGained += mergedValue;
					i += 2;
				} else {
					merged.push(column[i]);
					i += 1;
				}
			}

			// Llenar la columna desde abajo hacia arriba
			for (let row = 3; row >= 0; row--) {
				const index = 3 - row;
				newBoard[row][col] = merged[index] || 0;
			}
		}

		return { newBoard, scoreGained };
	};
	// Función para manejar el movimiento según la tecla presionada
	const handleMove = (direction: string) => {
		let result: { newBoard: Board; scoreGained: number };

		switch (direction) {
			case "ArrowLeft":
				result = moveLeft(board);
				break;
			case "ArrowRight":
				result = moveRight(board);
				break;
			case "ArrowUp":
				result = moveUp(board);
				break;
			case "ArrowDown":
				result = moveDown(board);
				break;
			default:
				return;
		}

		const { newBoard, scoreGained } = result;

		// Solo actualizar si el tablero cambió
		if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
			const boardWithNewNumber = addRandomNumber(newBoard);
			setBoard(boardWithNewNumber);
			setScore((prevScore) => prevScore + scoreGained);
		}
	};

	// Inicializar el juego cuando el componente se monta
	useEffect(() => {
		initializeGame();
	}, []);

	// Event listener para las teclas de flecha
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			// Prevenir el scroll de la página con las flechas
			if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
				event.preventDefault();
				handleMove(event.key);
			}
		};

		// Agregar el event listener
		window.addEventListener("keydown", handleKeyPress);

		// Limpiar el event listener cuando el componente se desmonta
		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [board]); // Dependencia del board para tener acceso al estado actual

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
