import React from "react";
import { connect } from "react-redux"
import TextField from '@mui/material/TextField';


import { BoardHeader } from "../cmps/board/board-header";
import { TaskDetails } from "../cmps/task/task-details";
import { GroupList } from "../cmps/group/group-list"
import { boardService } from "../services/board.service";
import { utilService } from "../services/util.service";
import { loadBoard, onDeleteGroup, onAddGroup } from '../store/board.action'
import { Screen } from '../cmps/dynamic-cmps/screen'
import { Route } from "react-router-dom";

class _BoardApp extends React.Component {
    

    state = {
        groups: [],
        isModalOpen: false,
        isShown: false,
        newGroup: { title: '' }
    }

    componentDidMount = async() => {
            this.loadGroups()
            
    }

    loadGroups = async (board) => {
        //###  What is this line for?  ###
        this.setState({ groups: [] })
        const boardId = this.getBoardId()
        if (!board) {
            try {
                const board = await this.props.loadBoard(boardId)
                this.setState({ groups: board.groups }, (()=> console.log(this.state.groups)))
      
            } catch (err) {
                throw err
            }
        } else {
            try{
                await this.setState({ groups: board.groups })
            } catch(err){
                throw err
            }
        }
    }

    getBoardId = () => {
        const { boardId } = (this.props.match.params)
        return boardId
    }

    onDeleteGroup = async (groupId) => {
        const boardId = this.getBoardId()
        try {
            const board = await this.props.onDeleteGroup(boardId, groupId)
            this.loadGroups(board)
        } catch (err) {
            throw err
        }finally{

        }
    }

    onAddGroup = async (ev) => {
        ev.preventDefault()
        const { newGroup } = this.state
        const boardId = this.getBoardId()
         newGroup.id =utilService.makeId()
        try {
            const board = await this.props.onAddGroup(boardId, newGroup)
            // console.log('board after update', board)
            this.loadGroups(board)
        } catch (err) {
            throw err
        } finally {
            this.setState({ isShown: false })
        }
    }

    onHandleChange = ({ target }) => {
        const field = target.name
        this.setState((prevState) => ({
            newGroup: { ...prevState.newGroup, [field]: target.value },
        }))
    }

    onToggleDetails = (ev) => {
        const { boardId } = this.props.match.params

        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen
          }));
          this.props.history.push(`/board/${boardId}`)
      
    }

    onCloseDetails = (ev) => {
        this.onToggleDetails()
    }

    onToggleGroup = () => {
        this.setState({ isShown: !this.state.isShown })
    }

    render() {

        const { boardId } = this.props.match.params


        const { groups, isModalOpen, isShown } = this.state
        return (
            <section className={`board-app ${boardId}`}>
                <BoardHeader/>
                <section className="main-board">
                {(!groups || !groups.length) && <h3>Loading...</h3>}
                <div className="list-container">
                    <GroupList key={'GroupList'} boardId={boardId} onToggleDetails={this.onToggleDetails} onDeleteGroup={this.onDeleteGroup} groups={groups}/>

                </div>
                <>
                    <Route path='/board/:boardId/:groupId/:taskId' >
                        <Screen  key={'Screen'} isOpen={isModalOpen}   >
                            <TaskDetails key={'TaskDetails'} isOpen={isModalOpen} onToggleDetails={this.onToggleDetails} />

                        </Screen>
                    </Route>
                </>
                <div className="add-group">
                    {!isShown && <button className="add-group-btn" onClick={this.onToggleGroup}><span className="plus">+</span> Add another list</button>}
                    {isShown && <form onSubmit={(ev)=>this.onAddGroup(ev)}>
                        <TextField onChange={this.onHandleChange} name="title" id="outlined-textarea" placeholder="Enter list title..." multiline />
                        <button >save list</button>
                        <button onClick={this.onToggleGroup}>x</button>
                    </form>}
                </div>
                </section>
            </section>
        )
    }
}


function mapStateToProps(state) {
    return {
        currBoard: state.boardModule.currBoard,
        currTask: state.boardModule.currTask
    }
}
const mapDispatchToProps = {
    loadBoard,
    onDeleteGroup,
    onAddGroup,
}


export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)