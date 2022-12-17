document.getElementById("start-game").onclick = function () {
	// remove splash screen
	document.querySelector(".control-buttons").remove();
};

const duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

let triesElement = document.querySelector(".tries span");

shuffle(orderRange);

blocks.forEach((block, index) => {
	block.style.order = orderRange[index];

	block.addEventListener("click", () => {
		// Trigger Flip Block Function
		flipBlock(block);

		// Collect All Flipped Blocks
		let allFlippedBlocks = blocks.filter((flippedBlock) =>
			flippedBlock.classList.contains("is-flipped")
		);

		if (allFlippedBlocks.length === 2) {
			// Stop Clicking
			stopClicking();

			// Check if Matched
			checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
		}

		// Collect All Matched Blocks
		let allMatchedBlocks = blocks.filter((matchedBlock) =>
			matchedBlock.classList.contains("has-match"));

		if (allMatchedBlocks.length === 20) {

			// Reset Game
			resetGame();
		}
	});
});


// Reset Game Function
function resetGame() {
	let resetGameScreen = document.querySelector(".reset-game");

	let resetGameButton = document.querySelector(".reset-game span")

	resetGameScreen.style.display = "flex";

	resetGameButton.addEventListener("click", () => {
		blocks.forEach(block => {
			block.classList.remove("has-match");
			block.classList.remove("no-clicking");
			triesElement.innerHTML = 0;
		});

		resetGameScreen.style.display = "none";
	});
}

// Check Matched Blocks
function checkMatchedBlocks(firstBlock, secondBlock) {

	if (firstBlock.dataset.item === secondBlock.dataset.item) {
		// Remove Class is-flipped
		firstBlock.classList.remove("is-flipped");
		secondBlock.classList.remove("is-flipped");

		// Add Class has-match
		firstBlock.classList.add("has-match");
		secondBlock.classList.add("has-match");

		// Add Class no-clicking to Matched Blocks
		firstBlock.classList.add("no-clicking");
		secondBlock.classList.add("no-clicking");

	} else {
		// Update The Tries Element
		triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

		// Remove Class is-flipped After The Duration
		setTimeout(() => {
			firstBlock.classList.remove("is-flipped");
			secondBlock.classList.remove("is-flipped");
		}, duration);
	}
}

// Stop Clicking Function
function stopClicking() {
	// Add Class No Clicking on Main Container
	blocksContainer.classList.add("no-clicking");

	// Remove Class No Clicking After The Duration
	setTimeout(() => {
		blocksContainer.classList.remove("no-clicking");
	}, duration);
}

// Flip Block Function
function flipBlock(selectedBlock) {
	// Add Class is-flipped
	selectedBlock.classList.add("is-flipped");
}

// Shuffle Function
function shuffle(array) {
	let current = array.length,
		temp,
		random;

	while (current > 0) {
		// Get random number from 0 to 19
		random = Math.floor(Math.random() * current);

		current--;

		// [1] Store Element in Current Index
		temp = array[current];

		// [2] Swap Number in Current Index with the Number in Random Index
		array[current] = array[random];

		// [3] Store the Element in Current Index in Random Index
		array[random] = temp;
	}

	return array;
}
