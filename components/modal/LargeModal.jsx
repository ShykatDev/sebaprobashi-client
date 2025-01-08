import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

export default function LargeModal({ title, open, setOpen, children }) {
  const {t} = useTranslation();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="ease-in duration-200"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center min-h-full p-4 text-center sm:items-center sm:p-0"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full px-4 py-4 mx-4 text-left transition-all transform bg-background rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                <div className="flex justify-between items-center">
                  {title ? <h2 className="font-semibold text-2xl">{t(title)}</h2> : null}
                  <button
                    className="self-end pt-2 text-gray-500 hover:text-gray-800 focus:outline-none absolute top-4 right-4"
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className="size-6 text-red-700" />
                  </button>
                </div>
                <hr className="border my-4" />
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
