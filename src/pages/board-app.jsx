import React from "react";
import { GroupPreview } from "../cmps/group-preview";
import { boardService } from "../services/board.service";
import { utilService } from "../services/util.service";

export class BoardApp extends React.Component{

    state={
        groups: []
    }

    componentDidMount=()=>{
        this.loadGroups()
    }
    
    loadGroups=async(board)=>{
        const boardId = this.getBoardId()
        if(!board){
        try{
            const board = await boardService.getById(boardId)
            this.setState({groups: [...board.groups]})
        }catch(err){
            throw err
        }  
    }else this.setState({groups: [...board.groups]})
}
    getBoardId=()=>{
         const {boardId} = (this.props.match.params)
        return boardId
    }

    onDeleteGroup=async(groupId)=>{
        const boardId = this.getBoardId()
        try{
            const board = await boardService.deleteGroup(boardId, groupId)
            this.loadGroups(board)
        }catch(err){
            throw err
        }
    }

    onAddGroup=async ()=>{
        const boardId = this.getBoardId()
        const groupName  = prompt('Group name?')
        const newGroup = {id: "G-"+utilService.makeId(), title: groupName}
        try{
           const board = await boardService.addGroup(boardId, newGroup)
           this.loadGroups(board)
        }catch(err){
            throw err
        }finally {
        }
    }

    render(){
        const {groups} = this.state
        return (
            <section className="board-app">

                <button onClick={this.onAddGroup}>Add Group</button>
                {(!groups || !groups.length) && <h3>Loading...</h3>}
                {groups && groups.length && groups.map(group=>{
                   return (
                       <div className="list-container">
                        <button onClick={()=>this.onDeleteGroup(group.id)}>X</button>
                   <GroupPreview boardId={this.getBoardId()} key={group.id} group={group}/>
                   </div>
                   )
                })}
            </section>
        )
    }
}