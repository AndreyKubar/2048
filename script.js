document.addEventListener("DOMContentLoaded", () => {
    const scoreDisplay = document.getElementById("score");
    const gridDisplay = document.querySelector(".grid");
    const resultDisplay = document.getElementById("result");

    let squares = [];
    let width = 4;
    let score = 0;
  
    //создание игрового поля
    function createBoard() {
      for (let i = 0; i < width * width; i++) {
        let square = document.createElement("div");
        square.innerHTML = 0;
        gridDisplay.appendChild(square);
        squares.push(square);
      }
      generate();
      generate();
    }
    createBoard();
  
    //генерация числа
    function generate() {
      randomNumber = Math.floor(Math.random() * squares.length);
      if (squares[randomNumber].innerHTML == 0) {
        squares[randomNumber].innerHTML = 2;
        checkForLose()
      } else generate();
    }

    function moveUp() {
      for (let i = 0; i < 4; i++) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + width].innerHTML;
        let totalThree = squares[i + width * 2].innerHTML;
        let totalFour = squares[i + width * 3].innerHTML;
        let column = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ]

        let filteredColumn = column.filter((num) => num);
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill(0);
        let newColumn = filteredColumn.concat(zeros);

        squares[i].innerHTML = newColumn[0];
        squares[i + width].innerHTML = newColumn[1];
        squares[i + width * 2].innerHTML = newColumn[2];
        squares[i + width * 3].innerHTML = newColumn[3];
      }
    }

    function moveRight() {
      for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
          let totalOne = squares[i].innerHTML;
          let totalTwo = squares[i + 1].innerHTML;
          let totalThree = squares[i + 2].innerHTML;
          let totalFour = squares[i + 3].innerHTML;
          let row = [
            parseInt(totalOne),
            parseInt(totalTwo),
            parseInt(totalThree),
            parseInt(totalFour),
          ]

          let filteredRow = row.filter((num) => num);
          let missing = 4 - filteredRow.length;
          let zeros = Array(missing).fill(0);
          let newRow = zeros.concat(filteredRow);
          
          squares[i].innerHTML = newRow[0];
          squares[i + 1].innerHTML = newRow[1];
          squares[i + 2].innerHTML = newRow[2];
          squares[i + 3].innerHTML = newRow[3];


        }
      }
    }

    function moveDown() {
      for (let i = 0; i < 4; i++) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + width].innerHTML;
        let totalThree = squares[i + width * 2].innerHTML;
        let totalFour = squares[i + width * 3].innerHTML;
        let column = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ]
        let filteredColumn = column.filter((num) => num)
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill(0);
        let newColumn = zeros.concat(filteredColumn);

        squares[i].innerHTML = newColumn[0];
        squares[i + width].innerHTML = newColumn[1];
        squares[i + width * 2].innerHTML = newColumn[2];
        squares[i + width * 3].innerHTML = newColumn[3]
      }
    }

    function moveLeft() {
      for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
          let totalOne = squares[i].innerHTML;
          let totalTwo = squares[i + 1].innerHTML;
          let totalThree = squares[i + 2].innerHTML;
          let totalFour = squares[i + 3].innerHTML;
          let row = [
            parseInt(totalOne),
            parseInt(totalTwo),
            parseInt(totalThree),
            parseInt(totalFour),
          ]

          let filteredRow = row.filter((num) => num);
          let missing = 4 - filteredRow.length;
          let zeros = Array(missing).fill(0);
          let newRow = filteredRow.concat(zeros);
          
          squares[i].innerHTML = newRow[0];
          squares[i + 1].innerHTML = newRow[1];
          squares[i + 2].innerHTML = newRow[2];
          squares[i + 3].innerHTML = newRow[3];

    }
  }
}



    function combineColumn() {
      for (let i = 0; i < 12; i++) {
        if (squares[i].innerHTML === squares[i + width].innerHTML) {
          let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
          squares[i].innerHTML = combinedTotal;
          squares[i + width].innerHTML = 0;
          score += combinedTotal;
          scoreDisplay.innerHTML = score;
        }
      }
      checkForWin();
    }

    function combineRow() {
      for (let i = 0; i < 15; i++) {
        if (squares[i].innerHTML === squares[i + 1].innerHTML) {
          let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
          squares[i].innerHTML = combinedTotal;
          squares[i + 1].innerHTML = 0;
          score += combinedTotal;
          scoreDisplay.innerHTML = score;
        }
      }
      checkForWin();
    }

//назначить функции по коду клавиши
    function control(e) {
      if (e.keyCode === 38) {
        keyUp()
      } else if (e.keyCode === 39) {
        keyRight()
      } else if (e.keyCode === 40) {
        keyDown()
      } else if (e.keyCode === 37){
        keyLeft()
      }
    }

    document.addEventListener("keyup", control);

    function keyUp() {
      moveUp();
      combineColumn();
      moveUp();
      generate();
    }

    function keyRight() {
      moveRight();
      combineRow()
      moveRight();
      generate();
    }

    function keyDown() {
      moveDown();
      combineColumn();
      moveDown();
      generate();
    }

    function keyLeft() {
      moveLeft();
      combineRow();
      moveLeft();
      generate();
    }

    function checkForWin() {
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 2048) {
          resultDisplay.innerHTML = "WINNER";
          document.removeEventListener("keyup", control)
        }
      }
    }
  
    function checkForLose() {
      let zeros = 0
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 0) {
          zeros++;
        }
      }
      if (zeros == 0) {
        resultDisplay.innerHTML = "LOSER";
        document.removeEventListener("keyup", control);
        setTimeout(() => clear(), 3000)
      }
    }

    function clear() {
      clearInterval(myTimer)
    }

    //добавление цветов
    function addColours() {
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 0) {
          squares[i].style.backgroundColor = "#afa192";
        } else if (squares[i].innerHTML == 2) {
          squares[i].style.backgroundColor = "#eee4da";
        } else if (squares[i].innerHTML == 4){
          squares[i].style.backgroundColor = "#eee1c9";
        } else if (squares[i].innerHTML == 8) {
          squares[i].style.backgroundColor = "#f3b27a";
        } else if (squares[i].innerHTML == 16) {
          squares[i].style.backgroundColor = "#f69664";
        } else if (squares[i].innerHTML == 32) {
          squares[i].style.backgroundColor = "#f77c5f";
        } else if (squares[i].innerHTML == 64) {
          squares[i].style.backgroundColor = "#f75f3b";
        } else if (squares[i].innerHTML == 128) {
          squares[i].style.backgroundColor = "#DAA520";
        } else if (squares[i].innerHTML == 256) {
          squares[i].style.backgroundColor = "#00BFFF";
        } else if (squares[i].innerHTML == 512) {
          squares[i].style.backgroundColor = "#9932CC";
        } else if (squares[i].innerHTML == 1024) {
          squares[i].style.backgroundColor = "#00FFFF";
        } else if (squares[i].innerHTML == 2048) {
          squares[i].style.backgroundColor = "#FFD700";
        }
      }
    }
    addColours();
  
    let myTimer = setInterval(addColours, 50)
  });
  