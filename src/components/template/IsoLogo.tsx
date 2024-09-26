import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'
import LogoImg from '../../../public/img/logo/Isologo.png'

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    ext?: 'png' | 'svg' | 'jpg' | 'jpeg'
    imgClass?: string
    logoWidth?: number | string
}

const LOGO_SRC_PATH = '/img/logo/'

const IsoLogo = (props: LogoProps) => {
    const {
        type = 'full',
        mode = 'light',
        ext = 'svg',
        className,
        imgClass,
        style,
        logoWidth = '80%',
    } = props

    return (
        <div
            className={classNames('logo', className)}
            style={{
                ...style,
                ...{
                    width: logoWidth,
                    display: 'flex',
                    alignItems: 'center',
                },
            }}
        >
            <img
                className={imgClass}
                //src={`${LOGO_SRC_PATH}logo-${mode}-${type}.${ext}`}
                src={LogoImg}
                alt={`${APP_NAME} logo`}
            />
        </div>
    )
}

export default IsoLogo
