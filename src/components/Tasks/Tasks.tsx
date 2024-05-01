import React, { useEffect, useState } from "react";
import styles from "./Tasks.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../features/tasks/TasksSlice";
import { deleteTask } from "../../features/tasks/TasksSlice";
import { Task } from "../../utils/types";

const Tasks = () => {
	const [localTasks, setLocalTasks] = useState<Task[]>([]);
	const [newTaskText, setNewTaskText] = useState("");
	const dispatch = useDispatch();

	const tasks = useSelector(
		(state: { tasks: { tasks: Task[] } }) => state.tasks.tasks
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTaskText(e.target.value);
	};

	const handleAddTask = () => {
		if (newTaskText.trim() !== "") {
			const newTask = {
				task: newTaskText,
				id: new Date().getTime().toString(),
			};
			dispatch(addTask(newTask));
			setNewTaskText("");
			setLocalTasks([...localTasks, newTask]);
			localStorage.setItem("tasks", JSON.stringify([...localTasks, newTask]));
		}
	};

	const handleDeleteTask = (id: string) => {
		localStorage.setItem(
			"tasks",
			JSON.stringify(localTasks.filter((task) => task.id !== id))
		);
		setLocalTasks(localTasks.filter((task) => task.id !== id));
		dispatch(deleteTask(id));
	};

	useEffect(() => {
		if (!tasks.length) {
			const storedTasks = localStorage.getItem("tasks");
			if (storedTasks) {
				setLocalTasks(JSON.parse(storedTasks));
				const parsedTasks: Task[] = JSON.parse(storedTasks);
				parsedTasks.forEach((task) => dispatch(addTask(task)));
			}
		}
	}, [dispatch, tasks]);

	return (
		<div className={styles.tasks}>
			<form onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="task">
					<h3>Add new task</h3>
				</label>
				<div className={styles.inputContainer}>
					<input
						onChange={(e) => handleInputChange(e)}
						value={newTaskText}
						type="text"
						name="task"
						id="task"
						placeholder="Add task"
					/>
					<button
						className={styles.button}
						onClick={handleAddTask}
						type="submit"
					>
						Add
					</button>
				</div>
			</form>
			<ol className={styles.taskContainer}>
				{tasks ? (
					tasks.map((task) => (
						<li key={task.id} id={task.id} className={styles.task}>
							<p>{task.task}</p>
							<div className={styles.taskButtons}>
								<button
									className={styles.deleteTask}
									onClick={() => handleDeleteTask(task.id)}
									type="button"
								>
									&#128465;
								</button>
							</div>
						</li>
					))
				) : (
					<p className={styles.noTasks}>No tasks</p>
				)}
			</ol>
		</div>
	);
};

export default Tasks;
