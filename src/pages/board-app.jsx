import React from "react";
import {Link} from 'react-router-dom'
import { connect } from "react-redux"
import TextField from '@mui/material/TextField';


import { GroupPreview } from "../cmps/group/group-preview";
import { TaskDetails } from "../cmps/task/task-details";
import { GroupList } from "../cmps/group/group-list"
import { boardService } from "../services/board.service";
import { utilService } from "../services/util.service";
import { loadBoard } from '../store/board.action'
import {Screen} from '../cmps/dynamic-cmps/screen'
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { formatMuiErrorMessage } from "@mui/utils";

class _BoardApp extends React.Component {


    state = {
        groups: [],
        isModalOpen: false,
        isShown: true
    }

    componentDidMount = () => {
        this.loadGroups()
    }

    loadGroups = async (board) => {
        const boardId = this.getBoardId()
        if (!board) {
            try {
                const board = await this.props.loadBoard(boardId)
                this.setState({ groups: [...board.groups] })
            } catch (err) {
                throw err
            }
        } else this.setState({ groups: [...board.groups] })
    }
    getBoardId = () => {
        const { boardId } = (this.props.match.params)
        return boardId
    }

    onDeleteGroup = async (groupId) => {
        const boardId = this.getBoardId()
        try {
            const board = await boardService.deleteGroup(boardId, groupId)
            this.loadGroups(board)
        } catch (err) {
            throw err
        }
    }

    onAddGroup = async () => {
        const boardId = this.getBoardId()
        const groupName = prompt('Group name?')
        const newGroup = { id: "G-" + utilService.makeId(), title: groupName }
        try {
            const board = await boardService.addGroup(boardId, newGroup)
            this.loadGroups(board)
        } catch (err) {
            throw err
        } finally {
        }
    }

    onHandleChange = ({ target }) => {
        console.log(target.value);
        const field = target.name
        this.setState((prevState) => ({
            task: { ...prevState.groups, [field]: target.value },
        }))
    }

    onToggleDetails = (ev) => {

        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen
          }));
      
    }

    onCloseDetails = (ev) => {
        // ev.stopPropagation()
      
        // this.props.history.goBack()
        this.onToggleDetails()
    }

    render() {
    
        const { boardId } = this.props.match.params

 
        const { groups, isModalOpen, isShown } = this.state
        // console.log('isModalOpen? ',isModalOpen);
        return (
            <section className="board-app">
              
                {/* <section onClick={this.onToggleDetails} className={`task-details-overlay ${isModalOpen ? 'overlay-up' : ''} `}>
                </section> */}
                {(!groups || !groups.length) && <h3>Loading...</h3>}
                <div className="list-container">
                    <GroupList boardId={boardId} onToggleDetails={this.onToggleDetails} onDeleteGroup={this.onDeleteGroup} groups={groups} />
               
                </div>

                <>
                {/* <Route path='/board/:boardId/:groupId/:taskId' component={TaskDetails}>
                <Screen isOpen={isModalOpen}   >
                    <TaskDetails isOpen={isModalOpen} onToggleDetails={this.onToggleDetails} />

                </Screen>
                </Route> */}
                <Route path='/board/:boardId/:groupId/:taskId' >
                <Screen isOpen={isModalOpen}   >
                    <TaskDetails isOpen={isModalOpen} onToggleDetails={this.onToggleDetails} />

                </Screen>
                </Route>
                </>
                <div className="add-group">
              {!isShown &&  <button className="add-group-btn" onClick={this.onAddGroup}><span className="plus">+</span> Add another list</button>}
              {isShown && <form >
              <TextField onChange={this.onHandleChange} name="title"id="outlined-textarea" placeholder="Enter list title..." multiline />
              </form> }
                </div>
            </section>
        )
    }
}


function mapStateToProps(state) {
    return {
        currBoard: state.boardModule.currBoard
    }
}
const mapDispatchToProps = {
    loadBoard,
}


export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)