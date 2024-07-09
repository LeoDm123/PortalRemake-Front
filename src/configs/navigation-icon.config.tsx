import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiAdjustments,
    HiOutlineFilter,
    HiOutlineSearch,
    HiCurrencyDollar,
    HiOutlineCreditCard,
    HiOutlineCalendar,
    HiDocumentAdd,
    HiOutlineCash,
    HiOutlineTrash,
    HiOutlinePencil,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    add: <HiDocumentAdd />,
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    income: <HiCurrencyDollar />,
    edit: <HiOutlinePencil />,
    delete: <HiOutlineTrash />,
    expenses: <HiOutlineCreditCard />,
    budget: <HiOutlineCash />,
    calendar: <HiOutlineCalendar />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    settings: <HiAdjustments />,
    filter: <HiOutlineFilter />,
    search: <HiOutlineSearch />,
}

export default navigationIcon
