import { useDispatch, useSelector } from "react-redux"
import { Draggable } from "react-beautiful-dnd"

import { GroupHeader } from "./group-header"
import { TaskList } from "../task/task-list"
import { GroupFooter } from "./group-footer"
import { onUpdateGroup } from "../../store/board.action"


export const GroupPreview = ({ group, boardId, onToggleDetails,setIsLabelOpen, isLabelOpen, onDeleteGroup }) => {
    const dispatch = useDispatch()
    const { currBoard } = useSelector(state => state.boardModule)
    const groupIdx = currBoard.groups.findIndex(currGroup => currGroup.id === group.id)

    const onChangeName = () => {
        const newName = prompt('new Name?')
        try {
            dispatch(onUpdateGroup(boardId, group.id, newName))
        } catch (err) {
            throw err
        }
    }

    return (
        <Draggable draggableId={group.id} index={groupIdx} key={group.id}>
            {(provided) => {
                return <section {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="group-preview" key={group.id}>

                    <div className="header-container">
                        <GroupHeader key={group.id} onChangeName={onChangeName} 
                        title={group.title} />
                        <button onClick={() => onDeleteGroup(group.id)}>X</button>
                    </div>
                    <div className="task-list-container">
                        <TaskList isLabelOpen={isLabelOpen} idx={groupIdx}
                            setIsLabelOpen={setIsLabelOpen}
                            groupId={group.id}
                            boardId={boardId}
                            tasks={group.tasks}
                            onToggleDetails={onToggleDetails} />
                    </div>
                    <div className="task-footer-container">
                        <GroupFooter boardId={boardId} groupId={group.id} />
                    </div>
                    {provided.placeholder}
                </section>
            }}
        </Draggable>
    )
}