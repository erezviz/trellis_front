import React from "react";
import { GroupPreview } from "../cmps/group-preview";
import { boardService } from "../services/board.service";

export class BoardApp extends React.Component{

    state={
        groups: []
    }

    componentDidMount=async()=>{
        const {boardId} = (this.props.match.params)
        try{
            const board = await boardService.getById(boardId)
            this.setState({groups: [...board.groups]})
        }catch(err){
            throw err
        }
    }
    
    render(){
        const {groups} = this.state
        return (
            <section className="board-app">

                <h2>I am a board app</h2>
                {(!groups || !groups.length) && <h3>Loading...</h3>}
                {groups && groups.length && groups.map(group=>{
                   return (
                    <div className="list-container">
                   <GroupPreview group={group}/>
                   </div>
                   )
                })}
            </section>
        )
    }
}