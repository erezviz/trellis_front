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
        console.log('biglal Roi', props.labels);
        (async () => {
            const newTask = await dispatch(queryTask(boardId, groupId, taskId))
            console.log('this is newTask', newTask);
            setTask(newTask)
        })();
        return () => {
            setTask(null)
        }
    }, [])

    useEffect(() => {
        setTask(prevTask => ({ ...prevTask, labelIds }))
    }, [labelIds])

    const onToggleLabel = (labelId) => {
        // const newLabelIds= labelIds.find()
        const newLabelId = labelIds.find(currLabelId => currLabelId === labelId)
        console.log('from onToggle', newLabelId)
        if (newLabelId) {
            const newLabelIds = labelIds.filter(labelId => labelId !== newLabelId)
            console.log(newLabelIds);
            setLabelIds(prevLabelIds => prevLabelIds = newLabelIds)
        } else onAddLabel(labelId)

    }

    const onAddLabel = (labelId) => {


        setLabelIds(prevLabelIds => ([...prevLabelIds, labelId]))
        // setTask(prevTask => ({ ...prevTask, ...labelIds:labelId }))

    }
    console.log('Erez ata Melech', labelIds)
    console.log('helllllloh', task)
    return (
        <section className="labels">
            <header>
                <h2>labels</h2>
            </header>
            <section className="main-labels">
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