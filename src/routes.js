import { Hero } from './pages/hero'
import { HomePage } from './pages/home-page'
import { BoardApp } from './pages/board-app';
import { TaskDetails } from './cmps/task/task-details';
// Routes accesible from the main navigation (in AppHeader)
const routes = [{
        path: '/home',
        component: HomePage

    },
    {
        path: '/',
        component: Hero,

    },
    {
        path: '/board/:boardId',
        component: BoardApp
    },
    // {
    //     path: '/board/:boardId/:groupId/:taskId',
    //     component: TaskDetails,

    // },
    // {
    //     path: 'admin',
    //     component: <AdminApp />,
    //     label: 'Admin Only'
    // }
]

export default routes;