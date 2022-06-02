import { GroupPreview } from "./group-preview"

import { TrellisSpinner } from "../util-cmps/trellis-spinner"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { useDispatch, useSelector } from "react-redux"
import { updateWholeBoard } from "../../store/board.action"
import { useEffect } from "react"

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
            board.groups.splice(source.index, 1)
            board.groups.splice(destination.index, 0, group)
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
         dispatch(updateWholeBoard(board))

    }

    if(!groups || !currBoard) return <TrellisSpinner/>

        return(
            <DragDropContext onDragEnd={onDragEnd} id={currBoard._id}>
                <section className="group-list">
            {groups.map((group, idx)=>{
               return <Droppable key={group.id} droppableId="group-list" direction="horizontal" type="column">
                    {(provided)=>{
                        return <div {...provided.droppableProps} ref={provided.innerRef}>
                        
                             <GroupPreview boardId={boardId} onToggleDetails={onToggleDetails} onDeleteGroup={onDeleteGroup} group={group} key={group.id} />
                        </div>
                    }}
                </Droppable>
            })}
            </section>
            </DragDropContext>
        )
    
}