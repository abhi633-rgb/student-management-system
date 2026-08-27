
fetch("/Students",{
    method:"GET"
}).then(response=>{
    if(!response.ok){
        console.log("---Status----",response.status)
    }
    return response.json();
})
    .then(data=>{
        const tbody = document.getElementById("studentDetails")
        tbody.innerHTML=""
        if(data.length === "0"){
            tbody.innerHTML += `<tr>
                <td colspan="6">
                    <p class="course-badge" id="studentRecord">No Record Found.</p>
                    </td>
                    </tr>`
            return
        }
        data.forEach((student)=>{
            name = student.firstName+" "+student.lastName
            tbody.innerHTML += `
                <tr>
                    <td>${name}</td>
                    <td>${student.course}</td>
                    <td>${student.email}</td>
                    <td>${student.phonenumber}</td>
                    <td><button class="action-btn view-btn" data-id=${student.id} title="View Student">
                    <i class="fas fa-eye"></i></button></td>
                    <td><button class="action-btn delete-btn" data-id=${student.id} title="Delete Student">
                    <i class="fas fa-trash-alt"></i></button></td>
                </tr>
            `;
        })
        const deletebutton = document.querySelectorAll(".delete-btn")
            deletebutton.forEach(button=>{
                button.addEventListener('click',(e)=>{
                    const id = e.currentTarget.dataset.id;
                    fetch(`/deleteStudent/${id}`,{
                        method:"DELETE"
                    }).then(response=>{})
                        .then(response=>{
                            console.log("Delete SuccessFully")
                            location.reload();
                        })
                })
        })
        const viewbutton = document.querySelectorAll(".view-btn")
        viewbutton.forEach(button=>{
            button.addEventListener('click',(e)=>{
                const id = e.currentTarget.dataset.id;
            })
        })
    })

 // ===== TAB SWITCHING =====
 function switchTab(tab) {
     // Hide all sections
     document.querySelectorAll('.section-content').forEach(section => {
         section.style.display = 'none';
     });
     if(tab==="courses"){
         getAllCourses()
     }

     // Remove active class from all tabs
     document.querySelectorAll('.tab').forEach(t => {
         t.classList.remove('active');
     });

     // Show selected section
     const sectionMap = {
         'students': 'studentsSection',
         'courses': 'coursesSection',
         'teachers': 'teachersSection',
         'exams': 'examsSection',
         'finance': 'financeSection',
         'reports': 'reportsSection'
     };

     const sectionId = sectionMap[tab];
     if (sectionId) {
         document.getElementById(sectionId).style.display = 'block';
     }

     // Activate clicked tab
     const clickedTab = document.querySelector(`.tab[onclick="switchTab('${tab}')"]`);
     if (clickedTab) {
         clickedTab.classList.add('active');
     }
     if(sectionId ==="financeSection" || sectionId ==="reportsSection"){
         showNotification("Coming Soon......")
     }
     else {
         showNotification(`Switched to ${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
     }
 }

 // ===== NOTIFICATIONS =====
 function toggleNotifications() {
     const dropdown = document.getElementById('notificationDropdown');
     dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
 }

 // ===== MODAL =====
 function showQuickAdd() {
     document.getElementById('quickModal').style.display = 'flex';
 }

 function closeModal() {
     document.getElementById('quickModal').style.display = 'none';
 }

 function openModal(type) {
     if(type==="student") {
         window.location.href = "/addStudent"
     }
     if(type==="course") {
         window.location.href = "/addCourse"
     }
 }

 // ===== NEWS TICKER =====
 function toggleNews() {
     const content = document.getElementById('newsContent');
     const icon = document.getElementById('newsIcon');
     if (content.style.display === 'none') {
         content.style.display = 'block';
         icon.className = 'fas fa-chevron-up';
     } else {
         content.style.display = 'none';
         icon.className = 'fas fa-chevron-down';
     }
 }

 // ===== TOAST NOTIFICATION =====
 function showNotification(message) {
     const existing = document.querySelector('.toast-notification');
     if (existing) existing.remove();

     const toast = document.createElement('div');
     toast.className = 'toast-notification';
     toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
        `;
     document.body.appendChild(toast);

     setTimeout(() => {
         toast.style.opacity = '0';
         setTimeout(() => toast.remove(), 300);
     }, 3000);
 }
 //
 // // ===== NEWS API =====
 // (function() {
 //     let newsIndex = 0;
 //     let newsItems = [];
 //     const newsText = document.getElementById('newsText');
 //
 //     async function fetchNews() {
 //         try {
 //             const response = await fetch('https://api.currentsapi.services/v1/latest-news?language=en&apiKey=YOUR_API_KEY');
 //             if (!response.ok) throw new Error('API error');
 //             const data = await response.json();
 //             newsItems = data.news.slice(0, 10).map(item => item.title);
 //         } catch (error) {
 //             newsItems = [
 //                 '🎓 New Scholarship Program Announced for STEM Students',
 //                 '📚 Remote Learning Trends 2026: What\'s Next',
 //                 '🏆 University Launches Innovation Lab for Startups',
 //                 '🔒 Cybersecurity Courses See 40% Enrollment Increase',
 //                 '🌍 Study Abroad Programs Resume with New Protocols',
 //                 '💡 AI in Education: Transforming Classrooms Today'
 //             ];
 //         }
 //         showNextNews();
 //         setInterval(showNextNews, 5000);
 //     }
 //
 //     function showNextNews() {
 //         if (newsItems.length > 0) {
 //             newsText.textContent = newsItems[newsIndex];
 //             newsIndex = (newsIndex + 1) % newsItems.length;
 //         }
 //     }
 //
 //     fetchNews();
 // })();



 // ===== CLOSE MODAL ON CLICK OUTSIDE =====
 document.addEventListener('click', function(e) {
     const modal = document.getElementById('quickModal');
     if (e.target === modal) {
         closeModal();
     }
 });

function getAllCourses(){
    fetch("/getAllCourses",{
        method:"Get"
    })
        .then((response)=>{
            if(!response.ok){
                console.log("-----Statue----",response.status)
            }
            return response.json()
        }).then((data)=>{

        const tbody = document.getElementById("courseDetails")
        tbody.innerHTML=""
        if(data.length === "0"){
            tbody.innerHTML += `<tr>
                <td colspan="6">
                    <p class="course-badge" id="studentRecord">No Record Found.</p>
                    </td>
                    </tr>`
            return
        }
        data.forEach((course)=>{
            tbody.innerHTML += `
                <tr>
                <td>${course.code}</td>
                <td>${course.subject}</td>
                <td>${course.department}</td>
                <td>${course.type}</td>
                <td>${course.instructor}</td>
                <td>
                <button class="action-btn view-btn"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn"><i class="fas fa-trash-alt"></i></button>
                </td>
                </tr>
            `;
        })
    })
}
const logoutBtn = document.getElementById("log-out");

logoutBtn.addEventListener("click", async () => {
    console.log("--press---")

    try {
        const response = await fetch("/logout", {
            method: "POST"
        });

        if (!response.ok) {
            window.location.href = "/";
        } else {
            console.log("Logout failed:", response.status);
        }

    } catch (error) {
        console.error("Logout error:", error);
    }
});