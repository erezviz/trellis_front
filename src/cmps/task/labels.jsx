
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { updateTask } from '../../store/board.action';
import pen from '../../assets/icon/pen.svg'
import {ReactComponent as Close} from '../../assets/icon/close.svg'


export const Labels = (props) => {
    let { params: { boardId, groupId } } = useRouteMatch();
    const dispatch = useDispatch()


    const onToggleLabel = async (labelId) => {
        console.log(props.task);
        const newTask = { ...props.task }
        const newLabelId = props.task.labelIds ? props.task.labelIds.find(currLabelId => currLabelId === labelId) : null
        if (newLabelId) {
            const newLabelIds = props.task.labelIds.filter(labelId => labelId !== newLabelId)
            newTask.labelIds = newLabelIds
        } else {
            if (!newTask.labelIds) newTask.labelIds = [labelId]
            else newTask.labelIds = [...newTask.labelIds, labelId]
        }
        console.log('newTask', newTask);

        dispatch(updateTask(boardId, groupId, newTask))
    }

    return (
        <section className="labels">
            <header>
                <h2>Labels</h2>
                <button className="close-labels" onClick={() => props.onToggleLabels(false)}>
                    <span>
                    <Close style={{width: '10px'}}/>
                    </span>
                </button>
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