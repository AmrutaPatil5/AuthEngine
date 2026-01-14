import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      // We are keeping the original name for simplicity
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ storage: storage })