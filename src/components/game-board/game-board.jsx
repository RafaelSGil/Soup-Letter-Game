import react from "react";

function GameBoard(){
    let grid = [];
    let words = ["JAVASCRIPT", "REACT", "VUE", "HTML", "CSS"];

    function fillBoardWithWords(board) {
        for(let i = 0; i < board.size(); i++){
            board[i][0] = "v";
        }

        for(let i = 0; i < board.size(); i++){
            for(let j = 0; j < board.size(); i++){
                console.log(board[i][j]);
            }
            console.log("\n");
        }
    }
    
    function initBoard(size){
        for(let i = 0; i < 5; i++){
            grid[i] = [];
            for(let j = 0; j < 5; j++){
                grid[i][j] = "$$"
            }
        }


    }
    
    return(
        <div>
            initBoard(5);
            fillBoardWithWords(grid);
        </div>
    )
}

export default GameBoard;