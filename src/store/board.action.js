// import { userService } from "../services/user.service.js";
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

var subscriber

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

        // if (subscriber) boardService.unsubscribe(subscriber)
        // subscriber = (ev) => {
        //     console.log('Got notified', ev.data)
        //     dispatch(ev.data)
        // }
        // boardService.subscribe(subscriber)
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

        // if (subscriber) boardService.unsubscribe(subscriber)
        // subscriber = (ev) => {
        //     console.log('Got notified', ev.data)
        //     dispatch(ev.data)
        // }
        // boardService.subscribe(subscriber)
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
        } catch (err) {
            console.log('Cannot add board', err)
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

// export function loadTask(taskId, groupId, boardId) {
//     let currGroup
//     return async() => {
//         try {
//             const board = await boardService.getById(boardId)

//             const task = board.groups.find(group => {
//                 currGroup = group.id === groupId
//                 return currGroup.tasks.find(task => task.id === taskId)
//             })
//             return task

//         } catch (err) {
//             console.log('Cannot load task', err)
//             throw err
//         }

//     }
// }
// Demo for Optimistic Mutation (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveBoardOptimistic(boardId) {

//     return (dispatch, getState) => {

//         dispatch({
//             type: 'REMOVE_CAR',
//             boardId
//         })

//         boardService.remove(boardId)
//             .then(() => {
//                 console.log('Server Reported - Deleted Succesfully');
//             })
//             .catch(err => {
//                 console.log('Cannot load boards', err)
//                 dispatch({
//                     type: 'UNDO_REMOVE_CAR',
//                 })
//             })
//     }
// }