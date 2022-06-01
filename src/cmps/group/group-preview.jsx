import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {Droppable, Draggable} from "react-beautiful-dnd"

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

    const onChangeName=async()=>{
        const newName = prompt('new Name?')
        try{
            dispatch(onUpdateGroup(boardId, group.id, newName))
        }catch(err){
            throw err
        }
    }

    return (
        <Draggable draggableId={group.id} index={groupIdx}>
            {(provided)=>{
           return  <section {...provided.dragHandleProps} 
        {...provided.draggableProps}
        ref={provided.innerRef}
         className="group-preview" key={group.id}>
            
            <div className="header-container">
            <GroupHeader key={group.id} onChangeName={onChangeName} title={group.title}/>
            <button onClick={()=>props.onDeleteGroup(group.id)}>X</button>
            </div>
            <div className="task-list-container">
            <TaskList idx={groupIdx} groupId={props.group.id} boardId={boardId} tasks={group.tasks} onToggleDetails={props.onToggleDetails}/>
            </div>
            <div className="task-footer-container">
                <GroupFooter boardId={boardId} groupId={props.group.id} />
            </div>
            {provided.placeholder}
        </section>
            }}
        </Draggable>
    )
}