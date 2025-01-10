"use client"

import APIKit from "@/common/helpers/APIKit"
import Loading from "@/components/common/Loading"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import ReactPlayer from "react-player"

const Videos = () => {
    const { t } = useTranslation()

    const {
        data,
        isLoading
    } = useQuery({
        queryKey: ["videos"],
        queryFn: () =>
            APIKit.common.getVideos().then(({ data }) => {
                return data?.data
            }),
    });

    

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="p-4 sm:p-10 min-h-auto">
            <h2 className="font-semibold text-2xl text-primary md:text-4xl">{t("PUBLICVIDEOS.TITLE")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {data?.length ? (
                    <>
                        {
                            data?.map((item, i) => {
                                return (
                                    <div key={i} className="relative h-40 sm:h-64 overflow-hidden rounded-md">
                                        <ReactPlayer url={item?.url} controls width="100%" height="100%" className="absolute" />
                                    </div>
                                )
                            })
                        }
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default Videos