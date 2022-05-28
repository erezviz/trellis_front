import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { connect } from 'react-redux'


import { GroupHeader } from "./group-header"
import { TaskList } from "../task/task-list"
import { GroupFooter } from "./group-footer"
import { onUpdateGroup} from "../../store/board.action"


export const GroupPreview = (props) => {
    const dispatch = useDispatch()
  const [group, setGroup] = useState(props.group)
  const { currBoard } = useSelector(state => state.boardModule)
  
  useEffect(()=>{
      (async=>{
         console.log('group preview', currBoard)
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
        <section className="group-preview" >
            
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