import { Task } from "./model"
type TaskElement = {
    id: number;
    title: string;
    description: string;
    deadline: Date;
};

export class View {
    private container: HTMLElement;
    private Planned: HTMLElement;
    private plannedHeader: HTMLElement;
    private InProgress: HTMLElement;
    private inProgressHeader: HTMLElement;
    private Done: HTMLElement;
    private doneHeader: HTMLElement;

    constructor() {
        this.container = this.createElement("div", "column-container");
        document.body.append(this.container);
        this.Planned = this.createElement("div", "column-planned");
        this.Planned.addEventListener("dragover", this.onDragOver);
        this.Planned.addEventListener("drop", this.onDrop);
        this.InProgress = this.createElement("div", "column-progress");
        this.InProgress.addEventListener("dragover", this.onDragOver);
        this.InProgress.addEventListener("drop", this.onDrop);
        this.Done = this.createElement("div", "column-done");
        this.Done.addEventListener("dragover", this.onDragOver);
        this.Done.addEventListener("drop", this.onDrop);
        this.container.append(this.Planned, this.InProgress, this.Done);
        this.plannedHeader = this.createElement("p", "planned-header", "Planned");
        this.Planned.append(this.plannedHeader);
        this.inProgressHeader = this.createElement("p", "progress-header", "In progress");
        this.InProgress.append(this.inProgressHeader);
        this.doneHeader = this.createElement("p", "done-header", "Done");
        this.Done.append(this.doneHeader);
    };

    renderTask(task: TaskElement): void {
        const taskContainer = this.createElement("div", "drag-task");
        taskContainer.setAttribute("draggable", "true");
        taskContainer.id = "task: " + task.id;
        this.Planned.append(taskContainer);
        const taskTitle = this.createElement("p", "task-title", task.title);
        const taskDescription = this.createElement("p", "task-descript", task.description);
        const taskDeadLine = this.createElement("p", "task-deadline", task.deadline.toDateString());
        taskContainer.append(taskTitle, taskDeadLine, taskDescription);
    };
    
    renderList(tasks: Task[]): void {
        for (const i in tasks) {
            this.renderTask(tasks[i]);
        };
    };

    onDragStart = (event: Event): void => {
        (event as DragEvent).dataTransfer?.setData("text/plain", (event.target as Element).id);
        (event.currentTarget as HTMLElement).style.border = "solid 3px rgba(128, 53, 30, 0.829)";
    };

    onDragOver = (event: Event): void => {
        event.preventDefault();
    };

    onDrop = (event: DragEvent): void => {
        const id = event.dataTransfer?.getData("text/plain");
        if (id) {
            const draggableElement = document.getElementById(id);
            console.log(draggableElement);
            if (draggableElement) {
                const dropzone = event.target as HTMLElement;
                dropzone.appendChild(draggableElement);
                event.dataTransfer?.clearData;
            };
        };
    };

    dragAndDrop = (): void => {
        this.container.addEventListener("mousedown", (event) => {
            if ((event.target as HTMLElement).hasAttribute("draggable")) {
                (event.target as HTMLElement).addEventListener("dragstart", this.onDragStart);
            };
        });
    }

    createElement(tag: string, className?: string, content?: string): HTMLElement {
        const element: HTMLElement = document.createElement(tag);
        if (className) element.classList.add(className);
        if (content) element.textContent = content;
        return element;
    };
}



