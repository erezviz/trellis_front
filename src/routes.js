import { Hero } from './pages/hero'
import { HomePage } from './pages/home-page'
import { BoardApp } from './pages/board-app';
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
        path: '/board',
        component: BoardApp,

    },
    // {
    //     path: 'chat',
    //     component: <ChatApp />,
    //     label: 'Chat'
    // },
    // {
    //     path: 'about',
    //     component: <AboutUs />,
    //     label: 'About us'
    // },
    // {
    //     path: 'admin',
    //     component: <AdminApp />,
    //     label: 'Admin Only'
    // }
]

export default routes;