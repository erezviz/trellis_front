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
    loadTask,
    updateTask,
    createAttachment,
    getAttachmentTitle,
    // subscribe,
    // unsubscribe

}
window.cs = boardService;


function query() {
    return storageService.query(STORAGE_KEY)
}

// async function getTaskById(taskId,groupId,boardId){
//     const board = await getById(boardId)
//      board.find(board => {
//         return  
//     })

// }

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
            // console.log('save (board)', savedBoard)
            // boardChannel.postMessage(getActionUpdateBoard(savedBoard))

    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
            // boardChannel.postMessage(getActionAddBoard(savedBoard))
    }
    console.log(savedBoard.groups)
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
        return save(board)
    } catch (err) {
        throw err
    }
}
async function deleteGroup(boardId, groupId) {
    try {
        const board = await getById(boardId)
        const newGroups = board.groups.filter(group => group.id !== groupId)
        board.groups = newGroups
        return save(board)
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
//? THIS FUNCTION WORKS -- DO NOT DELETE
 function loadTask(board, groupId, taskId) {

    try {
        const group = board.groups.find(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)

        // const task = board.groups.find(group => {
        //     if (group.id === groupId) {
        //         return group.tasks.find(task => task.id === taskId)
        //     }
        // })

        return task

    } catch (err) {
        console.log('Cannot load task', err)
        throw err
    }
}

async function saveTask(boardId, groupId, taskToSave) {
    taskToSave.id = utilService.makeId()
    try {
        const board = await getById(boardId)
        const groups = board.groups.map(group => {
            // console.log('my group', group);
            if (group.id === groupId) {
                if (group.tasks) group.tasks.push(taskToSave)
                else group.tasks = [taskToSave]
            }
            return group
        })
        board.groups = groups
        return save(board)
    } catch (err) {
        throw err
    }

}

async function updateTask(boardId, groupId, taskToSave) {
    // const updatedBoard
    try {
        const board = await boardService.getById(boardId)

        const updatedGroups = board.groups.map(group => {
            if (group.id === groupId) {
                const newTasks = group.tasks.map(task => {
                    if (task.id === taskToSave.id) task = taskToSave
                    return task

                })
                group.tasks = newTasks
            }
            return group
        })

        const updatedBoard = {...board, groups: updatedGroups }

        save(updatedBoard)
        return updatedBoard
    } catch (err) {
        console.log('ERROR: Cannot update task', err);
        throw err
    }
}

function createAttachment(attachmentType, str) {
    const attachment = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        title: '',
        details: ''

    }
    switch (attachmentType) {
        case 'link':
            attachment.details = str
            break;

        default:
            break;
    }
    return attachment
}

function getAttachmentTitle(urlStr) {
    let url = new URL(urlStr)
    console.log(url);
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