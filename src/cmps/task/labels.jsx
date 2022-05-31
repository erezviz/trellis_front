import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { queryTask, updateTask } from '../../store/board.action';
import pen from '../../assets/icon/pen.svg'



export const Labels = (props) => {
    let { params: { boardId, groupId, taskId } } = useRouteMatch();
    let [task, setTask] = useState(null)
    let [labelIds, setLabelIds] = useState([])
    const dispatch = useDispatch()
    // let task

    useEffect(() => {
        (async () => {
            const task = await dispatch(queryTask(boardId, groupId, taskId))
            setTask(prevTask => prevTask = task)

        })();
        return () => {
            // setTask(null)
        }
    }, [])

    useEffect(() => {
        // setTask(prevTask => ({ ...prevTask, labelIds }))
    }, [labelIds])


    const onToggleLabel = (labelId) => {
        // let newTask = {...task}
        console.log('task in onToggle ', task);
        // setTask(labelId)
        // console.log(task)
        if (!task.labelIds || task.labelIds.length <= 0) {
            console.log('this happened in first if');
            task.labelIds = [labelId]
            return dispatch(updateTask(boardId, groupId, task))
        } else {
            
            console.log('this happened in first else');
            const labelIdToRemove = task.labelIds.find(currLabelId => currLabelId === labelId) 
            if (labelIdToRemove) {
                const newLabelIds = labelIds.filter(labelId => labelId !== labelIdToRemove) 
                task.labelIds = newLabelIds 
                if(task.labelIds.length === 0) task.labelIds = null
                console.log('this happened in labelToRemove if');
            } else{
                task.labelIds.push(labelId)
                console.log('this happened in labelToRemove else');
                // onAddLabel(labelId) 
            }
            console.log(task)
            console.log('this happened before last dispatch');
            dispatch(updateTask(boardId, groupId, task))
        }
    }

    const onAddLabel = (labelId) => {
        task.labelIds.push(labelId)
        // setLabelIds(prevLabelIds => ([...prevLabelIds, labelId]))
    }

    
    console.log('this is task before render return', task);
    return (
        <section className="labels">
            <header>
                <h2>Labels</h2>
                <button className="close-btn close-labels" onClick={() => props.onToggleLabels()}></button>
            </header>
            <section className="main-labels">
                <span>Labels</span>
                <ul className="edit-labels">
                    {props.labels.map(label => {
                        return (
                            <li key={label.id}>
                                <div className="edit-icon"><img src={pen} alt="" /></div>
                                <span onClick={() => onToggleLabel(label.id)} className="card-label mod-selectable card-label" style={{ backgroundColor: label.color }} >{label.title}</span>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </section>
    )
}