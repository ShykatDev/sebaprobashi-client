import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LargeModal from '../LargeModal';
import Application from './Application';

const NoteBeforeApply = ({ visa }) => {
    const [isApply, setIsApply] = useState(false);
    const { t } = useTranslation()

    return (
        <div className='relative p-3 rounded-lg overflow-hidden'>
            <div className='absolute w-full h-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10'>
                <Image
                    src={"/assets/banner.jpg"}
                    alt='watermark'
                    width={1000}
                    height={1000}
                    className='w-full h-full opacity-10 object-cover'
                />
            </div>
            {visa?.icon ? (
                <Image
                    src={visa?.icon}
                    alt='image'
                    width={500}
                    height={500}
                    className='w-full object-cover rounded-md mb-4'
                />) : null}
            <div className='bg-white/70 rounded-md p-3'>

                <div dangerouslySetInnerHTML={{ __html: visa?.description }}></div>
            </div>

            <button onClick={() => setIsApply(true)} className='mx-auto mt-6 shrink-0 bg-primary rounded text-background font-semibold text-sm hover:bg-primary/[0.9] px-4 py-2 flex items-center gap-2'>
                {t("AVAILABLE_VISA.APPLY")}
                <ChevronDoubleRightIcon className="size-4" />
            </button>


            <LargeModal
                open={isApply}
                setOpen={setIsApply}
                title={`Visa Application`}
            >
                <Application setOpen={setIsApply} />
            </LargeModal>
        </div>
    )
}

export default NoteBeforeApply