import { GroupPreview } from "./group-preview"
import {DragDropContext} from "react-beautiful-dnd"
import { useSelector } from "react-redux"

export const GroupList = ({ groups, onDeleteGroup, boardId, onToggleDetails }) => {
    const { currBoard } = useSelector(state => state.boardModule)

    const onDragEnd=(res)=>{
        const {destination, source, draggableId} = res
        console.log('res',res)
        if (!destination) return
        const groupStart = currBoard.groups.find(currGroup=> currGroup.id === source.droppableId)
        const groupFinish = currBoard.groups.find(currGroup=> currGroup.id === destination.droppableId)
        const draggableTask = groupStart.tasks.find(task=> task.id === draggableId)
        const groupStartIdx = currBoard.groups.findIndex(currGroup=> currGroup.id === source.droppableId)
        const groupFinishIdx = currBoard.groups.findIndex(currGroup=> currGroup.id === destination.droppableId)
        // moving tasks on the same group
        if (groupStart===groupFinish){
            groupStart.tasks.splice(source.index, 1)
            groupStart.tasks.splice(destination.index,0,draggableTask)
            currBoard.groups.splice(groupStartIdx, 1)
            currBoard.groups.splice(groupStartIdx,0,groupStart)
        }
        // moving tasks on different groups
        if(groupStart !== groupFinish){ 
            groupStart.tasks.splice(source.index, 1)
            groupFinish.tasks.splice(destination.index,0,draggableTask)
            currBoard.groups.splice(groupStartIdx, 1)
            currBoard.groups.splice(groupFinishIdx, 1)
            currBoard.groups.splice(groupStartIdx,0,groupStart)
            currBoard.groups.splice(groupFinishIdx,0,groupFinish)
        }
    }

    if(!groups) return <>Loading...</>
    return (
        <DragDropContext onDragEnd={onDragEnd} id={currBoard}>
        <section className="group-list">
            {groups.map((group,idx) => {
                const props = {
                    boardId,
                    onToggleDetails,
                    onDeleteGroup,
                    group
                }
                return <GroupPreview {...props} key={group.id}/>
            }
            )}
          
        </section>
        </DragDropContext>
    )
    
}
