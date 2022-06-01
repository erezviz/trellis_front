import { DatePicker } from '@material-ui/pickers'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { utilService } from '../../services/util.service';
import {  updateTask } from '../../store/board.action'


export const TaskDate = (props) => {
    let { params: { boardId, groupId } } = useRouteMatch()
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch()


    const onSaveDate = () => {
        const newTask = utilService.getDeepCopy(props.task)
        const newDate = date._d.toString() 
        console.log(typeof date._d.toString());
        newTask.dueDate = newDate
        console.log(newTask);
        dispatch(updateTask(boardId, groupId, newTask))
    }

    const onRemoveDate = () =>{
        const newTask = utilService.getDeepCopy(props.task)
        newTask.dueDate = null
        dispatch(updateTask(boardId, groupId, newTask))
    }

    return (
        <section className="task-dates">
            <header>
                <h2 className="heder-title">Dates</h2>
                <button className="close-btn close-labels" onClick={() => props.onToggleDates(false)}></button>
            </header>
            <section className="main-dates">
                <div className="date-board">
                    <DatePicker
                        autoOk
                        disableToolbar

                        // emptyLabel
                        // orientation="landscape"
                        variant="static"
                        openTo="date"
                        value={date}
                        onChange={setDate}
                    />
                </div>
                <div className="btns">
                    <button className="save-date" onClick={() => onSaveDate()}>Save</button>
                    <button className="remove-date" onClick={() => onRemoveDate()}>Remove</button>
                </div>
            </section>
        </section>
    )
}