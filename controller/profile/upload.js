import multer from 'multer';

import asyncHandler from '../../middleware/async.js';
import Profile from '../../models/Profile/Profile.js';


const multerConfig = multer.diskStorage({
  destination:(req, file, callback)=>{
    callback(null, 'public');
  },
  
  filename: (req, file, callback)=>{
    const ext = file.mimetype.split('/')[1];
    callback(null, `image-${Date.now()}.${ext}`);
  }
})

const isImage = (req, file, callback)=>{
  if(file.mimetype.startsWith('image')){
    callback(null, true);
  }else {
    callback(new Error('only image is allowed'))
  }
}
const upload = multer({
 storage: multerConfig,
 fileFilter: isImage
});

export const uploadImage = upload.single('photo');



export const imgUpload = asyncHandler(async(req, res)=>{
  const Profiles = await Profile.findById(req.params.id);
  if (!Profiles) {
    res.status(404).json({msg:'Profile Not fount'})
}

  const url = req.protocol + '://' + req.get('host')
  const path = url + '/public/' + req.file.filename

  
  await Profile.findByIdAndUpdate(req.params.id, { photo: path });

  res.status(200).json({
    success: true,
    data: path
  });

});
