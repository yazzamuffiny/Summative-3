//call express
const express = require('express');

//create router
const router = express.Router()

//import multer
const multer = require('multer')

const path = require('path')

//multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads'); // Store uploads in this directory
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext); // Use unique filenames
    },
  });

  const upload = multer({ storage });

  //import controllers
  const {
    getListings,
    getListing,
    createListing,
    updateListing,
    deleteListing
  } = require('../controllers/listingController')

  //routes
//get all listings
router.get('/', getListings);
//get single listing
router.get('/:id', getListing);
//create new listing
router.post('/', upload.single('image'), createListing);
//update listing
router.patch('/:id', updateListing)
//delete listing
router.delete('/:id', deleteListing);

//export route
module.exports = router;