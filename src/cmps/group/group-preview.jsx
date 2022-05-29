import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { connect } from 'react-redux'
import {DragDropContext} from "react-beautiful-dnd"


import { GroupHeader } from "./group-header"
import { TaskList } from "../task/task-list"
import { GroupFooter } from "./group-footer"
import { onUpdateGroup} from "../../store/board.action"


export const GroupPreview = (props) => {
    const dispatch = useDispatch()
  const [group, setGroup] = useState(props.group)
  const { currBoard } = useSelector(state => state.boardModule)
  const groupIdx = currBoard.groups.findIndex(currGroup=> currGroup.id === group.id)
  
  useEffect(()=>{
      (async=>{
        //  console.log('group preview', currBoard)
        try{ 
            const currGroup = currBoard.groups.find(boardGroup=>{
                return boardGroup.id === group.id
              })
              if (!currGroup) return
              setGroup(currGroup)

        }catch(err){
            throw err
        }
    })();
  },[currBoard])

    const {boardId} = props

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
            console.log('im in!')
            groupStart.tasks.splice(source.index, 1)
            groupFinish.tasks.splice(destination.index,0,draggableTask)
            currBoard.groups.splice(groupStartIdx, 1)
            currBoard.groups.splice(groupFinishIdx, 1)
            currBoard.groups.splice(groupStartIdx,0,groupStart)
            currBoard.groups.splice(groupFinishIdx,0,groupFinish)
        }
    }

    const onChangeName=async()=>{
        const newName = prompt('new Name?')
        try{
            dispatch(onUpdateGroup(boardId, group.id, newName))
        }catch(err){
            throw err
        }
    }

   

    return (
        <section className="group-preview" key={group.id}>
            
            <div className="header-container">
            <GroupHeader key={group.id} onChangeName={onChangeName} title={group.title}/>
            <button onClick={()=>props.onDeleteGroup(group.id)}>X</button>
            </div>
            <DragDropContext onDragEnd={onDragEnd} id={group.id}>
            <div className="task-list-container">
            <TaskList idx={groupIdx} groupId={props.group.id} boardId={boardId} tasks={group.tasks} onToggleDetails={props.onToggleDetails}/>
            </div>
            </DragDropContext>
            <div className="task-footer-container">
            <GroupFooter boardId={boardId} groupId={props.group.id} />
            </div>
        </section>
    )
}