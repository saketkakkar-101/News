// // Upload File

// import { ID, ImageGravity } from "appwrite";
// import { appwriteConfig, storage } from "./config";

// export async function uploadFile(file){
//     try {
//         const uploadedFile = await storage.createFile(
//             appwriteConfig.storageId,
//             ID.unique(),
//             file
//         )
//         return uploadedFile
//     } catch (error) {
//         console.log(error);
//         throw error
//     }
// }

// // get file url

// export async function getFilePreview(fileId) {
//     try {
//         const fileUrl = storage.getFilePreview(
//             appwriteConfig.storageId,
//             fileId,
//             2000,
//             2000,
//             ImageGravity.Top,
//             100
//         )

//         if (!fileUrl) throw new Error("File URL could not be generated.")

        
//         return fileUrl
//     } catch (error) {
//         console.log(error);
//     }
// }

// UploadImage.js

import { ID } from "appwrite";
import { appwriteConfig, storage } from "./config";

// Upload file
export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    return uploadedFile;
  } catch (error) {
    console.log("Upload failed:", error);
    throw error;
  }
}

// Get file view URL (works on free plan — no transformations)
export function getFilePreview(fileId) {
  try {
    return storage.getFileView(appwriteConfig.storageId, fileId);
  } catch (error) {
    console.log("Error getting file view URL:", error);
    return null;
  }
}
