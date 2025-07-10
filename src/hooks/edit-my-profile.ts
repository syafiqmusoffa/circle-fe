import api from "@/utils/api";
import {
  UpdateProfileschemaType,
  UpdateProfileTypes,
} from "@/utils/schemas/UpdateProfileTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useProfile } from "./use-profile";

export function useEditProfile() {
  const { data: profile } = useProfile();
  useEffect(() => {
    if (profile) {
      setBio(profile.bio || "");
      setName(profile.name || "");
      setUsername(profile.username || "");
    }
  }, [profile]);
  const [isOpen, setIsopen] = useState<boolean>(false);
  const [avatarDeleted, setAvatarDeleted] = useState(false);
  const [bannerDeleted, setBannerDeleted] = useState(false);
  function handleDialog() {
    setIsopen(false);
    setAvatarDeleted(false);
  }
  const queryclient = useQueryClient();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<UpdateProfileschemaType>({
    mode: "onChange",
    resolver: zodResolver(UpdateProfileTypes),
  });
  const { mutateAsync: mutateProfile, isPending } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();

      if (bio !== profile?.bio) formData.append("bio", bio);
      if (username !== profile?.username) formData.append("username", username);
      if (name !== profile?.name) formData.append("name", name);

      // Avatar
      if (avatarFile) {
        formData.append("avatarUrl", avatarFile);
      } else if (avatarDeleted) {
        formData.append("avatarDeleted", "true");
      }

      // Banner
      if (bannerFile) {
        formData.append("backgroundUrl", bannerFile);
      } else if (bannerDeleted) {
        formData.append("bannerDeleted", "true");
      }
      
      

      const res = await api.put("/api/update-profile", formData);
      return res.data;
    },

    onError: (error: any) => {
      toast.error(
        error.response.data.message ||
          "username 1 kata min 6, bio max 30, name min 5"
      );
    },
    onSuccess: (data: any) => {
      toast.success(data.message);
      setAvatarDeleted(false);
      queryclient.invalidateQueries({ queryKey: ["profile"] });
      queryclient.invalidateQueries({ queryKey: ["edit-profile"] });
      queryclient.invalidateQueries({ queryKey: ["thread"] });
      queryclient.invalidateQueries({ queryKey: ["threadById"] });
      handleDialog();
    },
  });
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setAvatarFile(selected);
      setAvatarPreview(URL.createObjectURL(selected));
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setBannerFile(selected);
      setBannerPreview(URL.createObjectURL(selected));
    }
  };
  
  const clearImage = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
    setAvatarDeleted(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.info("Foto profil akan dihapus setelah disimpan.");
  };

  const clearImageBanner = () => {
    setBannerPreview(null);
    setBannerFile(null);
    setBannerDeleted(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.info("Foto banner akan dihapus setelah disimpan.");
  };
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateProfile();
  };
  return {
    form,
    handleSubmit,
    clearImageBanner,
    isOpen,
    isPending,
    setIsopen,
    handleDialog,
    setAvatarFile,
    setAvatarPreview,
    setBannerFile,
    setBannerPreview,
    fileInputRef,
    handleAvatarChange,
    handleBannerChange,
    setBio,
    setName,
    setUsername,
    avatarPreview,
    bannerPreview,
    clearImage,
  };
  
}
