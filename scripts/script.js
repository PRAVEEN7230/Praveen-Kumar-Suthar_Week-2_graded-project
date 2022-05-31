//
const questionContainer = document.querySelector(".question-container")
let output = ''
let question
let selectedAns
let qNo = Math.floor(Math.random()*7);
let count = 0
let userScore = 0

//function to render the home screen (instructions)
function loadHomePage(buttonName = "Start Quiz"){
    output = `<div class="container w-50 mt-5">
                    <div class="card my-5">
                        <ul class="m-4 fw-bold">
                            <li class="my-4"><p>This quiz will consistof 5 questions</p></li>
                            <li class="mb-4"><p>Each correct answer will give you 1 point</p></li>
                            <li class="mb-4"><p>There is no negative marking</p></li>
                            <li class="mb-4"><p>The answer will be validated once the submit button is clicked</p></li>
                        </ul>
                    </div>
                    <div class="text-center">
                        <button type="button" id="start" class="col-3 btn btn-success">${buttonName}</button>
                    </div>
                </div>`
    questionContainer.innerHTML = output
    const start = document.querySelector("#start")
    start.addEventListener("click",fetchAndLoadQuestion)
}
//function to render the question
function loadQuestion(data,qNo) {
    output = `<div class="container w-75 mt-5">
                    <div class="card card-header fs-5 p-4 mb-4">[${qNo}] ${data.question}</div>
                    <div class="list-group">
                        <button type="button" id="1" class="list-group-item list-group-item-action">${data.options[0]}</button>
                        <button type="button" id="2" class="list-group-item list-group-item-action">${data.options[1]}</button>
                        <button type="button" id="3" class="list-group-item list-group-item-action">${data.options[2]}</button>
                        <button type="button" id="4" class="list-group-item list-group-item-action">${data.options[3]}</button>
                    </div>
                    <div class="text-center mt-4">
                        <button type="button" id="submit" class="col-3 btn btn-success" disabled>Submit</button>
                    </div>
                </div>`
    questionContainer.innerHTML = output
}
//initial call to home page function
loadHomePage()

//fuction to show loading while fetching question
function loader(){
    output = `<div class="position-absolute top-50 start-50 translate-middle">
                    <div class="spinner-grow" style="width: 5rem; height: 5rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>`
    questionContainer.innerHTML = output
}

//function to fetch the question
function fetchAndLoadQuestion() {
    loader()
    selectedAns = -1;
    fetch(`http://localhost:3001/questions/${qNo%5}`).then(
    (res) => res.json().then(
        (res) => {
            question = res
            count++
            loadQuestion(res,count)
            const optionList = document.querySelectorAll(".list-group-item")
            const submit = document.querySelector("#submit")
            submit.addEventListener("click",validateAnswer)
            optionList.forEach((option,index)=>{
                option.addEventListener("click",()=>{
                    if(selectedAns===-1){
                        selectOption(index)
                    }
                })
            })
        })
    ).catch((err) => console.log(err))
    qNo++
}
//function to disable submit button before option selection
function togleSubmit(){
    if (document.querySelector("#submit").disabled)
    document.querySelector("#submit").disabled = false
    else
    document.querySelector("#submit").disabled = true
}
//function to highlight selected option
function selectOption(index){
    selectedAns = index
    const optionList = document.querySelectorAll(".list-group-item")
    optionList.forEach((option,ind)=>{
        if(ind === selectedAns){
            option.classList.add("list-group-item-info")
            togleSubmit()
        }
    })
}
//function to validate the answer and highlight accordingly
function validateAnswer(){
    const ans = question.answer
    const optionList = document.querySelectorAll(".list-group-item")
    optionList[selectedAns].classList.remove("list-group-item-info")
    if(selectedAns!==ans)
    optionList[selectedAns].classList.add("list-group-item-danger")  
    else
    userScore++
    optionList[ans].classList.add("list-group-item-success")
    togleSubmit()
    if(count==5)
    endQuiz()
    else
    setTimeout(()=>loadHomePage("Next"),1000)
}
//function to show the quiz completion with restart button
function endQuiz(){
    output = `
    <div class="container w-75 py-5">
          <div class="card bg-grey text-center">
              <h1 class="mt-4 text-success">Quiz Completed</h1>
              <div class="card-body my-3">
                <h3>Your Score : ${userScore}/5</h3>
              </div>
          </div>
          <div class="mt-4 text-center">
              <button type="button" id="restart" class="btn btn-primary">Restart Quiz</button>
          </div>
        </div>`
    questionContainer.innerHTML = output
    const restart = document.querySelector("#restart")
    restart.addEventListener("click",()=>loadHomePage())
    qNo = Math.floor(Math.random()*7);
    count = 0
    userScore = 0
}