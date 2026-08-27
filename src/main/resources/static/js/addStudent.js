Firstname = document.getElementById("firstName");
Lastname = document.getElementById("lastName");
EMail = document.getElementById("email");
Phonenumber = document.getElementById("phone");
Age = document.getElementById("age");
Gender = document.getElementById("genderSelect");
Department = document.getElementById("departmentSelect");
address = document.getElementById("address");
Submit = document.getElementById("submitbtn");
Password = document.getElementById("password");
ConfirmPassword = document.getElementById("confirmpassword")
courseDiv = document.getElementById("courseDiv");
courseSelect = document.getElementById("courseSelect");
toast = document.getElementById("toast");
const courses = {
    "Computer Science": [
        "BCA", "B.Sc Computer Science", "B.Tech CSE", "MCA", "M.Sc Computer Science"
    ],
    "Commerce": [
        "B.Com", "M.Com", "Bachelor of Economics", "B.Com Honours", "M.Com Finance"
    ],
    "Management": [
        "BBA", "BMS", "MBA", "PGDM", "BHM"
    ],
    "Science": [
        "B.Sc Physics", "B.Sc Chemistry", "B.Sc Mathematics", "B.Sc Biology", "B.Sc Biotechnology"
    ],
    "Arts & Humanities": [
        "BA English", "BA History", "BA Political Science", "BA Sociology", "BA Psychology"
    ]
};
Department.addEventListener("change", function () {
    const selectedDepartment = this.value;
    // Clear previous courses
    courseSelect.innerHTML =
        '<option value="" selected>Select Course</option>';
    // If no department selected
    if (!selectedDepartment) {
        courseDiv.style.display = "none";
        return;
    }
    // Show course div
    courseDiv.style.display = "block";
    // Get courses for selected department
    const departmentCourses = courses[selectedDepartment];
    // Add courses
    departmentCourses.forEach(function(course) {
        const option = document.createElement("option");
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
    });
});


    Submit.addEventListener('click',()=>{
        'use strict'
        const FirstName=Firstname.value.trim()
        const LastName=Lastname.value.trim()
        const Email=EMail.value.trim()
        const PhnoneNumber=Phonenumber.value.trim()
        const age=Age.value.trim()
        let GEnder=Gender.value.trim()
        const department=Department.value.trim()
        const Course=courseSelect.value.trim()
        const Address=address.value.trim()
        const password=Password.value.trim()
        const confirmpassword=ConfirmPassword.value.trim()

        if(!FirstName && !LastName && !Email && !PhnoneNumber && !age && !GEnder &&  !Course && !Address && !password && !confirmpassword){
            showToast("All Field's are Required","error")
            return
        }

        if(!FirstName){
            showToast("FirstName Required","error")
            return
        }
        if(!LastName){
            showToast("LastName Required","error")
            return
        }
        if(!Email){
            showToast("Email Required","error")
            return
        }
        if(!PhnoneNumber){
            showToast("PhoneNumber Required","error")
            return
        }
        if(!age){
            showToast("Age Required","error")
            return
        }
        if(!GEnder){
            showToast("Gender Required","error")
            return
        }
        if(!password){
            showToast("Password Required","error")
            return
        }
        if(!confirmpassword){
            showToast("Confirm Password Required","error")
            return
        }
        if(confirmpassword) {
            if (password !== confirmpassword) {
                showToast("Password must be Same","error")
                return
            }
        }
        if(!department){
            showToast("Department Required","error")
            return
        }
        if(!Course){
                showToast("Course Required","error")
                return
            }
        if(!Address){
            showToast("Address Required","error")
            return
        }
        else {
            const reqbody = {
                firstName: FirstName,
                lastName: LastName,
                email: Email,
                phonenumber: PhnoneNumber,
                age: age,
                gender: GEnder,
                department,
                course: Course,
                address: Address,
                password
            }

            fetch("/addStudent",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(reqbody)
            })
                .then(response=>{
                    if(!response.ok){
                        showToast("Failed","error")
                        return 
                    }
                    return response.json()
                })
                .then(response =>{
                emptyField()
                    showToast("Add Successfully","success")

            })
        }
    });
    function emptyField(){
        Firstname.value = ""
        Lastname.value = ""
        EMail.value = ""
        Phonenumber.value = ""
        Age.value = ""
        Gender.value = ""
        Department.value = ""
        address.value = ""
        Password.value = ""
        ConfirmPassword.value = ""
    }
function showToast(message,Status) {
    toast.textContent = message;
    toast.classList.add("show");
    if(Status==="error"){
        toast.classList.add("error")
    }
    if(Status==="success"){
        toast.classList.add("success")
    }
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
