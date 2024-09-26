import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'Home',
        path: '/home',
        title: 'Inicio',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'Pedidos',
        path: '',
        title: 'Pedidos',
        translateKey: '',
        icon: 'matList',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'Perfiles',
                path: '/perfiles-view',
                title: 'Perfilería de PVC',
                translateKey: 'nav.perfiles',
                icon: 'swatch',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'Herrajes',
                path: '/herrajes-view',
                title: 'Herrajes de PVC',
                translateKey: 'nav.herrajes',
                icon: 'cog',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'Vidrios',
                path: '/vidrios-view',
                title: 'Vidrios',
                translateKey: 'nav.vidrios',
                icon: 'cubeTrans',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'Madera',
                path: '/madera-view',
                title: 'Insumos de Madera',
                translateKey: 'nav.madera',
                icon: 'finger',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'Varios',
                path: '/varios-view',
                title: 'Insumos Varios',
                translateKey: 'nav.varios',
                icon: 'collection',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    {
        key: 'Clients',
        path: '/clients-view',
        title: 'Clientes',
        translateKey: 'nav.clients',
        icon: 'group',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['Admin'],
        subMenu: [],
    },
    {
        key: 'Inventario',
        path: '/inventario-view',
        title: 'Inventario',
        translateKey: 'nav.inventario',
        icon: 'archive',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'Presupuestador',
        path: '/presupuestador-view',
        title: 'Presupuestador',
        translateKey: 'nav.presupuestador',
        icon: 'budget',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    // {
    //     key: 'Accounts',
    //     path: '/accounts-view',
    //     title: 'Cuentas',
    //     translateKey: 'nav.accounts',
    //     icon: 'accounts',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'userSettings',
    //     path: '/userSettings-view',
    //     title: 'Configuración',
    //     translateKey: 'nav.userSettings',
    //     icon: 'settings',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'singleMenuItem',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'collapseMenu',
    //     path: '',
    //     title: 'Collapse Menu',
    //     translateKey: 'nav.collapseMenu.collapseMenu',
    //     icon: 'collapseMenu',
    //     type: NAV_ITEM_TYPE_COLLAPSE,
    //     authority: [],
    //     subMenu: [
    //         {
    //             key: 'collapseMenu.item1',
    //             path: '/collapse-menu-item-view-1',
    //             title: 'Collapse menu item 1',
    //             translateKey: 'nav.collapseMenu.item1',
    //             icon: '',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //         {
    //             key: 'collapseMenu.item2',
    //             path: '/collapse-menu-item-view-2',
    //             title: 'Collapse menu item 2',
    //             translateKey: 'nav.collapseMenu.item2',
    //             icon: '',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //     ],
    // },
    // {
    //     key: 'groupMenu',
    //     path: '',
    //     title: 'Group Menu',
    //     translateKey: 'nav.groupMenu.groupMenu',
    //     icon: '',
    //     type: NAV_ITEM_TYPE_TITLE,
    //     authority: [],
    //     subMenu: [
    //         {
    //             key: 'groupMenu.single',
    //             path: '/group-single-menu-item-view',
    //             title: 'Group single menu item',
    //             translateKey: 'nav.groupMenu.single',
    //             icon: 'groupSingleMenu',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //         {
    //             key: 'groupMenu.collapse',
    //             path: '',
    //             title: 'Group collapse menu',
    //             translateKey: 'nav.groupMenu.collapse.collapse',
    //             icon: 'groupCollapseMenu',
    //             type: NAV_ITEM_TYPE_COLLAPSE,
    //             authority: [],
    //             subMenu: [
    //                 {
    //                     key: 'groupMenu.collapse.item1',
    //                     path: '/group-collapse-menu-item-view-1',
    //                     title: 'Menu item 1',
    //                     translateKey: 'nav.groupMenu.collapse.item1',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //                 {
    //                     key: 'groupMenu.collapse.item2',
    //                     path: '/group-collapse-menu-item-view-2',
    //                     title: 'Menu item 2',
    //                     translateKey: 'nav.groupMenu.collapse.item2',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //             ],
    //         },
    //     ],
    // },
]

export default navigationConfig
