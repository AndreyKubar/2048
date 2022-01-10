document.addEventListener("DOMContentLoaded", () => {
    const scoreDisplay = document.getElementById("score");
    const gridDisplay = document.querySelector(".grid");
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
        checkForGameOver();
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
    }

    function control(e) {
      if (e.keyCode === 38) {
        keyUp()
      }
    }

    document.addEventListener("keyup", control);

    function keyUp() {
      moveUp();
      combineColumn();
      moveUp();
      generate();
    }

  
    //добавление цветов
    function addColours() {
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 0)
          squares[i].style.backgroundColor = "#afa192";
        else if (squares[i].innerHTML == 2)
          squares[i].style.backgroundColor = "#eee4da";
        else if (squares[i].innerHTML == 4)
          squares[i].style.backgroundColor = "#ede0c8";
        else if (squares[i].innerHTML == 8)
          squares[i].style.backgroundColor = "#f2b179";
        else if (squares[i].innerHTML == 16)
          squares[i].style.backgroundColor = "#ffcea4";
        else if (squares[i].innerHTML == 32)
          squares[i].style.backgroundColor = "#e8c064";
        else if (squares[i].innerHTML == 64)
          squares[i].style.backgroundColor = "#ffab6e";
        else if (squares[i].innerHTML == 128)
          squares[i].style.backgroundColor = "#fd9982";
        else if (squares[i].innerHTML == 256)
          squares[i].style.backgroundColor = "#ead79c";
        else if (squares[i].innerHTML == 512)
          squares[i].style.backgroundColor = "#76daff";
        else if (squares[i].innerHTML == 1024)
          squares[i].style.backgroundColor = "#beeaa5";
        else if (squares[i].innerHTML == 2048)
          squares[i].style.backgroundColor = "#d7d4f0";
      }
    }
    addColours();
  
  });
  