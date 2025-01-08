import { useTranslation } from "react-i18next";

const TextInput = (props, {required = true}) => {
    const {t} = useTranslation();
    return (
        <div className="w-full">
            <label htmlFor={props.label} className="font-semibold text-lg mb-1 block">
                {t(props.label)}
                {required && <span className={"text-red-500 ml-1"}>*</span>}
            </label>
            <div
                className="flex items-center bg-white/[0.5] border border-gray-400 rounded-md focus-within:outline overflow-hidden">
                <input {...props} className="w-full p-3 outline-none bg-transparent"/>
            </div>
            {props.error && <small className="block w-full mt-1 px-2 py-1 bg-red-50 rounded text-red-600 font-regular">
                {props.error}
            </small>}
        </div>
    );
};

export default TextInput;
