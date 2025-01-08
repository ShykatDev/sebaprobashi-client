'use client'

import ApplyLoan from "@/components/modal/apply/ApplyLoan"
import LargeModal from "@/components/modal/LargeModal"
import Image from "next/image"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const Loan = () => {
    const [isAppling, setIsAppling] = useState(false);

    const { t } = useTranslation()
    return (
        <div className="bg-background px-6 py-10">

            <h2 className="text-primary text-xl md:text-3xl font-semibold mb-3">{t("LOAN.TITLE")}</h2>
            <div dangerouslySetInnerHTML={{ __html: t("LOAN.DESC") }}></div>

            <hr className="my-6" />
            <div className="grid md:grid-cols-2 gap-6 items-center">
                <Image alt="bank" src={"/assets/probashi-bank.jpg"} width={1000} height={1000} className="w-full rounded-md" />
                <div>
                    <div dangerouslySetInnerHTML={{ __html: t("LOAN.PROCESS") }}></div>
                    <button onClick={()=> setIsAppling(true)} className="px-4 bg-primary text-white py-2 rounded mt-6">{t("LOAN.APPLY")}</button>

                </div>
            </div>


            <LargeModal
                open={isAppling}
                setOpen={setIsAppling}
                title={"Loan Application"}
            >
                <ApplyLoan setOpen={setIsAppling} />
            </LargeModal>
        </div>
    )
}

export default Loan