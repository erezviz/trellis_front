import { DatePicker } from '@material-ui/pickers'
import { useState } from 'react';



export const TaskDate = (props) => {
    const [date, changeDate] = useState(new Date());


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
                onChange={changeDate}
                />
                </div>
                <div className="btns">
                <button className="save-date">Save</button>
                <button className="remove-date">Remove</button>
                </div>
                </section>
        </section>
    )
}