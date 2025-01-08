"use client";

import APIKit from "@/common/helpers/APIKit";
import Loading from "@/components/common/Loading";
import TextInput from "@/components/common/TextInput";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const HeadingPage = () => {
  const [content, setContent] = useState();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["we/heading"],
    queryFn: () =>
      APIKit.common.getContent().then(({ data }) => {
        setContent(data?.data?.results);
        return data?.data?.results;
      }),
  });
  

  const handleSaveContent = () => {
    let promise;

    const onSuccess = ()=> refetch();
    const onError = (err)=> {throw err};

    if (data) {
      // Edit
      promise = APIKit.admin.editContent({heading:content}, data?._id).then(onSuccess).catch(onError);
    } else {
      // Add
      promise = APIKit.admin.createContent({heading:content}).then(onSuccess).catch(onError);
    }

    return toast.promise(promise, {
        loading: "Changing Content...",
        success: "Content Changed successfully",
        error: "Something went wrong",
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center h-20 px-6 border-b bg-primary/[0.1] mb-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Sliding Heading</h2>
      </div>
      <div className="space-y-3">
        <TextInput
          label="Enter Heading"
          placeholder="e.g. Seba Probashi"
          defaultValue={content?.heading || ""}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleSaveContent}
          className="text-sm font-semibold px-6 py-2 border rounded bg-primary text-white hover:bg-primary/[0.9] transition disabled:opacity-40"
          type="submit"
        >
          {data ? "Edit" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default HeadingPage;
