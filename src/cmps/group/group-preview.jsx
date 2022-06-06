import { useDispatch, useSelector } from "react-redux"
import { Draggable } from "react-beautiful-dnd"
import { utilService } from "../../services/util.service"
import { GroupHeader } from "./group-header"
import { TaskList } from "../task/task-list"
import { GroupFooter } from "./group-footer"
import { onUpdateGroup } from "../../store/board.action"

import { ReactComponent as ThreeDots } from '../../assets/icon/three-dot-menu.svg'
import { useState } from "react"
import { eventBusService } from "../../services/event-bus.service"



export const GroupPreview = ({ group, boardId, onToggleDetails, setIsLabelOpen, isLabelOpen, onDeleteGroup, }) => {
    const dispatch = useDispatch()
    const { currBoard } = useSelector(state => state.boardModule)
    const groupIdx = currBoard.groups.findIndex(currGroup => currGroup.id === group.id)
    const [groupTitle, setGroupTitle] = useState()
    const onChangeName = (val) => {
        let groupToUpdate = utilService.getDeepCopy(group)
        groupToUpdate.title = val
        // console.log(groupToUpdate)

        dispatch(onUpdateGroup(boardId, groupToUpdate))
    }
    // const onChangeName = (val) => {

    //     try {
    //         dispatch(onUpdateGroup(boardId, group.id, val))
    //     } catch (err) {
    //         throw err
    //     }
    // }
    const onSubmitTitle = ev => {
        if (ev) ev.preventDefault()
        let groupToUpdate = utilService.getDeepCopy(group)
        groupToUpdate.title = groupTitle
        dispatch(onUpdateGroup(boardId, groupToUpdate))

    }
    const onSendToOpen = (groupId) => {
        eventBusService.emit('open-group-modal', groupId)
    }

    const onHandleTitleChange = ev => {
        const { value } = ev.target
        setGroupTitle(prevTitle => prevTitle = value)
        console.log(groupTitle);
    }
    const deleteGroup = (ev) => {
        ev.preventDefault()
        onDeleteGroup(group.id)
    }

    return (

        <Draggable draggableId={group.id} index={groupIdx} key={group.id}>
            {(provided) => {
                return <section {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="group-preview" key={group.id}>

                    <div className="header-container">
                        <GroupHeader
                            key={group.id}
                            onSubmit={onSubmitTitle}
                            onHandleChange={onHandleTitleChange}
                            onChangeName={onChangeName}
                            title={groupTitle}
                        />
                        <button onClick={() => onSendToOpen(group.id)}>
                            <span>
                                <ThreeDots style={{ width: '15px' }} />
                            </span>
                        </button>
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


