import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
// import { getActionRemoveBoard, getActionAddBoard, getActionUpdateBoard } from '../store/board.actions.js'

const STORAGE_KEY = 'board'
    // const boardChannel = new BroadcastChannel('boardChannel')
    // const listeners = []

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    getEmptyTask,
    saveTask,
    addGroup,
    updateGroup,
    deleteGroup,
    // subscribe,
    // unsubscribe

}
window.cs = boardService;


function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
        // return axios.get(`/api/board/${boardId}`)
}
async function remove(boardId) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(reject, 2000)
    // })
    // return Promise.reject('Not now!');
    await storageService.remove(STORAGE_KEY, boardId)
        // boardChannel.postMessage(getActionRemoveBoard(boardId))
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
            // boardChannel.postMessage(getActionUpdateBoard(savedBoard))

    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
            // boardChannel.postMessage(getActionAddBoard(savedBoard))
    }
    return savedBoard
}

function getEmptyBoard() {
    return {
        title: '',
        // backgroundImg: url,
    }
}

//Group CRUDL

async function addGroup(boardId, newGroup) {
    try {
        const board = await getById(boardId)
        board.groups = [...board.groups, newGroup]
        save(board)
        return board
    } catch (err) {
        throw err
    }
}
async function updateGroup(boardId, groupId, newName) {
    try {
        const board = await getById(boardId)
        const groupToUpdate = board.groups.find(group => group.id === groupId)
        groupToUpdate.title = newName
        save(board)
        return groupToUpdate
    } catch (err) {
        throw err
    }
}
async function deleteGroup(boardId, groupId) {
    try {
        const board = await getById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        board.groups.splice(groupIdx, 1)
        save(board)
        return board
    } catch (err) {
        throw err
    }
}
//Task CRUDL
function getEmptyTask() {
    return {
        title: '',
    }
}

async function saveTask(boardId, groupId, taskToSave) {
    taskToSave.id = utilService.makeId()
    try {
        const board = await getById(boardId)
        const groups = board.groups.map(group => {
            console.log('my group', group);
            if (group.id === groupId) {
                if (group.tasks) group.tasks.push(taskToSave)
                else group.tasks = [taskToSave]
            }
            return group
        })
        board.groups = groups
        save(board)
    } catch (err) {
        throw err
    }

}
// function subscribe(listener) {
//     boardChannel.addEventListener('message', listener)
// }

// function unsubscribe(listener) {
//     boardChannel.removeEventListener('message', listener)
// }


//? TEST DATA FOR HOMEPAGE
// storageService.post(STORAGE_KEY, {
//     _id: utilService.makeId(),
//     title: 'Board 1',
//     groups: [{
//         id: "G-" + utilService.makeId(),
//         title: "Group 1",
//         tasks: [{
//                 id: "T-" + utilService.makeId(),
//                 title: "Replace logo"
//             },
//             {
//                 id: "T-" + utilService.makeId(),
//                 title: "Add Samples"
//             }
//         ],
//     }]
// }).then(x => console.log(x))


// storageService.post(STORAGE_KEY, { _id: utilService.makeId(), title: 'Board 2' }).then(x => console.log(x))
// storageService.post(STORAGE_KEY, { _id: utilService.makeId(), title: 'Board 3' }).then(x => console.log(x))