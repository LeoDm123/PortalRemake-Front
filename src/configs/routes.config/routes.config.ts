import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    {
        key: 'income',
        path: '/income-view',
        component: lazy(() => import('@/views/demo/IncomeView')),
        authority: [],
    },
    {
        key: 'expense',
        path: '/expenses-view',
        component: lazy(() => import('@/views/demo/ExpenseView')),
        authority: [],
    },
    {
        key: 'userProfile',
        path: '/userProfile-view',
        component: lazy(() => import('@/views/demo/UserProfileView')),
        authority: [],
    },
    {
        key: 'Calendar',
        path: '/calendar-view',
        component: lazy(() => import('@/views/demo/CalendarSheet')),
        authority: [],
    },
    {
        key: 'Budget',
        path: '/budget-view',
        component: lazy(() => import('@/views/demo/BudgetView')),
        authority: [],
    },
]
