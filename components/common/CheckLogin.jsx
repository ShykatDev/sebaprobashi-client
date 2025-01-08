import cn from '@/common/helpers/UtilKit';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const CheckLogin = ({ className, title }) => {
    const { t } = useTranslation();
    return (
        <div className={cn("h-full flex flex-col justify-center items-center py-10 px-6 bg-background", className)}>
            <h2 className="text-primary font-medium text-2xl text-center capitalize">
                {title}
            </h2>
            <Link href={"/login"} className="w-1/2 p-3 mt-3 bg-primary text-background rounded-md font-semibold hover:bg-primary/[0.9] text-center disabled:opacity-40 drop-shadow-md">
                {t("BUTTONS.LOGIN")}
            </Link>

        </div>
    )
}

export default CheckLogin