import APIKit from '@/common/helpers/APIKit';
import { countryOptions } from '@/utils/options';
import { Switch } from '@headlessui/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const VisaRow = ({ visa, index:i, refetch }) => {
    const [enabled, setEnabled] = useState(visa?.is_publish);

    const handleChange = (e)=> {
        setEnabled(e);

        const updatedPayload = {
            is_publish: e
        }

        const promise = APIKit.admin.updateAvailableVisa(visa?._id, updatedPayload);

        refetch()

        return toast.promise(promise, {
            loading: "Changing Visa Status...",
            success: "Status changed successfully",
            error: "Something went wrong",
          });
    }

    return (
        <tr className="bg-white/[0.5] border-b ">
            <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap"
            >
                {i + 1}
            </th>
            <td className="px-6 py-4 ">
                {visa?.icon ?
                    <a href={visa?.icon} target="_blank" className="underline text-blue-500">View</a>
                    :
                    "Not Set"}
            </td>
            <td className="px-6 py-4 ">{countryOptions.find(item => item.value === visa?.country).label}</td>
            <td className="px-6 py-4 ">{visa?.title}</td>
            <td>
                <Switch
                    checked={enabled}
                    onChange={handleChange}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
                >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                </Switch>
            </td>
        </tr>
    )
}

export default VisaRow