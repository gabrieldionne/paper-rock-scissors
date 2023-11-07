import "./App.css";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import paperSVG from "./images/paper.svg";
import rockSVG from "./images/rock.svg";
import scissorsSVG from "./images/scissors.svg";

function App() {
	const [hasPlayed, setHasPlayed] = useState(false);
	const [selected, setSelected] = useState("none");
	const [computerSelected, setComputerSelected] = useState("none");
	const [computerSelectedSVG, setComputerSelectedSVG] = useState("none");
	const [gameResult, setGameResult] = useState("none");
	const [userScore, setUserScore] = useState(0);

	useEffect(() => {
		if (selected !== "none" && computerSelected !== "none") {
			if (selected === computerSelected) {
				setGameResult("Tie!");
			} else if (selected === "paper" && computerSelected !== "scissors") {
				setGameResult("You Win!");
				setUserScore((score) => score + 1);
			} else if (selected === "rock" && computerSelected !== "paper") {
				setGameResult("You Win!");
				setUserScore((score) => score + 1);
			} else if (selected === "scissors" && computerSelected !== "rock") {
				setGameResult("You Win!");
				setUserScore((score) => score + 1);
			} else {
				setGameResult("You Lose!");
				setUserScore(0);
			}
		}
	}, [selected, computerSelected]);

	const play = (e) => {
		setHasPlayed(true);
		setSelected(e.currentTarget.id);
		const options = [paperSVG, rockSVG, scissorsSVG];
		const num = Math.floor(Math.random() * options.length);
		const img = options[num];
		if (num === 0) {
			setComputerSelected("paper");
		} else if (num === 1) {
			setComputerSelected("rock");
		} else if (num === 2) {
			setComputerSelected("scissors");
		}
		setComputerSelectedSVG(img);
	};

	const getSelected = () => {
		if (selected === "rock") {
			return <img src={rockSVG} alt='rocksvg' />;
		} else if (selected === "paper") {
			return <img src={paperSVG} alt='papersvg' />;
		} else if (selected === "scissors") {
			return <img src={scissorsSVG} alt='scissorssvg' />;
		}
	};

	const getComputerSelected = () => {
		return <img src={computerSelectedSVG} alt='compuutersvg'></img>;
	};

	const reset = () => {
		setHasPlayed(false);
		setSelected("none");
		setComputerSelected("none");
		setComputerSelectedSVG("none");
		setGameResult("none");
	};

	return (
		<div className='App'>
			{!hasPlayed && (
				<div className='game'>
					<button id='paper' onClick={(e) => play(e)}>
						<img src={paperSVG} alt='papersvg' />
					</button>
					<button id='rock' onClick={(e) => play(e)}>
						<img src={rockSVG} alt='rocksvg' />
					</button>
					<button id='scissors' onClick={(e) => play(e)}>
						<img src={scissorsSVG} alt='scissorssvg' />
					</button>
				</div>
			)}
			{hasPlayed &&
				selected !== "none" &&
				gameResult !== "none" &&
				computerSelectedSVG !== "none" && (
					<div className='result'>
						<div className='player'>
							You
							{getSelected()}
						</div>
						<div className='score'>
							<h3>{gameResult}</h3>
							<p>Score: {userScore}</p>
							<button onClick={reset}> Play Again?</button>
						</div>
						<div className='player'>
							Computer
							{getComputerSelected()}
						</div>
					</div>
				)}

			<Footer />
		</div>
	);
}

export default App;
