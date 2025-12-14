interface User {
    name:string
    profilePhoto:string
    gender:string
    createdAt:Date
    updatedAt:Date
}

interface Task {
    title:string
    description:string
    dueDate:Date
    priority:Priority
    status:Status
    creatorId:string
    assignedToId:string
}


enum Priority {
    Low = "Low",
    Medium = "Medium",
    High = "High",
    Urgent = "Urgent"
}

enum  Status {
    To_Do = "To Do",
    In_Progress = "In Progress",
    Review  = "Review",
    Completed = "Completed"
}


interface Notification {
    message:string,
    type:Type,
    category:NotificationCategory
    visitId:string
    createdAt:Date
    updatedAt:Date
}


enum NotificationCategory {

}

enum Type   {
 
}