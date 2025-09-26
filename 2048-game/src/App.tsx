import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

function App() {
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
						<p className="text-2xl font-bold text-gray-800">0</p>
					</div>
				</div>

				{/* Game Board */}
				<div className="bg-gray-200 p-4 rounded-lg mb-6">
					<div className="grid grid-cols-4 gap-2">
						{/* Por ahora creamos 16 celdas vacías */}
						{Array(16)
							.fill(0)
							.map((_, index) => (
								<div
									key={index}
									className="bg-gray-300 h-16 w-16 rounded-md flex items-center justify-center text-xl font-bold text-gray-600">
									0
								</div>
							))}
					</div>
				</div>

				{/* Restart Button */}
				<div className="text-center">
					<Button variant="outline" className="flex items-center gap-2 mx-auto">
						<RotateCcw size={16} />
						Restart Game
					</Button>
				</div>
			</div>
		</div>
	);
}

export default App;
