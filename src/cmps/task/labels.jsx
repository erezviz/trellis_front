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


    useEffect(() => {
        (async () => {
            const newTask = await dispatch(queryTask(boardId, groupId, taskId))
            setTask(newTask)
        })();
        return () => {
            setTask(null)
        }
    }, [])

    useEffect(() => {
        setTask(prevTask => ({ ...prevTask, labelIds }))
        
    }, [labelIds])


    const onToggleLabel = async (labelId) => {
        const newLabelId = labelIds.find(currLabelId => currLabelId === labelId)
        if (newLabelId) {
            const newLabelIds = labelIds.filter(labelId => labelId !== newLabelId)
            setLabelIds(newLabelIds)
        } else {
            setLabelIds(prevLabelIds => ([...prevLabelIds, labelId]))

        }
        setTimeout(()=>console.log('task befor dispatch', task), 1500)
        
        await dispatch(updateTask(boardId, groupId, task))
    }

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