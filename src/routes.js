import { Hero } from './pages/hero'
import { BoardApp } from './pages/board-app'

// Routes accesible from the main navigation (in AppHeader)
const routes = [{
        path: '/board',
        component: BoardApp

    },
    {
        path: '/',
        component: Hero,

    },

    // {
    //     path: 'review',
    //     component: <ReviewApp />,
    //     label: 'Reviews'
    // },
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