import { Avatar,  AvatarImage } from "../ui/avatar";
import { LuImagePlus } from "react-icons/lu";
import { useProfile } from "@/hooks/use-profile";
import { useCreate } from "@/hooks/use-create-thread";
import { Textarea } from "../ui/textarea";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

function CreateContent() {
  const { data: profile, isLoading, isError } = useProfile();
  const {
    content,
    handleFileChange,
    setContent,
    fileInputRef,
    isPending,
    preview,handleSubmit, clearImage
  } = useCreate();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !profile) return <div>Gagal mengambil profil</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4 flex items-center gap-3">
        <Avatar className="w-12 h-12">
          {profile.avatarUrl ? (
            <AvatarImage src={profile.avatarUrl} alt={profile.username} />
          ) : (
            <AvatarImage
              src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${profile.username}`}
              alt={profile.username}
            />
          )}
        </Avatar>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What is happening?!"
          className="bg-transparent flex-1 p-2 rounded-lg text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="justify-between flex px-4 ">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="cursor-pointer w-full relative">
          <div className=" ">
            {preview ? (
              <div className="flex justify-center relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-100 h-auto rounded-4xl pb-3"
                />{" "}
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute right-0 bg-opacity-60 text-white bg-red-600 hover:bg-red-400 p-1 rounded-2xl cursor-pointer px-3 py-2"
                >
                  <Trash2 />
                </button>
                <div></div>
              </div>
            ) : (
              <span
                className="absolute text-gray-500 rounded-2xl flex justify-base right-3"
                onClick={() => fileInputRef.current?.click()}
              >
                <LuImagePlus size={37} />
              </span>
            )}
          </div>
        </div>
        <div className="items-center flex">
          <Button
            className="cursor-pointer text-white border-none bg-green-600 hover:bg-green-800 hover:text-white"
            type="submit"
            disabled={isPending || (!content.trim() && !preview)}
          >
            {isPending ? "wait..." : "submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreateContent;
