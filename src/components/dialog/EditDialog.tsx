import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useProfile } from "@/hooks/use-profile";
import { useEditProfile } from "@/hooks/edit-my-profile";
import { Form, FormMessage } from "../ui/form";
import { LuImagePlus } from "react-icons/lu";
import { Textarea } from "../ui/textarea";
import { Trash2 } from "lucide-react";

function EditDialog() {
  const { data: profile, isLoading, isError } = useProfile();

  if (isLoading) return <div className="text-gray-400">Loading...</div>;
  if (isError || !profile) return <div className="text-red-500">Gagal mengambil profil</div>;

  const {
    form,
    handleSubmit,
    clearImageBanner,
    isOpen,
    isPending,
    setIsopen,
    fileInputRef,
    handleAvatarChange,
    handleBannerChange,
    setBio,
    setName,
    setUsername,
    avatarPreview,
    bannerPreview,
    clearImage,
  } = useEditProfile();

  return (
    <Dialog open={isOpen} onOpenChange={setIsopen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer text-white border-none bg-green-600 hover:bg-green-800 hover:text-white "
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#2a2b2a] text-white">
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="text-center">Edit Profile</DialogTitle>
              <DialogDescription hidden />
            </DialogHeader>

            {/* Banner */}
            <div className="relative mb-6">
              <label className="block w-full h-32 bg-gray-400 rounded-md relative cursor-pointer overflow-hidden">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="hidden"
                />
                {bannerPreview ? (
                  <img
                    src={bannerPreview}
                    alt="preview-banner"
                    className="w-full h-full object-cover"
                  />
                ) : profile.backgroundUrl ? (
                  <img
                    src={profile.backgroundUrl}
                    alt="banner"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200">
                    Upload Banner
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <LuImagePlus className="text-white text-3xl" />
                </div>
                {(bannerPreview || profile.backgroundUrl) && (
                  <button
                    type="button"
                    onClick={clearImageBanner}
                    className="absolute top-2 right-2 bg-red-600 text-white py-2 px-3 rounded-2xl cursor-pointer"
                  >
                    <p>Delete</p>
                  </button>
                )}
              </label>
            </div>

            {/* Avatar */}
            <div className="relative w-full mb-6">
              <label className="absolute -bottom-6 left-4 w-16 h-16">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <div className="relative flex items-center justify-center border rounded-full cursor-pointer bg-gray-600">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="preview"
                      className="object-cover rounded-full w-16 h-16"
                    />
                  ) : profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.username}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  ) : (
                    <img
                      src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${profile.username}`}
                      alt={profile.username}
                      className="w-16 h-16 rounded-full"
                    />
                  )}

                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    <LuImagePlus className="text-white text-3xl" />
                  </div>
                  {(avatarPreview || profile.avatarUrl) && (
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </label>
            </div>

            {/* Form Fields */}
            <div className="grid gap-4 py-4 mt-10">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={profile.name}
                  className="col-span-3 focus-visible:ring-0"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
                <FormMessage />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue={profile.username}
                  className="col-span-3 focus-visible:ring-0"
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  defaultValue={profile.bio}
                  className="col-span-3 focus-visible:ring-0"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer"
              >
                {isPending ? "Wait..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditDialog;
