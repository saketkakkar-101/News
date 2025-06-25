import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useToast } from "@/hooks/use-toast";
import { getFilePreview, uploadFile } from "@/lib/appwrite/UploadImage";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const [createPostError, setCreatePostError] = useState(null);

  const [imageUploadError, setImageUploaderror] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const handleuploadImage = async () => {
    try {
      if (!file) {
        setImageUploaderror("please select an image!");
        toast({ title: "Please select an image!" });
        return;
      }
      setImageUploading(true);
      setImageUploaderror(null);

      const uploadedFile = await uploadFile(file);
      const postImageUrl = getFilePreview(uploadedFile.$id);

      setFormData({ ...formData, image: postImageUrl });

      toast({ title: "Image uploaded successfully!" });

      if (postImageUrl) {
        setImageUploading(false);
      }
    } catch (error) {
      setImageUploaderror("Image upload failed");
      console.log(error);

      toast({ title: "Image upload failed!" });
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/create`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({ title: "Something went wrong! Please try again." });
        setCreatePostError(data.message);
        return;
      }

      if (res.ok) {
        toast({ title: "Article published successfully!" });
        setCreatePostError(null);

        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      toast({ title: "Something went wrong! Please try again." });
      setCreatePostError("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold text-slate-700">
        Create a post
      </h1>

      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="w-full sm:w-3/4 h-12 border border-slate-400 focus-visible:ring-0 
focus-visible:ring-offset-0"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger
              className="w-full sm:w-1/4 h-12 border border-slate-400 focus-visible:ring-0 
focus-visible:ring-offset-0"
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="worldnews">World News</SelectItem>
                <SelectItem value="sportsnews">Sports News</SelectItem>
                <SelectItem value="localnews">Local News</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div
          className="flex gap-4 items-center justify-between border-4 
  border-slate-600 border-dotted p-3"
        >
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button
            className="bg-slate-700"
            type="button"
            onClick={handleuploadImage}
          >
            {imageUploading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>

        {imageUploadError && <p className="text-red-600">{imageUploadError}</p>}

        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write something here..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />

        <Button
          type="submit"
          className="h-12 bg-green-600 font-semibold max-sm:mt-5 text-md"
        >
          Publish your article
        </Button>
        {createPostError && (
          <p className="text-red-600 mt-5">{createPostError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
