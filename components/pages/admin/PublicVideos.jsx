'use client'

import APIKit from "@/common/helpers/APIKit";
import Loading from "@/components/common/Loading";
import TextInput from "@/components/common/TextInput";
import LargeModal from "@/components/modal/LargeModal";
import { useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const PublicVideos = () => {
  const [url, setUrl] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [deleteID, setDeleteID] = useState(null)

  const {
    data,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["videos"],
    queryFn: () =>
      APIKit.common.getVideos().then(({ data }) => {
        return data?.data
      }),
  });

  const handleSaveContent = () => {
    const onSuccess = () => {
      refetch();
      setUrl("");
    };
  
    const onError = (err) => {
      const errorMessage = err?.response?.data?.message || "Something went wrong";
      throw new Error(errorMessage);
    };
  
    const promise = APIKit.admin.createVideo({ url }).then(onSuccess).catch(onError);
  
    return toast.promise(promise, {
      loading: "Adding Video...",
      success: "Video Added successfully",
      error: (data) => data.message || "Something went wrong",
    });
  };
  

  const onDelete = () => {
    const onSuccess = () => {
      refetch();
      setIsDelete(false)
    };
    const onError = (err) => { throw err };

    const promise = APIKit.admin.deleteVideo(deleteID).then(onSuccess).catch(onError);

    return toast.promise(promise, {
      loading: "Deleting Video...",
      success: "Video Deleted successfully",
      error: "Something went wrong",
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center h-20 px-6 border-b bg-primary/[0.1] mb-6 rounded-lg">
        <h2 className="text-2xl font-semibold">
          Videos{" "}
          <span className="text-primary font-bold">({data?.length || 0})</span>
        </h2>
      </div>

      <div className="mt-6">

        <div className="space-y-3">
          <TextInput
            label="Youtube URL"
            placeholder="Enter youtube video url"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleSaveContent}
            className="text-sm font-semibold px-6 py-2 border rounded bg-primary text-white hover:bg-primary/[0.9] transition disabled:opacity-40"
            type="submit"
          >
            Save
          </button>
        </div>

        <div className="mt-6 border p-4 space-y-3">
          {data?.length ? (
            <>

              {
                data?.map((item, i) => {
                  return (
                    <div key={i} className="flex justify-between items-center p-2 gap-1 bg-primary/5 rounded">
                      <Link href={item?.url || ""} target="_blank" className="truncate hover:text-blue-600 hover:underline">{item?.url}</Link>
                      <button onClick={() => {
                        setIsDelete(true);
                        setDeleteID(item?._id)
                      }}>
                        <Trash size={24} className="hover:bg-red-600 cursor-pointer p-1 bg-red-500 rounded text-white flex-shrink-0" />

                      </button>
                    </div>
                  )
                })
              }

            </>
          ) :
            <p>No Videos Found!</p>
          }
        </div>
      </div>

      <LargeModal open={isDelete} setOpen={setIsDelete} title={"Are you sure you want to delete this item?"}>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-1.5 rounded bg-gray-300" onClick={() => setIsDelete(false)}>No</button>
          <button className="px-4 py-1.5 rounded bg-red-500 text-white" onClick={onDelete}>Yes</button>

        </div>
      </LargeModal>
    </div>
  )
}

export default PublicVideos