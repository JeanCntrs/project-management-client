import React, { useReducer } from 'react';
import TaskContext from './TaskContext';
import TaskReducer from './TaskReducer';
import axiosClient from '../../config/axios';
import {
    PROJECT_TASKS,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_tASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK,
    RESET_TASK_STATE
} from '../../types';

const TaskState = props => {

    const initialState = {
        projectTasks: [],
        currentTask: null,
        errorTask: false
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    const getProjectTasks = async project => {
        try {
            const result = await axiosClient.get('/api/tasks', { params: { project } });
            dispatch({
                type: PROJECT_TASKS,
                payload: result.data.currentTasks
            });
        } catch (error) {
 
        }
    }

    const addTask = async task => {
        try {
            await axiosClient.post('/api/tasks', task);
            dispatch({
                type: ADD_TASK,
                payload: task
            });
        } catch (error) {

        }
    }

    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        });
    }

    const deleteTask = async (id, project) => {
        try {
            await axiosClient.delete(`/api/tasks/${id}`, { params: { project } });
            dispatch({
                type: DELETE_tASK,
                payload: id
            });
        } catch (error) {
    
        }
    }

    const updateTask = async task => {
        try {
            const result = await axiosClient.put(`/api/tasks/${task._id}`, task);
            dispatch({
                type: UPDATE_TASK,
                payload: result.data.currentTask
            });
        } catch (error) {
          
        }
    }

    const saveCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        });
    }

    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        });
    }

    const resetTaskState = () => {
        dispatch({
            type: RESET_TASK_STATE,
        });
    }

    return (
        <TaskContext.Provider
            value={{
                projectTasks: state.projectTasks,
                currentTask: state.currentTask,
                errorTask: state.errorTask,
                getProjectTasks,
                addTask,
                validateTask,
                deleteTask,
                saveCurrentTask,
                updateTask,
                cleanTask,
                resetTaskState
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );

}

export default TaskState;