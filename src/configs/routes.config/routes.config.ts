import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'Home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    {
        key: 'Perfiles',
        path: '/perfiles-view',
        component: lazy(() => import('@/views/demo/Pedidos/PerfilesView')),
        authority: [],
    },
    {
        key: 'Herrajes',
        path: '/herrajes-view',
        component: lazy(() => import('@/views/demo/Pedidos/HerrajesView')),
        authority: [],
    },
    {
        key: 'Vidrios',
        path: '/vidrios-view',
        component: lazy(() => import('@/views/demo/Pedidos/VidriosView')),
        authority: [],
    },
    {
        key: 'Madera',
        path: '/madera-view',
        component: lazy(() => import('@/views/demo/Pedidos/MaderaView')),
        authority: [],
    },
    {
        key: 'Varios',
        path: '/varios-view',
        component: lazy(() => import('@/views/demo/Pedidos/VariosView')),
        authority: [],
    },
    {
        key: 'Clients',
        path: '/clients-view',
        component: lazy(() => import('@/views/demo/ClientsView')),
        authority: [],
    },
    {
        key: 'Inventario',
        path: '/inventario-view',
        component: lazy(() => import('@/views/demo/InventarioView')),
        authority: [],
    },
    {
        key: 'Presupuestador',
        path: '/presupuestador-view',
        component: lazy(() => import('@/views/demo/PresupuestadorView')),
        authority: [],
    },
    {
        key: 'UserProfile',
        path: '/userProfile-view',
        component: lazy(() => import('@/views/demo/UserProfileView')),
        authority: [],
    },
]
