import { forwardRef } from 'react'
import classNames from 'classnames'
import { useConfig } from '../../ui/ConfigProvider'
import type { CommonProps } from '../../ui/@types/common'
import type { ReactNode, ComponentPropsWithRef, MouseEvent } from 'react'

export interface CardProps
    extends CommonProps,
        Omit<ComponentPropsWithRef<'div'>, 'onClick'> {
    clickable?: boolean
    bodyClass?: string
    bordered?: boolean
    header?: string | ReactNode
    headerClass?: string
    headerBorder?: boolean
    headerExtra?: string | ReactNode
    footer?: string | ReactNode
    footerClass?: string
    footerBorder?: boolean
    onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

const HomeCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const { cardBordered } = useConfig()

    const {
        children,
        className,
        clickable = false,
        bodyClass,
        bordered = cardBordered || false,
        header,
        headerClass,
        headerBorder = true,
        headerExtra,
        footer,
        footerClass,
        footerBorder = true,
        onClick,
        ...rest
    } = props

    const cardClass = classNames(
        'card',
        className,
        bordered ? `card-border` : `card-shadow`,
        clickable && 'cursor-pointer user-select-none',
    )

    const cardBodyClasss = classNames('card-body', bodyClass)
    const cardHeaderClass = classNames(
        'card-header',
        headerBorder && 'card-header-border',
        headerExtra && 'card-header-extra',
        headerClass,
    )
    const cardFooterClass = classNames(
        'card-footer',
        footerBorder && `card-footer-border`,
        footerClass,
    )

    const renderHeader = () => {
        if (typeof header === 'string') {
            return (
                <h4
                    style={{
                        color: ' #fff',
                    }}
                >
                    {header}
                </h4>
            )
        }
        return <>{header}</>
    }

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        onClick?.(e)
    }

    return (
        <div
            ref={ref}
            className={cardClass}
            role="presentation"
            onClick={handleClick}
            {...rest}
            style={{
                borderColor: ' #12263f',
                width: '100%',
            }}
        >
            {header && (
                <div
                    className={cardHeaderClass}
                    style={{
                        backgroundColor: ' #12263f',
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px',
                        color: ' #fff',
                    }}
                >
                    {renderHeader()}
                    {headerExtra && <span>{headerExtra}</span>}
                </div>
            )}
            <div className={cardBodyClasss} style={{ fontSize: 'medium' }}>
                {children}
            </div>
            {footer && <div className={cardFooterClass}>{footer}</div>}
        </div>
    )
})

HomeCard.displayName = 'HomeCard'

export default HomeCard
