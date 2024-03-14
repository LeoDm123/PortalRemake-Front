import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiSwitchHorizontal,
    HiOutlineHome,
    HiAdjustments,
    HiOutlineFilter,
    HiOutlineSearch,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    transactions: <HiSwitchHorizontal />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    settings: <HiAdjustments />,
    filter: <HiOutlineFilter />,
    search: <HiOutlineSearch />,
}

export default navigationIcon
