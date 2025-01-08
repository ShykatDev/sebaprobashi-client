import { useTranslation } from "react-i18next"

const OutpassPopup = ({setOpen, setFormModal}) => {
    const {t} = useTranslation()
  return (
    <div>
        <h2 className="text-lg text-primary font-semibold">{t("OUTPASS.POPUP_TITLE")}</h2>
        <div className="w-full border border-primary my-3"></div>
        <p>{t("OUTPASS.POPUP_DESCRIPTION")}</p>

        <div className="mt-6 flex items-center justify-end gap-3">
            <button onClick={()=> setOpen(false)} className="px-4 py-2 rounded-md bg-red-500 text-white">{t("OUTPASS.DISAGREE")}</button>
            <button onClick={()=> setFormModal(true)} className="px-4 py-2 rounded-md bg-primary text-white">{t("OUTPASS.AGREE")}</button>
        </div>
    </div>
  )
}

export default OutpassPopup