export interface TaskData {
  title: string;
  isCompleted: boolean;
  priorityLevel: number;
  complexityLevel: number;
  dueDate: string;
  dueTime: string;
  subtasks: { subtask: string; isCompleted: boolean; id: string }[];
  tags: string[];
  id: string;
}

export interface SubtaskData {
  subtask: string;
  isCompleted: boolean;
  id: string;
}
