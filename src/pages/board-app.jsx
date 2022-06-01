import React from "react";
import { connect } from "react-redux"
import TextField from '@mui/material/TextField';


import { BoardHeader } from "../cmps/board/board-header";
import { SideMenu } from "../cmps/dynamic-cmps/side-menu";
import { TaskDetails } from "../cmps/task/task-details";
import { GroupList } from "../cmps/group/group-list"
import { boardService } from "../services/board.service";
import { utilService } from "../services/util.service";
import { loadBoard, onDeleteGroup, onAddGroup } from '../store/board.action'
import { Screen } from '../cmps/dynamic-cmps/screen'
import { Route } from "react-router-dom";
import { Labels } from '../cmps/task/labels'
import { TrellisSpinner } from "../cmps/util-cmps/trellis-spinner";

class _BoardApp extends React.Component {


    state = {
        groups: [],
        isModalOpen: false,
        isShown: false,
        isLabelOpen: false,
        newGroup: { title: '' },
        isSideBarOpen: false
    }

    componentDidMount = () => {
        this.loadGroups()

    }

    loadGroups = async (board) => {
        //###  What is this line for?  ###
        this.setState(prevState => ({ ...prevState, groups: [] }), async () => {

            const boardId = this.getBoardId()
            if (!board) {
                try {
                    const board = await this.props.loadBoard(boardId)
                    this.setState(prevState => ({ ...prevState, groups: board.groups }))

                } catch (err) {
                    throw err
                }
            } else {
                try {
                    await this.setState(prevState => ({ ...prevState, groups: board.groups }))
                } catch (err) {
                    throw err
                }
            }
        })
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
        } finally {

        }
    }

    onAddGroup = async (ev) => {
        ev.preventDefault()
        const { newGroup } = this.state
        const boardId = this.getBoardId()
        newGroup.id = utilService.makeId()
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
        this.onToggleLabels()
    }

    onToggleGroup = () => {
        this.setState({ isShown: !this.state.isShown })
    }

    onToggleLabels = () => {
        this.setState({ islabelOpen: !this.state.isLabelOpen })
    }

    onToggleStatus=()=>{
        this.setState({ isSideBarOpen: !this.state.isSideBarOpen })
    }

    
    render() {
        const { currBoard } = this.props
        if (!currBoard) return <></>
        const { labels } = currBoard
        const { boardId } = this.props.match.params
        const { groups, isModalOpen, isShown, isLabelOpen: islabelOpen, isSideBarOpen } = this.state
        let status = (isSideBarOpen)? 'open':''
        const background = {
        background: `url(${currBoard.style.imgUrl})`, 
        backgroundSize: 'cover',
        top: '0px'
        }
        if (!labels) return <></>
        return (
            <section style={background} className={`board-app ${status}`}>
                <div className="board-name flex">
                <BoardHeader />
                <button className="show-menu-btn" onClick={this.onToggleStatus}>Show Menu</button>
                </div>
                <section className="main-board">
                <SideMenu props={currBoard}/>
                    {(!groups || !groups.length) && <TrellisSpinner isLarge={true} />}
                    <div className="list-container">
                        <GroupList key={'GroupList'} boardId={boardId} onToggleDetails={this.onToggleDetails} onDeleteGroup={this.onDeleteGroup} groups={groups} />

                    </div>
                    <>
                        <Route path='/board/:boardId/:groupId/:taskId' >
                            <Screen key={'Screen'} isOpen={isModalOpen}   >
                                <TaskDetails labels={labels} onToggleLabels={this.onToggleLabels} key={'TaskDetails'} isOpen={isModalOpen} onCloseDetails={this.onCloseDetails} />

                            </Screen>

                        </Route>
                    </>

                    <div className="add-group">
                        {!isShown && <button className="add-group-btn" onClick={this.onToggleGroup}><span className="plus">+</span> Add another list</button>}
                        {isShown && <form onSubmit={(ev) => this.onAddGroup(ev)}>
                            <TextField inputProps={{ className: 'add-group-field' }} onChange={this.onHandleChange} name="title" id="outlined-textarea" placeholder="Enter list title..." multiline />
                            <button className="save-group-btn">save list</button>
                            <button className="back-to-board-btn" onClick={this.onToggleGroup}>x</button>
                        </form>}
                    </div>
                </section>
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
    onDeleteGroup,
    onAddGroup,
}


export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)