import { boardService } from "../services/board.service";

// Action Creators:
export function getActionRemoveBoard(boardId) {
    return {
        type: 'REMOVE_BOARD',
        boardId
    }
}
export function getActionAddBoard(board) {
    return {
        type: 'ADD_BOARD',
        board
    }
}
export function getActionUpdateBoard(board) {
    return {
        type: 'UPDATE_BOARD',
        board
    }
}

export function loadBoards() {
    return async(dispatch) => {
        try {
            const boards = await boardService.query()

            dispatch({
                type: 'SET_BOARDS',
                boards
            })
            return boards

        } catch (err) {
            console.log('Cannot load boards', err)
            throw err
        }

    }
}
export function loadBoard(boardId) {
    return async(dispatch) => {
        try {
            const board = await boardService.getById(boardId)


            dispatch({
                type: 'SET_BOARD',
                board
            })
            return board

        } catch (err) {
            console.log('Cannot load boards', err)
            throw err
        }
    }
}

export function removeBoard(boardId) {
    return async(dispatch) => {
        try {
            await boardService.remove(boardId)
            console.log('Deleted Succesfully!');
            dispatch(getActionRemoveBoard(boardId))
        } catch (err) {
            console.log('Cannot remove board', err)
        }
    }
}

export function addBoard(board) {
    return async(dispatch) => {
        try {
            const savedBoard = await boardService.save(board)
            console.log('Added Board', savedBoard);
            dispatch(getActionAddBoard(savedBoard))
            return savedBoard
        } catch (err) {
            console.log('Cannot add board', err)
        }
    }
}

export function updateGroupTask(boardId, groupId, task) {

    console.log('ytask', task)
    console.log('boardId', boardId)
    console.log('groupId', groupId)
    return async(dispatch) => {
        try {
            const updatedBoard = await boardService.saveTask(boardId, groupId, task)
            console.log('updatedBoard', updatedBoard);
            dispatch(getActionUpdateBoard(updatedBoard))
        } catch (err) {
            console.log('Cannot save board', err)
            throw err
        }
    }
}

export function updateBoardForSockets(board) {
    return (dispatch) => {
        dispatch(getActionUpdateBoard(board))
    }
}

export function updateWholeBoard(board) {
    return async(dispatch) => {
        try {
            dispatch(getActionUpdateBoard(board))
            await boardService.save(board)
        } catch (err) {
            console.log('Cannot save board', err)
            throw err
        }
    }
}

export function updateBoard(boardId, groupId, task) {
    return async(dispatch) => {
        try {
            const updatedBoard = await boardService.saveTask(boardId, groupId, task)
            const reducerBoard = dispatch(getActionUpdateBoard(updatedBoard))
            return reducerBoard.board
        } catch (err) {
            console.log('Cannot save board', err)
            throw err
        }
    }
}
// GROUP CRUDL
export function onDeleteGroup(boardId, groupId) {
    return async(dispatch) => {
        try {
            const updatedBoard = await boardService.deleteGroup(boardId, groupId)
            console.log('updatedBoard in onDeleteGroup', updatedBoard);
            dispatch(getActionUpdateBoard(updatedBoard))

        } catch (err) {
            console.log('Cannot save board', err)
            throw err
        }
    }
}

export function onAddGroup(boardId, group) {
    return async(dispatch) => {
        try {
            const updatedBoard = await boardService.addGroup(boardId, group)
            const reducerBoard = dispatch(getActionUpdateBoard(updatedBoard))
            return reducerBoard.board
        } catch (err) {
            console.log('Cannot save board', err)
            throw err
        }
    }
}

export function onUpdateGroup(boardId, groupToSave) {
    return async(dispatch) => {
        try {
            const updatedBoard = await boardService.updateGroup(boardId, groupToSave)
            dispatch(getActionUpdateBoard(updatedBoard))
        } catch (err) {
            console.log('Cannot update group', err)
            throw err
        }
    }
}

export function queryTask(boardId, groupId, taskId) {
    return async(dispatch) => {
        try {
            const task = await boardService.getTask(boardId, groupId, taskId)
            dispatch({
                type: 'SET_TASK',
                task
            })
            return task
        } catch (err) {
            console.log('ERROR: cannot load task', err)
            throw err
        }
    }
}

export function updateTask(boardId, groupId, taskToSave) {
    return async(dispatch) => {
        try {
            const updatedBoard = await boardService.updateTask(boardId, groupId, taskToSave)
            dispatch(getActionUpdateBoard(updatedBoard))
        } catch (err) {
            console.log('ERROR: cannot update task', err)
            throw err
        }
    }
}