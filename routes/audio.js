const multer = require('multer');
const path   = require('path');
/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: '../../public/files',
  filename: function(req, file, cb){
    cb(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
    console.log(file);
  }
}); 

const audio =  multer({
  storage: storageEngine,
  limits: { fileSize:20000000 },
  fileFilter: function(req, file, cb){
    validateFile(file, cb);
  }
}).single('audio');

var validateFile = function(file, cb ){
  allowedFileTypes = /mp3|wav/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType  = allowedFileTypes.test(file.mimetype);
  if(extension && mimeType){
    return cb(null, true);
  }else{
    cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
  }
}

module.exports = audio;