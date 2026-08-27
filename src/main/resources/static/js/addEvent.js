const submit = document.getElementById("eventSubmit")
submit.addEventListener('click',(e)=>{
    const EventTitle = document.getElementById("eventTitle").value
    const EventDescription = document.getElementById("eventDescription").value
    const EventDate = document.getElementById("eventDate").value
    const EventTimeZone = document.getElementById("eventTime").value
    const EventCourse = document.getElementById("eventCourse").value
    const EventType = document.getElementById("eventType").value
    const EventPriorty = document.querySelector('input[name=\"priority\"]:checked').value
    const EventStatus = document.getElementById("eventStatus").value
    const EventNotes = document.getElementById("eventNotes").value
    const EventForm = document.getElementById("eventForm")
    submit.disable = true;

    let isValid = true;

    if(EventTitle===""){
        isValid = false;
    }
    if(EventDescription===""){
        isValid = false;
    }
    if(EventDate===""){
        isValid = false;
    }
    if(EventTimeZone===""){
        isValid = false;
    }
    if(EventType===""){
        isValid = false;
    }
    if(EventPriorty===""){
        isValid = false;
    }
    if(EventPriorty===""){
        isValid = false;
    }
    if(EventNotes===""){
        isValid = false;
    }
    if(!isValid){
     alert("All Field are Required")
    }
    else {
        // Change Time to 12hr Format
        const [hour, minute] = EventTimeZone.split(":");
        let h = Number(hour);
        const ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;

        const EventTime = `${h}:${minute} ${ampm}`

        const jsonbody = {
            eventTitle: EventTitle,
            eventDescription: EventDescription,
            eventDate: EventDate,
            eventTime: EventTime,
            eventCourse: EventCourse,
            eventType: EventType,
            eventPriorty: EventPriorty,
            eventStatus: EventStatus,
            eventNotes: EventNotes
        }

        fetch("/admin/AddEvent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonbody)

        }).then(response => {
            if (!response.ok) {
            }
            return response.json()
        }).then(response => {
            EventForm.reset()
        })
    }
})