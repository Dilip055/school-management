const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
const uploadBaseUrl = apiBaseUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");

export const getUploadUrl = (filePath) => {
  if (!filePath) return "";
  if (/^https?:\/\//i.test(filePath)) return filePath;

  const normalizedPath = filePath.replace(/\\/g, "/");
  const uploadsIndex = normalizedPath.lastIndexOf("uploads/");
  const relativePath = uploadsIndex >= 0
    ? normalizedPath.slice(uploadsIndex)
    : `uploads/${normalizedPath.split("/").pop()}`;

  return `${uploadBaseUrl}/${relativePath.replace(/^\/+/, "")}`;
};
