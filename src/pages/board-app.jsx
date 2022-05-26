import React from "react";
import { GroupPreview } from "../cmps/group/group-preview";
import { TaskDetails } from "../cmps/task/task-details";
import { GroupList } from "../cmps/group/group-list"
import { boardService } from "../services/board.service";
import { utilService } from "../services/util.service";
import { connect } from "react-redux"
import { loadBoard } from '../store/board.action'
import {Screen} from '../cmps/dynamic-cmps/screen'
import {Link} from 'react-router-dom'

class _BoardApp extends React.Component {


    state = {
        groups: [],
        isModalOpen: false
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

 
        const { groups, isModalOpen } = this.state
        // console.log('isModalOpen? ',isModalOpen);
        return (
            <section className="board-app">
                <Screen isOpen={isModalOpen}   >
                    <TaskDetails isOpen={isModalOpen} onToggleDetails={this.onToggleDetails} />

                </Screen>
                {/* <section onClick={this.onToggleDetails} className={`task-details-overlay ${isModalOpen ? 'overlay-up' : ''} `}>
                </section> */}
                <button onClick={this.onAddGroup}>Add Group</button>
                {(!groups || !groups.length) && <h3>Loading...</h3>}
                <div className="list-container">
                    <GroupList boardId={boardId} onToggleDetails={this.onToggleDetails} onDeleteGroup={this.onDeleteGroup} groups={groups} />
               
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