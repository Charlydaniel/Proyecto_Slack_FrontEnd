import ENVIRONMENT from "../config/environment"
import { CLOUDINARY } from "../constants/cloudinary"


export const resizeImage = (file, maxWidth = 1200, maxHeight = 1200) =>

  new Promise((resolve) => {
    const img = new Image()
    const canvas = document.createElement("canvas")
    const reader = new FileReader()

    reader.onload = (e) => {
      img.onload = () => {
        let { width, height } = img
        if (width > height && width > maxWidth) {
          height *= maxWidth / width
          width = maxWidth
        } else if (height > maxHeight) {
          width *= maxHeight / height
          height = maxHeight
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(
          (blob) => resolve(new File([blob], file.name, { type: file.type })),
          file.type,
          0.8
        )
      }
      img.src = e.target.result
    }

    reader.readAsDataURL(file)
  })


export const uploadImageToCloudinary = async (file) => {
  
  const data = new FormData()
  data.append("file",file)
  data.append("upload_preset", CLOUDINARY.UPLOAD_PRESET)
  data.append("folder", CLOUDINARY.FOLDER)


 const response = await fetch(
  
    `${CLOUDINARY.URL}${ENVIRONMENT.CLOUDINARY_API}${CLOUDINARY.POST}`,
    { method: "POST", body: data }
  ) 

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Error Cloudinary: ${error}`)
  }
    

  return response.json()
}
