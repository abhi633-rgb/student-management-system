const Email = document.getElementById("login-email");
let Password = document.getElementById("password");
const T0ast = document.getElementById("T0ast");
const LogForm = document.getElementById("loginForm");
const closeitem = document.getElementById("closeDialogBtn");
const ResetBox = document.getElementById("overlay");
const ForgetLink = document.querySelector('.forgot-password');
const Loader1 = document.getElementById("loader1");
const Loader2 = document.getElementById("loader2");
const SignupBtn = document.getElementById("loginBtn");
const UpdateBtn = document.getElementById("updateBtn")
SignupBtn.addEventListener('click',()=>{
    if(!Email.value.trim() && !Password.value.trim()){
        showT0ast("All Field Required","error")
        return
    }
    if(!Email.value.trim()){
        showT0ast("UserName Required","error")
        return
    }
    if(!Password.value.trim()){
        showT0ast("Password Required","error")
        return
    }
    else {
        Loader1.classList.add("active")
        SignupBtn.disabled = true
        fetch("/LogIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: Email.value.trim(),
                password: Password.value.trim()
            })
        }).then(async response => {

            const data = await response.json();

            if (!response.ok) {
                Loader1.classList.remove("active")
                SignupBtn.disabled = false
                showT0ast(data.message,"error")
                LogForm.reset()
                return
            }
            Loader1.classList.remove("active")
            SignupBtn.disabled = false
            LogForm.reset()
            window.location.href = data.redirect;
            sessionStorage.setItem("LongedInId", data.studentId);
        })
            .catch(error => {
                console.log(error.message);
            });
    }
})
closeitem.addEventListener('click',()=>{
    ResetBox.classList.remove("active")
})
ForgetLink.addEventListener('click',(e)=>{
    e.preventDefault()
    ResetBox.classList.add("active")
})
UpdateBtn.addEventListener('click',()=>{
    let ResetEmail = document.getElementById("resetEmail")
    let NewPassword = document.getElementById("newPassword")
    let ConfirmNewPassword = document.getElementById("confirmnewPassword")
    let email=ResetEmail.value.trim()
    let password=NewPassword.value.trim()
    let confirmPassword=ConfirmNewPassword.value.trim()

    if(!email){
        showT0ast("Email Required","error")
        return
    }
    if(!password){
        showT0ast("Password Required","error")
        return
    }
    if(!confirmPassword){
        showT0ast("Confirm Password Required","error")
        return
    }
    if(confirmPassword) {
        if ((password !== confirmPassword)) {
            showT0ast("Both Password Should be Same", "error")
            return
        }
    }
    const reqBody = {
        email,
        password,
        confirmPassword
    }
    UpdateBtn.disabled=true
    Loader2.classList.add('active');
    fetch("/resetPassword",{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(reqBody)
    }).then(async response =>{
        if(response.ok){
            UpdateBtn.disabled=false
            Loader2.classList.remove('active');
            ResetBox.classList.remove("active")
            ResetEmail.value=" "
            NewPassword.value=" "
            ConfirmNewPassword.value=" "
            showT0ast("Password Change Successfully","success")
        }
        else {
            Loader2.classList.remove('active');
            UpdateBtn.disabled = false
            ResetEmail.value = " "
            NewPassword.value = " "
            ConfirmNewPassword.value = " "
            showT0ast("Invalid Email or Password", "error")
        }
    })
})
function showT0ast(message,Status) {
    T0ast.textContent = message;
    T0ast.classList.add("show");
    if(Status==="error"){
        T0ast.classList.add("error")
    }
    if(Status==="success"){
        T0ast.classList.add("success")
    }
    setTimeout(() => {
        T0ast.classList.remove("show");
    }, 3000);
}