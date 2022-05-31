const questionList = document.querySelector(".question-list")
let output = ''

function loadHomePage(){
    output = `<div class="container w-75">
                    <div class="card m-5">
                        <ul class="p-5">
                            <li><p>This quiz will consistof 5 questions</p></li>
                            <li><p>Each correct answer will give you 1 point</p></li>
                            <li><p>There is no negative marking</p></li>
                            <li><p>The answer will be validated once the submit button is clicked</p></li>
                        </ul>
                    </div>
                    <div class="text-center">
                        <button type="button" id="start" class="btn btn-success">Start Quiz</button>
                    </div>
                </div>`
    questionList.innerHTML = output
}
function loadQuestion(data) {
    output = `<div class="mb-4">
                    <div class="card p-4 mb-4">${data.question}</div>
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
    questionList.innerHTML = output
}
let question
let selectedAns = -1;
const qNo = Math.floor(Math.random()*5);
loadHomePage()
s
fetch(`http://localhost:3001/questions/${qNo}`).then(
    (res) => res.json().then(
        (res) => {
            question = res
            loadQuestion(res)

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

function togleSubmit(){
    if (document.querySelector("#submit").disabled)
    document.querySelector("#submit").disabled = false
    else
    document.querySelector("#submit").disabled = true
}
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

function validateAnswer(){
    const ans = question.answer
    const optionList = document.querySelectorAll(".list-group-item")
    optionList[selectedAns].classList.remove("list-group-item-info")
    if(selectedAns!==ans){
        optionList[selectedAns].classList.add("list-group-item-danger")  
    }
    optionList[ans].classList.add("list-group-item-success")
    togleSubmit()
    setTimeout(loadHomePage,1500)
    
}