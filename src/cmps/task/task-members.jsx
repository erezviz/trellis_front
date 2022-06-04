import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { updateTask } from '../../store/board.action';
import pen from '../../assets/icon/pen.svg'
import { utilService } from '../../services/util.service'

import {ReactComponent as Close} from '../../assets/icon/close.svg'

export const TaskMembers = (props) => {
    let { params: { boardId, groupId } } = useRouteMatch();
    const dispatch = useDispatch()


    const onToggleMember = async (memberId) => {
        console.log(props.task)
        const newTask = utilService.getDeepCopy(props.task)
        const newMemberId = props.task.memberIds ? props.task.memberIds.find(currMemberId => currMemberId === memberId) : null
        if (newMemberId) {
            const newMemberIds = props.task.memberIds.filter(memberId => memberId !== newMemberId)
            newTask.memberIds = newMemberIds
        } else {
            if (!newTask.memberIds) newTask.memberIds = [memberId]
            else newTask.memberIds = [...newTask.memberIds, memberId]
        }
        console.log('newTask', newTask)
        dispatch(updateTask(boardId, groupId, newTask))
    }
    console.log('members', props.members);
    return (
        <section className="task-members">
            <header>
                <h2>Members</h2>
                <button className="close-members" onClick={() => props.onToggleMembers(false)}>
                    <span>
                        <Close/>
                    </span>
                </button>
            </header>
            <section className="main-members">
                <span>Members</span>
                <ul className="edit-members">
                    {props.members.map(member => {
                        return (
                            <li onClick={() => onToggleMember(member._id)} key={member._id}>
                                <div className="member-img">
                                    <img src={require(`../../assets/img/${member.imgUrl}`)} alt="" />
                                </div>
                                <p  className="card-member mod-selectable" >{member.fullname}</p>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </section>
    )
}