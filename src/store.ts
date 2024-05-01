import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasks/TasksSlice.ts";

export default configureStore({
	reducer: {
		tasks: tasksReducer,
	},
});
