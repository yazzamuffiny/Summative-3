const { response } = require('express')

//import listing model
const Listing = require('../models/listingModel')

//import mongoose
const mongoose = require('mongoose')

//get all Listings
const getListings = async (req, res) => {
    try {
        const listings = await Listing.find({}).populate({
            path:'comments',
            model: 'Comment'
        }).sort({createdAt: -1});
        res.status(200).json(listings)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

//get single listing
const getListing = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Listing: Invalid Id' })
    }

    try {
        const listing = await Listing.findById(id).populate({
            path: 'comments',
            model: 'Comment'
        });

        if (!listing) {
            return res.status(404).json({ error: 'No such Listing, Listing does not exist'})
        }

        res.status(200).json(listing)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//create listing
const createListing = async (req, res) => {
    const { 
        breed,
        user_id,
        gender,
        age,
        size,
        location,
        number_available,
        price,
        additional_info
    } = req.body;

    const imageFilename = req.file ? req.file.filename : null;

    try {
        const listing = await Listing.create({
            breed,
            user_id,
            gender,
            age,
            size,
            location,
            number_available,
            price,
            additional_info,
            image: imageFilename
        })
        res.status(200).json(listing)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//update listing
const updateListing = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Listing'})
    }

    const listing = await Listing.findByIdAndUpdate(
        {_id: id},
        {...req.body},
        {new: true}
    );

    if(!listing) {
        return res.status(404).json({error: 'No such Listing'});
    }

    res.status(200).json(listing)
}

//delete listing
const deleteListing = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Listing'})
    }

    const listing = await Listing.findByIdAndDelete({_id: id})

    if(!listing) {
        return res.status(404).json({error: 'No such Listing'});
    }

    res.status(200).json(listing)
}

//export controllers
module.exports = {
    getListings,
    getListing,
    createListing,
    updateListing,
    deleteListing
}