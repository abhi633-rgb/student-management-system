const create = document.getElementById("CreateAccount")

create.addEventListener('click',()=>{
    let firstName=document.getElementById("firstName").value.trim();
    let lastName=document.getElementById("lastName").value.trim();
    let email=document.getElementById("email").value.trim();
    let password=document.getElementById("password").value.trim();
    let confirmPassword=document.getElementById("confirmPassword").value.trim();
    let gender=document.getElementById("gender").value.trim();
    let age=document.getElementById("age").value.trim();
    let phonenumber=document.getElementById("phonenumber").value.trim();
    let role=document.getElementById("role").value.trim();
    const btn = document.getElementById("Registration-form")

    if(!firstName && !lastName && !email && !password && !confirmPassword && !gender && !age && !phonenumber && !role){
        showT0ast("All Field Required","error")
        return
    }

    if(!firstName){
        showT0ast("First Name Required","error")
        return
    }
    if(!lastName){
        showT0ast("Last Name Required","error")
        return
    }
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
        if (confirmPassword !== password) {
            showT0ast("Password Not Matched", "error")
            return
        }
    }
    if(!gender){
        showT0ast("Gender Required","error")
        return
    }
    if(!age){
        showT0ast("Age Required","error")
        return
    }
    if(!phonenumber){
        showT0ast("Phone Number Required","error")
        return
    }
    if(!role){
        showT0ast("Role Required","error")
        return
    }
    else{
        const reqbody ={
            firstName,
            lastName,
            email,
            password,
            gender,
            age,
            phoneNumber:phonenumber,
            role
        }
        create.disabled=true
        fetch("/api/registerUsers",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(reqbody)
        })
            .then((response)=>{
                if(!response.ok){
                    console.log("----Status---",response)
                    btn.reset()
                    create.disabled=false
                }
            })
            .then(()=>{
            showT0ast("Register Success","success")
            btn.reset()
            create.disabled=false
        })
    }
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