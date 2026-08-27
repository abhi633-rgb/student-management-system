const submit = document.getElementById("btn-addCourse")
const Toast = document.getElementById("Toast")
const Reset = document.getElementById("form-reset")

submit.addEventListener('click',()=>{
    const department =document.getElementById("departmentSelect").value.trim()
    const course =document.getElementById("courseSelect").value.trim()
    const subject =document.getElementById("subjectName").value.trim()
    const code =document.getElementById("courseCode").value.trim()
    const semester =document.getElementById("courseSemester").value.trim()
    const semesterYear =document.getElementById("semesterYear").value.trim()
    const instructor =document.getElementById("courseInstructor").value.trim()
    const type =document.getElementById("courseType").value.trim()

    if(!department && !course && !subject && !code && !semester && !semesterYear && !instructor && !type){
        message("All Field are Required","error")
        return
    }
    if(!department){
        message("Department Name Required","error")
        return
    }
    if(!course){
        message("Course Name Required","error")
        return
    }
    if(!subject){
        message("Course Name Required","error")
        return
    }
    if(!code){
        message("Course Code Required","error")
        return
    }
    if(!semester){
        message("Semester Required","error")
        return
    }
    if(!semesterYear){
        message("Semester Year Required","error")
        return
    }
    if(!instructor){
        message("Instructor Name Required","error")
        return
    }
    if(!type){
        message("Course Type Required","error")
        return
    }
    const reqbody = {
            department,
            course,
            subject,
            code,
            semester,
            semesterYear,
            instructor,
            type
    }
    Reset.reset()
    fetch("/addCourse",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(reqbody)
    }).then(response=>{
        return response.json()
    }).then(response=>{
    })

})

function message(message,Status) {
    Toast.textContent = message;
    Toast.classList.add("show");
    if(Status==="error"){
        Toast.classList.add("error")
    }
    if(Status==="success"){
        Toast.classList.add("success")
    }
    setTimeout(() => {
        Toast.classList.remove("show");
    }, 3000);
}