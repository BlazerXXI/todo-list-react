import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../utils/types";

const initialState: { tasks: Task[] } = {
	tasks: [],
};

export const tasksReducer = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		addTask: (state, action) => {
			console.log("dispatching addTask");
			state.tasks.push(action.payload);

			console.log(state.tasks[0]);
		},
		deleteTask: (state, action) => {
			const taskIdToDelete = action.payload;
			state.tasks = state.tasks.filter((task) => task.id !== taskIdToDelete);
			console.log("dispatching deleteTask");
		},
	},
});

export const { addTask, deleteTask } = tasksReducer.actions;

export default tasksReducer.reducer;
