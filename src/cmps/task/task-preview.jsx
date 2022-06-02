import { Draggable } from "react-beautiful-dnd"
import { useSelector } from "react-redux"

export const TaskPreview = (props) => {
    const { task, idx } = props
    const board = useSelector(state => state.boardModule.currBoard)
    if (!board) return <></>
    return (
        <Draggable key={task.id} draggableId={task.id} index={idx}>
            {(provided) => {
                return <section {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                    className="task-preview">
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
                    </section>
                    <section className="members-task-preview">
                        {task.memberIds && board.members.map(member => {
                            return task.memberIds.map(memberId => {
                                if (member._id === memberId) {
                                    return <div key={memberId} className="member-task-preview">
                                        <img src={require(`../../assets/img/${member.imgUrl}`)} alt="" />
                                    </div>
                                }
                            });
                        })}
                    </section>
                    {provided.placeholder}
                </section>
            }}
        </Draggable>
    )
}