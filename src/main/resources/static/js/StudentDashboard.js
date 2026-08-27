const Name = document.getElementById("profileName")
const Identity = document.getElementById("profileId")
const Email = document.getElementById("profileEmail")
const Phone = document.getElementById("profileNumber")
const Course = document.getElementById("profileCourse")
const id = sessionStorage.getItem("LongedInId");
const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const color = ["#667eea","#38a169","#dd6b20","#805ad5"]

fetch(`/Students/${id}`,{
}).then(async response=>{
    if(!response.ok){
        console.log("---Status---",response.status)
    }
    const data = await response.json();
    const name = data.firstName+" "+data.lastName
    Name.textContent = name
    Identity.textContent = "STU-2026-00"+data.id
    Email.textContent = data.email
    Phone.textContent = data.phonenumber
    Course.textContent = data.course

    getEventByDepartment(data.course)
    getCourseByDepartment(data.course)
})
document.getElementById("addactivity").addEventListener('click',()=>{
    document.getElementById("addActivityModal").classList.add("active")
})

document.getElementById("closeActivityBtn").addEventListener('click',()=>{
    document.getElementById("addActivityModal").classList.remove("active")
    document.getElementById('addActivityForm').reset();
})

document.getElementById("btn-logOut").addEventListener('click',()=>{
    sessionStorage.clear()
    window.location.href = '/'
})

function getEventByDepartment(course){
    fetch(`/admin/AddEvent/${course}`,{
        method:"GET"
    }).then(response=>{
        if(!response.ok){

        }
        return response.json()
    }).then(data=>{
        const div = document.getElementById("Event-div-body")
        div.innerHTML = ""
        if(data.length==="0"){
            return
        }

        data.forEach((items)=>{
            const[year,month,day]=items.eventDate.split("-");
            let Month = Number(month)
            div.innerHTML += ` <div class="event-item">
                    <div class="event-date">
                        <span class="day">${day}</span>
                        <span class="month">${Months[Month]}</span>
                    </div>
                    <div class="event-details">
                        <div class="event-title">${items.eventTitle}</div>
                        <div class="event-time"><i class="far fa-clock"></i>${items.eventTime}</div>
                        <span class="status" style="color: forestgreen">${items.eventStatus}</span>
                    </div>
                    </div>`
        })
    })
}

function getCourseByDepartment(department){
    fetch(`/department/${department}`,{
    }).then(response=>{
        if(!response.ok){

        }
        return response.json()
    }).then(data=>{

        document.getElementById("EnrollCourse-Number").textContent = data.length
        const courseDiv = document.getElementById("Enroll-course-div")
        courseDiv.innerHTML=""
        data.forEach((index)=>{
            const courseColor = color.shift();
            color.push(courseColor);
            const progress = index.credits ? Math.round((index.credits / 10) * 100) : 0;
            courseDiv.innerHTML+=`<div class="course-item">
                    <div class="course-info">
                        <div class="course-color" style="background:${courseColor} "></div>
                        <span class="course-name">${index.name}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div class="course-progress">
                            <div class="course-progress-bar" style="width: ${progress}%; background:${courseColor}"></div>
                        </div>
                        <span class="course-grade">${progress}%</span>
                    </div>
                </div>`
        })
    })
}