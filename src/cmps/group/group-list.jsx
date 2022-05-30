import { GroupPreview } from "./group-preview"

import { TrellisSpinner } from "../util-cmps/trellis-spinner"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { useDispatch, useSelector } from "react-redux"
import { updateWholeBoard } from "../../store/board.action"

export const GroupList = ({ groups, onDeleteGroup, boardId, onToggleDetails }) => {
    let { currBoard } = useSelector(state => state.boardModule)
    const dispatch = useDispatch()




    const onDragEnd = async (res) => {
        const board = JSON.parse(JSON.stringify(currBoard))
        const { destination, source, draggableId, type } = res
        console.log('res', res)
        if (!destination) return
        // moving groups 
        else if (type === 'column') {
            const group = board.groups.find(currGroup => currGroup.id === draggableId)
            // console
            board.groups.splice(source.index, 1)
            board.groups.splice(destination.index, 0, group)
            // dispatch(updateWholeBoard(board))
        }
        else if (type === 'task') {
            const groupStart = board.groups.find(currGroup => currGroup.id === source.droppableId)
            const groupFinish = board.groups.find(currGroup => currGroup.id === destination.droppableId)
            const draggableTask = groupStart.tasks.find(task => task.id === draggableId)
            const groupStartIdx = board.groups.findIndex(currGroup => currGroup.id === source.droppableId)
            const groupFinishIdx = board.groups.findIndex(currGroup => currGroup.id === destination.droppableId)
            // moving tasks on the same group
            if (groupStart === groupFinish) {
                groupStart.tasks.splice(source.index, 1)
                groupStart.tasks.splice(destination.index, 0, draggableTask)
                board.groups.splice(groupStartIdx, 1)
                board.groups.splice(groupStartIdx, 0, groupStart)
            }
            // moving tasks on different groups
            else if (groupStart !== groupFinish) {
                groupStart.tasks.splice(source.index, 1)
                groupFinish.tasks.splice(destination.index, 0, draggableTask)
                board.groups.splice(groupStartIdx, 1)
                board.groups.splice(groupFinishIdx, 1)
                board.groups.splice(groupStartIdx, 0, groupStart)
                board.groups.splice(groupFinishIdx, 0, groupFinish)
            }
        }
        // currBoard = board
        try {
            await dispatch(updateWholeBoard(board))
            // currBoard = newBoard
        } catch (err) {
            console.log('error', err)
        }
    }

    if(!groups || !currBoard) return <TrellisSpinner/>
    // console.log(currBoard._id)
 
    return (
        <DragDropContext onDragEnd={onDragEnd} id={currBoard._id}>
            <Droppable droppableId="group-list" direction="horizontal" type="column">
                {(provided) => {
                    return <section className="group-list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {groups.map((group, idx) => {
                            const props = {
                                boardId,
                                onToggleDetails,
                                onDeleteGroup,
                                group
                            }
                            return <GroupPreview {...props} key={group.id} />
                        }
                        )}
                        {provided.placeholder}
                    </section>
                }}
            </Droppable>
        </DragDropContext>
    )

}
