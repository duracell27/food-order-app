import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";

function EditableImage({ link, setLink }) {
  const handleFileChange = async (e) => {
    e.preventDefault();

    const files = e.target.files;
    if (files.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      toast("Uploading ...");
      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => setLink(link));
        }
        throw new Error("Something went wrong");
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading ...",
        success: "Uploading completed successfully",
        error: "Upload error",
      });
    }
  };

  return (
    <>
      <div className="relative ">
        {link && (
          <Image
            className="rounded-lg h-full w-full"
            width={250}
            height={250}
            src={link}
            alt="avatar"
          ></Image>
        )}
        {!link && (
            <div className="bg-gray-200 text-center p-4 text-gray-500 rounded-lg mb-2">
                No image
            </div>
        )}
      </div>
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="border border-gray-300 cursor-pointer rounded-lg block p-2 px-8 text-center mt-4">
          Edit
        </span>
      </label>
    </>
  );
}

export default EditableImage;
