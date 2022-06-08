import { useDispatch, useSelector } from "react-redux"
import { Draggable } from "react-beautiful-dnd"

import { eventBusService } from "../../services/event-bus.service"
import { utilService } from "../../services/util.service"
import { onUpdateGroup } from "../../store/board.action"

import { GroupHeader } from "./group-header"
import { TaskList } from "../task/task-list"
import { GroupFooter } from "./group-footer"

import { ReactComponent as ThreeDots } from '../../assets/icon/three-dot-menu.svg'

export const GroupPreview = ({ group, boardId, onToggleDetails, setIsLabelOpen, isLabelOpen }) => {
    const dispatch = useDispatch()
    const { currBoard } = useSelector(state => state.boardModule)
    const groupIdx = currBoard.groups.findIndex(currGroup => currGroup.id === group.id)

    const onChangeName = (val) => {
        let groupToUpdate = utilService.getDeepCopy(group)
        groupToUpdate.title = val
        dispatch(onUpdateGroup(boardId, groupToUpdate))
    }

    const onSendToOpen = (groupId) => {
        eventBusService.emit('open-group-modal', groupId)
    }

    return (
        <Draggable draggableId={group.id} index={groupIdx} key={group.id}>
            {(provided) => {
                return <section
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="group-preview"
                    key={group.id}
                >
                    <div className="header-container">
                        <GroupHeader
                            key={group.id}
                            onChangeName={onChangeName}
                            title={group.title}
                        />
                        <button onClick={() => onSendToOpen(group.id)}>
                            <span>
                                <ThreeDots style={{ width: '15px' }} />
                            </span>
                        </button>
                    </div>
                    <div className="task-list-container">
                        <TaskList
                            isLabelOpen={isLabelOpen}
                            idx={groupIdx}
                            setIsLabelOpen={setIsLabelOpen}
                            groupId={group.id}
                            boardId={boardId}
                            tasks={group.tasks}
                            onToggleDetails={onToggleDetails} />
                    </div>
                    <div className="task-footer-container">
                        <GroupFooter boardId={boardId} group={group} />
                    </div>
                    {provided.placeholder}
                </section>
            }}
        </Draggable>
    )
}