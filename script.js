const submittion = () =>{
    let fname = document.getElementById('fname').value
    let lname = document.getElementById('lname').value
    let age = document.getElementById('age').value
    let gender = [...document.getElementsByClassName('genderval')].filter((item)=>{
        if(item.checked){
            return true
        }
    })[0].value
    console.log("gender",gender)
}
