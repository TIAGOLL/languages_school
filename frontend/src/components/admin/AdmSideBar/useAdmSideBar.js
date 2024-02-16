import { toast } from "react-toastify";
import api from "../../../services/api";
import { useState } from "react";

export const useAdmSideBar = () => {
  const user = JSON.parse(localStorage.getItem("@ticketsPRO"));
  const [professionalPhotoUrl, setProfessionalPhotoUrl] = useState(
    user.avatarUrl
  );
  const [professionalPhoto, setProfessionalPhoto] = useState(null);
  const [diaglogOpen, setDialogOpen] = useState(null);

  async function handleProfessionalPhoto(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      if (
        image.type === "image/jpeg" ||
        image.type === "image/png" ||
        image.type === "image/webp"
      ) {
        setProfessionalPhoto(image);
        setProfessionalPhotoUrl(URL.createObjectURL(image));
      } else {
        toast.error("Envie uma imagem do tipo PNG ou JPEG");
        setProfessionalPhoto(null);
        return;
      }
    }
  }

  async function saveProfessionalPhoto() {
    await api.professionals
      .uploadPhoto(user.id, professionalPhoto)
      .then(() => {
        setDialogOpen(false);
        toast.success("Foto salva com sucesso");
      })
      .catch((error) => {
        toast.error(`Erro ao salvar foto [${error.message}]`);
      });
  }

  return {
    user,
    professionalPhotoUrl,
    setProfessionalPhotoUrl,
    professionalPhoto,
    setProfessionalPhoto,
    diaglogOpen,
    setDialogOpen,
    handleProfessionalPhoto,
    saveProfessionalPhoto,
  };
};
