import { Draggable } from "react-beautiful-dnd"
import { useSelector } from "react-redux"
import { ReactComponent as Date } from '../../assets/icon/dates-icon.svg'
// import { ReactComponent as Attachment } from '../../assets/icon/attachment-icon.png'
// import { ReactComponent as Checklist } from '../../assets/icon/checklist-icon.png'
// import { ReactComponent as Description } from '../../assets/icon/description-icon.png'

export const TaskPreview = (props) => {
    const { task, idx } = props
    const board = useSelector(state => state.boardModule.currBoard)
    if (!board) return <></>
    return (
        <Draggable key={task.id} draggableId={task.id} index={idx}>
            {(provided) => {
                return <section {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                    className="task-preview">
                    {task.cover && <div className='task-preview-cover' style={{ backgroundColor: `${task.cover}` }}></div>}
                    <section className="labels-task-preview">
                        {task.labelIds && board.labels.map(label => {
                            return task.labelIds.map(labelId => {
                                if (label.id === labelId) {
                                    return <div onClick={() => props.setIsLabelOpen(!props.isLabelOpen)}
                                        key={labelId} className="label-task-preview"
                                        style={{ backgroundColor: label.color }}>
                                        {props.isLabelOpen && <span>{label.title}</span>}
                                    </div>
                                }
                            })
                        })}
                    </section>
                    <section onClick={() => props.onToggleDetails()} className="main-preview">
                        <h5>{task.title}</h5>
                    <div className="flex-space-between">
                    <section className="icon-previews">
                        {task.dueDate && <span><Date/></span>}
                        {task.attachments && <span><img className="icon-preview" src={require('../../assets/icon/attachment-icon.png')} alt="" /></span>}
                        {task.checklist && <span><img className="icon-preview" src={require('../../assets/icon/checklist-icon.png')} alt="" /></span>}
                        {task.description && <span><img className="icon-preview" src={require('../../assets/icon/description-icon.png')} alt="" /></span>}
                    </section>
                    <section className="members-task-preview">
                        {task.memberIds && board.members.map(member => {
                            return task.memberIds.map(memberId => {
                                if (member._id === memberId) {
                                    return <div key={memberId} className="member-task-preview">
                                        <img src={member.imgUrl} alt="" />
                                    </div>
                                }
                            });
                        })}
                    </section>
                    
                </div>
                        </section>
                    {provided.placeholder}
                </section>
            }}
        </Draggable>
    )
}