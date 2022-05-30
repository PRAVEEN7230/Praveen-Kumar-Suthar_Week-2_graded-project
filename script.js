const questionList = document.querySelector(".question-list")
let output = ''

function loadQuestion(data) {
    output += `<div class="mb-4">
                    <div class="card p-4 mb-4">${data.question}</div>
                    <div class="list-group">
                        <button type="button" id="1" class="list-group-item list-group-item-action">${data.options[0]}</button>
                        <button type="button" id="2" class="list-group-item list-group-item-action">${data.options[1]}</button>
                        <button type="button" id="3" class="list-group-item list-group-item-action">${data.options[2]}</button>
                        <button type="button" id="4" class="list-group-item list-group-item-action">${data.options[3]}</button>
                    </div>
                    <div class="text-center mt-4">
                        <button type="button" id="submit" class="col-2 btn btn-success" disabled>Submit</button>
                    </div>
                </div>`
    questionList.innerHTML = output
}
let question
let selectedAns = -1;
fetch("http://localhost:3001/questions/1").then(
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

function enableSubmit(){
    document.querySelector("#submit").disabled = false
}
function selectOption(index){
    selectedAns = index
    const optionList = document.querySelectorAll(".list-group-item")
    optionList.forEach((option,ind)=>{
        if(ind === selectedAns){
            option.classList.add("list-group-item-info")
            enableSubmit()
        }
    })
}

function validateAnswer(){
    const ans = question.answer
    const optionList = document.querySelectorAll(".list-group-item")
    optionList[selectedAns].classList.remove("list-group-item-info")
    if(selectedAns!==ans-1){
        optionList[selectedAns].classList.add("list-group-item-danger")  
    }
    optionList[ans-1].classList.add("list-group-item-success")
}