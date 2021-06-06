export interface ModelInterface {
    getData: () => Task[];
}
export enum TaskStatus {
        Planned = "Planned",
        InProgress = "In progress",
        Done = "Done"
    }

export interface Task {
    id: number
    title: string
    description: string
    deadline: Date
    status: TaskStatus;
    }
    
export class Model {
    private tasks: Task[]
    constructor() {
        this.tasks = [
            {
                id: 0,
                title: "Project_1", 
                description: "creating the first web application", 
                deadline: new Date(2021 ,7,12), 
                status: TaskStatus.Planned
            },
            {
                id:1,
                title: "Project_2", 
                description: "creating a second web application", 
                deadline: new Date(2021, 9, 15),
                status: TaskStatus.Planned
            },
            {
                id:2,
                title: "Project_3", 
                description: "creating a third web application", 
                deadline: new Date(2021, 11, 11),
                status: TaskStatus.Planned
            },
        
        ]
    }
    getData():Task[] {
        return this.tasks
    }
}