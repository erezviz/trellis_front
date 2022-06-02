import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'
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
    getTask,
    updateTask,
    createAttachment,
    getAttachmentTitle,
    // subscribe,
    // unsubscribe

}
window.cs = boardService;


function query() {
    return httpService.get('board')
}

// async function getTaskById(taskId,groupId,boardId){
//     const board = await getById(boardId)
//      board.find(board => {
//         return  
//     })

// }

function getById(boardId) {
    return httpService.get(`board/${boardId}`)

}
async function remove(boardId) {
    httpService.delete(`board/${boardId}`)

}
async function save(board) {
    var savedBoard
    if (board._id) {
        return httpService.put(`board/:${board._id}`, board)
    } else {
        board.labels = _getBoardLabels()
        savedBoard = await httpService.post('board', board)
       
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
        board.groups = (board.groups.length) ? [...board.groups, newGroup] : [newGroup]
        save(board)
        return board
    } catch (err) {
        console.log('Cannot add group', err)
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
        console.log('Cannot update group', err)
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
        console.log('Cannot delete group', err)
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
function getTask(board, groupId, taskId) {

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
        console.log('Cannot save task', err)
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

        const updatedBoard = { ...board, groups: updatedGroups }

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

function _getBoardLabels() {
    return [{
        id: "l101",
        title: "Done",
        color: "#519839"
    },
    {
        id: "l102",
        title: "Progress",
        color: "#f2d600"
    },
    {
        id: "l103",
        title: "Open",
        color: " #eb5a46"
    },
    {
        id: "l104",
        title: "Urgent",
        color: "#ff9f1a"
    },
    {
        id: "l105",
        title: "Irrelevant",
        color: "#055a8c"
    },
    {
        id: "l106",
        title: "Assigned",
        color: "#c377e0"
    }
    ]
}


// storageService.post(STORAGE_KEY, { _id: utilService.makeId(), title: 'Board 2' }).then(x => console.log(x))
// storageService.post(STORAGE_KEY, { _id: utilService.makeId(), title: 'Board 3' }).then(x => console.log(x))