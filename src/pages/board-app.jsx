import React from "react";
import { connect } from "react-redux"
import { Route } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import TextField from '@mui/material/TextField';

import { socketService, SOCKET_EMIT_SEND_BOARD, SOCKET_EMIT_SET_BOARD, SOCKET_EVENT_ADD_BOARD } from "../services/socket.service";
import { loadBoard, onDeleteGroup, onAddGroup, updateWholeBoard, updateBoardForSockets } from '../store/board.action'
import { utilService } from "../services/util.service";

import { BoardHeader } from "../cmps/board/board-header";
import { SideMenu } from "../cmps/dynamic-cmps/side-menu";
import { TaskDetails } from "../cmps/task/task-details";
import { GroupList } from "../cmps/group/group-list"
import { Screen } from '../cmps/dynamic-cmps/screen'
import { TrellisSpinner } from "../cmps/util-cmps/trellis-spinner";
import { PopOver } from "../cmps/dynamic-cmps/pop-over";
import { WarningModal } from "../cmps/util-cmps/warning-modal";
import { eventBusService } from "../services/event-bus.service";


class _BoardApp extends React.Component {
    state = {
        groups: [],
        isModalOpen: false,
        isWarningOpen:false,
        isShown: false,
        isLabelOpen: false,
        newGroup: { title: '' },
        groupToDelete: null,
        isSideBarOpen: false,
        isScrolling: false,
        
        clientX: 0,
        scrollX: 0

    }
    ref = React.createRef();

    componentDidMount = () => {

        this.loadGroups()

        //* This is to remove the last-listener
        socketService.off(SOCKET_EVENT_ADD_BOARD)
        //* This is to add the new-listener
        socketService.on(SOCKET_EVENT_ADD_BOARD, this.changeCurrBoard)

        eventBusService.on('open-group-modal' , (groupId) => {
                this.onToggleWarning()
                this.setState({groupToDelete: groupId})

        })

    }

    componentWillUnmount() {
        const { currBoard } = this.props
        socketService.off(SOCKET_EVENT_ADD_BOARD, currBoard)
    }

    changeCurrBoard = (board) => {
        this.props.updateBoardForSockets(board)
        console.log('updating store with new board...', board);

    }

    loadGroups = async (board) => {
        if(board) return this.setState(prevState => ({...prevState, group: board.groups}))

        const boardId = this.getBoardId()
        try{
            const updatedBoard = await this.props.loadBoard(boardId)
            this.setState(prevState => ({...prevState, groups: updatedBoard.groups}))
            socketService.emit(SOCKET_EMIT_SET_BOARD, board._id)

        }catch (err){
            console.log('ERROR: Cannot update board', err)
        }
        // this.setState(prevState => ({ ...prevState, groups: [] }), async () => {
        //     const boardId = this.getBoardId()
        //     if (!board) {
        //         try {
        //             const board = await this.props.loadBoard(boardId)
        //             this.setState(prevState => ({ ...prevState, groups: board.groups }), () =>
        //                 socketService.emit(SOCKET_EMIT_SET_BOARD, board._id))
        //         } catch (err) {
        //             throw err
        //         }
        //     } else this.setState(prevState => ({ ...prevState, groups: board.groups }))
        // })
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
            console.log('ERROR: Cannot delete group', err)
            throw err
        } finally{
            this.onToggleWarning()
        }
    }

    onAddGroup = async (ev) => {
        ev.preventDefault()
        const { newGroup } = this.state
        const boardId = this.getBoardId()
        newGroup.id = utilService.makeId()
        try {
            const board = await this.props.onAddGroup(boardId, newGroup)
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

    onToggleWarning = () => {
        this.setState({isWarningOpen: !this.state.isWarningOpen})
       
    }

    onCloseDetails = (ev) => {
        this.onToggleDetails()
        this.onToggleLabels()
    }

    onToggleGroup = () => {
        this.setState({ isShown: !this.state.isShown })
    }

    onToggleLabels = () => {
        this.setState({ isLabelOpen: !this.state.isLabelOpen })
    }

    onToggleStatus = () => {
        this.setState({ isSideBarOpen: !this.state.isSideBarOpen })
    }

    onDragEnd = (res) => {
        const board = JSON.parse(JSON.stringify(this.props.currBoard))
        const { destination, source, draggableId, type } = res
        console.log('res', res)
        if (!destination) return
        // moving groups 
        else if (type === 'column') {
            const group = board.groups.splice(source.index, 1)[0]
            board.groups.splice(destination.index, 0, group)
        }
        else if (type === 'task') {
            const groupStart = board.groups.find(currGroup => currGroup.id === source.droppableId)
            const groupFinish = board.groups.find(currGroup => currGroup.id === destination.droppableId)
            const draggableTask = groupStart.tasks.splice(source.index, 1)[0]
            // moving tasks on the same group
            if (groupStart === groupFinish) {
                groupStart.tasks.splice(destination.index, 0, draggableTask)
            }
            // moving tasks on different groups
            else if (groupStart !== groupFinish) {
                groupFinish.tasks.splice(destination.index, 0, draggableTask)
            }
        }
        this.props.updateWholeBoard(board)
    }

    render() {

        const { currBoard } = this.props
        if (!currBoard?._id) return <></>
        const { labels, members } = currBoard
        const { boardId } = this.props.match.params
        const { groups, isModalOpen, isShown, isSideBarOpen,isWarningOpen , groupToDelete} = this.state
        let status = (isSideBarOpen) ? 'open' : ''
        const background = {
            backgroundImage: `url(${currBoard.style.imgUrl})`,
            backgroundSize: 'cover',
            top: '0px'
        }
        console.log('the board in boardApp', currBoard);
        if (!labels) return <></>
        return (
            <section style={background} className={`board-app ${status}`}>
                <div className="board-name flex">
                    <BoardHeader updateWholeBoard={this.props.updateWholeBoard} />
                    {!isSideBarOpen && <button className="show-menu-btn" onClick={this.onToggleStatus}>Show Menu</button>}
                    {isSideBarOpen && <button className="show-menu-btn" onClick={this.onToggleStatus}>Hide Menu</button>}
                </div>
                <section className="main-board">
                    <SideMenu props={currBoard} />
                    {(!groups?.length) && <TrellisSpinner isLarge={true} />}
                    {groups?.length > 0 &&
                        <div className="list-container">
                            <DragDropContext onDragEnd={this.onDragEnd} id={currBoard._id}>
                                <GroupList
                                    boardId={boardId}
                                    onToggleWarning={this.onToggleWarning}
                                    onToggleDetails={this.onToggleDetails}
                                    onDeleteGroup={this.onDeleteGroup}
                                    groups={groups} />
                            </DragDropContext>
                            
                        </div>
                    }
                    <>
                        <Route path='/board/:boardId/:groupId/:taskId' >
                            <Screen key={'Screen'} isOpen={isModalOpen}   >
                                <TaskDetails
                                    key={'TaskDetails'}
                                    members={members}
                                    labels={labels}
                                    onToggleLabels={this.onToggleLabels}
                                    isOpen={isModalOpen}
                                    onCloseDetails={this.onCloseDetails} />
                            </Screen>
                        </Route>
                        <PopOver isShown={isWarningOpen} title={'Delete list?'} cb={this.onToggleWarning}>
                            <WarningModal groupId={groupToDelete} onDeleteGroup={this.onDeleteGroup}/>
                        </PopOver>
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
    updateWholeBoard,
    updateBoardForSockets
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)