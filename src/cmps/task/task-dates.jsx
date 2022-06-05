import { DatePicker, TimePicker } from '@material-ui/pickers'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { utilService } from '../../services/util.service';
import { updateTask } from '../../store/board.action'

import { ReactComponent as Close } from '../../assets/icon/close.svg'

export const TaskDate = (props) => {
    let { params: { boardId, groupId } } = useRouteMatch()
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch()


    const onSaveDate = () => {
        const newTask = utilService.getDeepCopy(props.task)
        const newDate = date._d.toString().substring(0, 10)
        console.log(typeof date._d.toString());
        newTask.dueDate = newDate
        console.log(newTask);
        dispatch(updateTask(boardId, groupId, newTask))
        props.onToggleDates(false)
    }

    const onRemoveDate = () => {
        const newTask = utilService.getDeepCopy(props.task)
        newTask.dueDate = null
        dispatch(updateTask(boardId, groupId, newTask))
        props.onToggleDates(false)
    }

    return (
        <section className="task-dates">
            <header>
                <h2 className="header-title">Dates</h2>
                <button onClick={() => props.onToggleDates(false)}>
                    <span>
                        <Close />
                    </span>
                </button>
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