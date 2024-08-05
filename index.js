const beginner = document.getElementById("beginner")
const intermediate = document.getElementById("intermediate")
const expert = document.getElementById("expert")
const custom = document.getElementById("custom")
const reset = document.getElementById("reset")
const matrix = document.querySelector(".matrix");
const gameInformation = document.querySelector(".gameInformation");


beginner.addEventListener("click",()=>createMatrix(9, 9,12))
intermediate.addEventListener("click",()=>createMatrix(16, 16,40))
expert.addEventListener("click",()=>createMatrix(16,30,99))
custom.addEventListener("click",()=>{
  const row = Number(prompt("Enter the Row"))
  const column = Number(prompt("Enter the Column"))
  const mines = Number(prompt("Enter the Mines"))
  if (row * column >= mines) {
    createMatrix(row,column,mines)
  }else {
    alert("You can't set Mines Grater then width x height")
    window.location.reload()
  }
})



function createMatrix(n, m,minesData) {
  reset.style.display = "inline-block";
  gameInformation.innerHTML = `<div>Matrix: ${n}x${m}</div> <div>Mines: ${minesData}</div>`
  let counter = 0;
  let randomMinesIndex = [];
  function createDiv() {
    for (let i = 0; i < n; i++) {
      let rowDiv = document.createElement("div");
      rowDiv.className = "row";

      for (let j = 0; j < m; j++) {
        let div = document.createElement("div");
        div.className = "createDiv";
        div.id = `${counter}`;
        div.innerHTML = "&nbsp;";
        rowDiv.appendChild(div);
        counter++;
      }
      matrix.appendChild(rowDiv);
    }
  }

  createDiv();

  function findRandomMines() {
    let existNumber = 0;
    for (let i = 0; i < minesData; i++) {
      let randomNumber = Math.floor(Math.random() * (n * m));
      let notExist = randomMinesIndex.indexOf(randomNumber);
      if (notExist === -1) {
        randomMinesIndex.push(randomNumber);
      } else {
        existNumber++;
      }
    }
    return existNumber;
  }

  function findingExistsNumber(existNumber) {
    for (let i = 0; i < existNumber; i++) {
      randomNumber = Math.floor(Math.random() * (n * m));
      let notExist = randomMinesIndex.indexOf(randomNumber);
      if (notExist === -1) {
        randomMinesIndex.push(randomNumber);
      } else {
        findingExistsNumber(1);
      }
    }
  }

  let existAndExistNumber = findRandomMines();
  if (existAndExistNumber > 0) {
    findingExistsNumber(existAndExistNumber);
  }


  function convert1DTo2DArray() {
    let row = document.querySelectorAll(".row");
    let convertArrayRow = Array.from(row);
    let rowArrayNew = [];

    for (let i = 0; i < convertArrayRow.length; i++) {
      rowArrayNew.push(convertArrayRow[i].children);
    }
    return rowArrayNew
  }
  

  function convert2DIndex() {
    let rowIndexAndColIndex = [];
    for (let i = 0; i < randomMinesIndex.length; i++) {
      rowIndexAndColIndex.push({
        rowIndex: Math.floor(randomMinesIndex[i] / m),
        colIndex: Math.floor(randomMinesIndex[i] % m),
      });
    }
    return rowIndexAndColIndex;
  }

  function checkCountNumber(rowIndexColIndex,count) {
    if (rowIndexColIndex.innerHTML === "&nbsp;" ) {
      rowIndexColIndex.innerHTML = count
    }else if(rowIndexColIndex.innerHTML == count){
      rowIndexColIndex.innerHTML = ++count
    }else if(rowIndexColIndex.innerHTML == ++count){
      rowIndexColIndex.innerHTML = ++count
    }else if(rowIndexColIndex.innerHTML == ++count){
      rowIndexColIndex.innerHTML = ++count
    }else if(rowIndexColIndex.innerHTML == ++count){
      rowIndexColIndex.innerHTML = ++count
    }else if(rowIndexColIndex.innerHTML == ++count){
      rowIndexColIndex.innerHTML = ++count
    }else if(rowIndexColIndex.innerHTML == ++count){
      rowIndexColIndex.innerHTML = ++count
    }else if(rowIndexColIndex.innerHTML == ++count){
      rowIndexColIndex.innerHTML = ++count
    }
  }

  function printNumber (rowIndexMinus1,rowIndexPlus1,colIndexMinus1,colIndexPlus1,i,rowArrayNew,convert1DTo2DIndex) {
    let count = 1
    let rowIndexData = convert1DTo2DIndex[i].rowIndex
    let colIndexData = convert1DTo2DIndex[i].colIndex

    if (rowIndexMinus1 >= 0 && colIndexMinus1 >= 0) {
      let indexMinus1Minus1 = rowArrayNew[rowIndexData-1][colIndexData-1]
      checkCountNumber(indexMinus1Minus1,count)
    }
    
    if (rowIndexMinus1 >= 0) {
      let indexMinus1As = rowArrayNew[rowIndexData-1][colIndexData]
      checkCountNumber(indexMinus1As,count)
    }
    
    if (rowIndexMinus1 >= 0 && colIndexPlus1 < rowArrayNew[0].length) {
      let indexMinus1Plus1 = rowArrayNew[rowIndexData-1][colIndexData+1]
      checkCountNumber(indexMinus1Plus1,count)
    }
      
    if (colIndexMinus1 >= 0) {
      let asIndexMinus1 = rowArrayNew[rowIndexData][colIndexData-1]
      checkCountNumber(asIndexMinus1,count)
    } 
    
    if (colIndexPlus1 < rowArrayNew[0].length) {
      let asIndexPlus1 = rowArrayNew[rowIndexData][colIndexData+1]
      checkCountNumber(asIndexPlus1,count)
    }

    if (rowIndexPlus1 < rowArrayNew.length && colIndexMinus1 >= 0 ) {
      let indexPlus1Minus1 = rowArrayNew[rowIndexData+1][colIndexData-1]
      checkCountNumber(indexPlus1Minus1,count)
    }

    if (rowIndexPlus1 < rowArrayNew.length) {
      let indexPlus1As = rowArrayNew[rowIndexData+1][colIndexData]
      checkCountNumber(indexPlus1As,count) 
    }

    if (rowIndexPlus1 < rowArrayNew.length && colIndexPlus1 < rowArrayNew[0].length) {
      let indexPlus1Plus1 = rowArrayNew[rowIndexData+1][colIndexData+1]
      checkCountNumber(indexPlus1Plus1,count)
    }
  }

  function placeMines() {
    let createDiv = document.querySelectorAll(".createDiv");
    let rowArrayNew = convert1DTo2DArray();
    let convert1DTo2DIndex = convert2DIndex();
    
    for (let i = 0; i < randomMinesIndex.length; i++) {
      createDiv[randomMinesIndex[i]].innerHTML = "&#128163";
      createDiv[randomMinesIndex[i]].classList.add("placeMinesData")
    }

    for(let i=0; i<randomMinesIndex.length; i++){
      if (createDiv[randomMinesIndex[i]].innerHTML !== "&#128163") {
        let rowIndexMinus1 = convert1DTo2DIndex[i].rowIndex - 1
        let colIndexMinus1 = convert1DTo2DIndex[i].colIndex - 1
        let rowIndexPlus1 = convert1DTo2DIndex[i].rowIndex + 1
        let colIndexPlus1 = convert1DTo2DIndex[i].colIndex + 1

       printNumber(rowIndexMinus1,rowIndexPlus1,colIndexMinus1,colIndexPlus1,i,rowArrayNew,convert1DTo2DIndex)
      }
    }
  }
  placeMines()


  function selectBox() {
    let convert1DTo2DArrayData = convert1DTo2DArray();

    function checkSpace(rowTargetId,colTargetId) {
      if (rowTargetId-1>=0 && colTargetId-1>=0 && rowTargetId+1<convert1DTo2DArrayData.length && colTargetId+1<convert1DTo2DArrayData[0].length) {
        convert1DTo2DArrayData[rowTargetId][colTargetId].classList.add("fontSizeIncrement");
        convert1DTo2DArrayData[rowTargetId-1][colTargetId-1].classList.add("fontSizeIncrement");
        convert1DTo2DArrayData[rowTargetId-1][colTargetId].classList.add("fontSizeIncrement");
        convert1DTo2DArrayData[rowTargetId-1][colTargetId+1].classList.add("fontSizeIncrement");
        convert1DTo2DArrayData[rowTargetId][colTargetId-1].classList.add("fontSizeIncrement");
        convert1DTo2DArrayData[rowTargetId][colTargetId+1].classList.add("fontSizeIncrement");
        convert1DTo2DArrayData[rowTargetId+1][colTargetId-1].classList.add("fontSizeIncrement");
        convert1DTo2DArrayData[rowTargetId+1][colTargetId].classList.add("fontSizeIncrement");
        convert1DTo2DArrayData[rowTargetId+1][colTargetId+1].classList.add("fontSizeIncrement");
        return
      }
    }


    function checkSpaceClick(rowTargetId,colTargetId) {
      if (convert1DTo2DArrayData[rowTargetId][colTargetId].innerHTML === "&nbsp;") {
        checkSpace(rowTargetId,colTargetId)
        if(rowTargetId-1>=0 && colTargetId-1>=0){
          if (convert1DTo2DArrayData[rowTargetId-1][colTargetId-1].innerHTML === "&nbsp;") {
            checkSpace(rowTargetId-1,colTargetId-1)
          }
        }
        if(rowTargetId-1>=0) {
          if (convert1DTo2DArrayData[rowTargetId-1][colTargetId].innerHTML === "&nbsp;") {
            checkSpace(rowTargetId-1,colTargetId)
          }
        }
        if(rowTargetId-1>=0 && colTargetId+1<convert1DTo2DArrayData[0].length){
          if (convert1DTo2DArrayData[rowTargetId-1][colTargetId+1].innerHTML === "&nbsp;") {
            checkSpace(rowTargetId-1,colTargetId+1)
          }
        }
        if(colTargetId-1>=0){
          if (convert1DTo2DArrayData[rowTargetId][colTargetId-1].innerHTML === "&nbsp;") {
            checkSpace(rowTargetId,colTargetId-1)
          }
        }
        if(colTargetId+1<convert1DTo2DArrayData[0].length){
          if (convert1DTo2DArrayData[rowTargetId][colTargetId+1].innerHTML === "&nbsp;") {
            checkSpace(rowTargetId,colTargetId+1)
          }
        }
        if (rowTargetId+1<convert1DTo2DArrayData.length && colTargetId-1>=0) {
          if (convert1DTo2DArrayData[rowTargetId+1][colTargetId-1].innerHTML === "&nbsp;") {
            checkSpace(rowTargetId+1,colTargetId-1)
          }
        }
        if(rowTargetId+1<convert1DTo2DArrayData.length){
          if (convert1DTo2DArrayData[rowTargetId+1][colTargetId].innerHTML === "&nbsp;") {
            checkSpace(rowTargetId+1,colTargetId)
          }
        }
        if (rowTargetId+1<convert1DTo2DArrayData.length && colTargetId+1<convert1DTo2DArrayData[0].length) {
          if (convert1DTo2DArrayData[rowTargetId+1][colTargetId+1].innerHTML === "&nbsp;") {
            checkSpace(rowTargetId+1,colTargetId+1)
          }
        }
      }
    }

    matrix.addEventListener("click",(e)=>{
      const targetedID = e.target.id
      const rowTargetId = Math.floor(targetedID / m)
      const colTargetId = Math.floor(targetedID % m)
      let convert1DTo2DIndex = convert2DIndex();

      convert1DTo2DArrayData[rowTargetId][colTargetId].classList.add("fontSizeIncrement")

      if (convert1DTo2DArrayData[rowTargetId][colTargetId].className.includes("placeMinesData")) {
        for(let i=0; i<convert1DTo2DIndex.length; i++) {
          if(convert1DTo2DArrayData[convert1DTo2DIndex[i].rowIndex][convert1DTo2DIndex[i].colIndex].className.includes("placeMinesData")){
            convert1DTo2DArrayData[convert1DTo2DIndex[i].rowIndex][convert1DTo2DIndex[i].colIndex].classList.add("findAllMineStyle")
            matrix.classList.add("disabledAll")
          }
        }
        gameInformation.innerHTML += "Game Over"
      }else {
        checkSpaceClick(rowTargetId,colTargetId)
      }

    })
  }
  selectBox()

  reset.addEventListener("click",()=>{
    window.location.reload()
  })
}
