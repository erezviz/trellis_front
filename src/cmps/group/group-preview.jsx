import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { connect } from 'react-redux'


import { GroupHeader } from "./group-header"
import { TaskList } from "../task/task-list"
import { GroupFooter } from "./group-footer"
import { boardService } from "../../services/board.service"


export const GroupPreview = (props) => {
  const [group, setGroup] = useState(props.group)
  const { currBoard } = useSelector(state => state.boardModule)
  
  useEffect(()=>{
      const currGroup = currBoard.groups.find(boardGroup=>{
          return boardGroup.id === group.id
        })
        if (!currGroup) return
        setGroup(currGroup)
  },[currBoard])

    const {boardId} = props

    const onChangeName=async()=>{
        const newName = prompt('new Name?')
        try{
            const newGroup = await boardService.updateGroup(boardId, group.id, newName)
            setGroup(newGroup)
        }catch(err){
            throw err
        }
    }

   

    return (
        <section className="group-preview">
            
            <div className="header-container">
            <GroupHeader onChangeName={onChangeName} title={group.title}/>
            <button onClick={()=>props.onDeleteGroup(group.id)}>X</button>
            </div>
            <div className="task-list-container">
            <TaskList groupId={props.group.id} boardId={boardId} tasks={group.tasks} onToggleDetails={props.onToggleDetails}/>
            </div>
            <div className="task-footer-container">
            <GroupFooter boardId={boardId} groupId={props.group.id} />
            </div>
        </section>
    )
}