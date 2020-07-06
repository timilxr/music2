const multer = require('multer');
const path   = require('path');
/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: './client/src/images',
  filename: function(req, file, cb){
    cb(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
    console.log(file);
  }
}); 
// const storageEngine2 = multer.diskStorage({
//   destination: '../../public/files',
//   filename: function(req, file, cb){
//     cb(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
//     console.log(file);
//   }
// }); 

const image =  multer({
  storage: storageEngine,
  limits: { fileSize:10000000 },
  fileFilter: function(req, file, cb){
    validateFile(file, cb);
  }
}).single('image');

// const audio =  multer({
//   storage: storageEngine2,
//   limits: { fileSize:20000000 },
//   fileFilter: function(req, file, cb){
//     validateFile2(file, cb);
//   }
// }).single('audio');

var validateFile = function(file, cb ){
  allowedFileTypes = /jpeg|jpg|png|gif/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType  = allowedFileTypes.test(file.mimetype);
  if(extension && mimeType){
    return cb(null, true);
  }else{
    cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
  }
}

// var validateFile2 = function(file, cb ){
//   allowedFileTypes2 = /mp3|wav/;
//   const extension = allowedFileTypes2.test(path.extname(file.originalname).toLowerCase());
//   const mimeType  = allowedFileTypes2.test(file.mimetype);
//   if(extension && mimeType){
//     return cb(null, true);
//   }else{
//     cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
//   }
// }

// module.exports = audio;
module.exports = image;