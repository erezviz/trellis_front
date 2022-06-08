import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { socketService, SOCKET_EMIT_SEND_BOARD } from './socket.service.js'

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
}

function query() {
    return httpService.get('board')
}

function getById(boardId) {
    return httpService.get(`board/${boardId}`)

}

async function remove(boardId) {
    httpService.delete(`board/${boardId}`)

}

async function save(board) {
    var savedBoard
    if (board._id) {
        socketService.emit(SOCKET_EMIT_SEND_BOARD, board)
        savedBoard = await httpService.put(`board/:${board._id}`, board)
    } else {
        board.labels = _getBoardLabels()
        savedBoard = await httpService.post('board', board)
    }
    return savedBoard
}

function getEmptyBoard() {
    return {
        title: '',
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

async function updateGroup(boardId, groupToSave) {

    try {
        const board = await boardService.getById(boardId)
        const updatedGroups = board.groups.map(group => {
            if (group.id === groupToSave.id) group = groupToSave
            return group
        })
        const updatedBoard = {...board, groups: updatedGroups }
        save(updatedBoard)
        return updatedBoard
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
        save(board)
        return board
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

function getTask(board, groupId, taskId) {
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    return task
}

async function saveTask(boardId, groupId, taskToSave) {
    taskToSave.id = utilService.makeId()
    try {
        const board = await getById(boardId)
        const groups = board.groups.map(group => {
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
}



function _getBoardLabels() {
    return [{
            id: "l101",
            title: "Done",
            color: "#61bd4f"
        },
        {
            id: "l102",
            title: "Progress",
            color: "#f2d600"
        },
        {
            id: "l104",
            title: "Urgent",
            color: "#ff9f1a"
        },
        {
            id: "l103",
            title: "Open",
            color: " #eb5a46"
        },
        {
            id: "l106",
            title: "Assigned",
            color: "#c377e0"
        },
        {
            id: "l105",
            title: "Irrelevant",
            color: "#0079bf"
        }
    ]
}