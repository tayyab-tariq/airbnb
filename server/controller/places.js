import asyncHandler from "express-async-handler";
import Place from '../models/Place.js'

const addPlaces = asyncHandler(async (req, res) => {
    const {user} = req;
    const {
        title,address,addedPhotos,description,price,
        perks,extraInfo,checkIn,checkOut,maxGuests,
    } = req.body;
    
    const placeDoc = await Place.create({
      owner:user._id,price,
      title,address,photos:addedPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,
    });
    res.json(placeDoc);
  
});

const getUserPlaces = asyncHandler(async (req, res) => {
    const {user} = req;  
    res.json( await Place.find({owner:user._id}) );
});

const getPlace = asyncHandler(async (req, res) => {
    const {id} = req.params;
    res.json(await Place.findById(id));
});

const getPlaces = asyncHandler(async (req, res) => {
    res.json( await Place.find() );
});

const updatePlace = asyncHandler(async (req, res) => {
    const {user} = req;
    const {
        id, title,address,addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,price,
    } = req.body;
    
    
    const placeDoc = await Place.findOne({ _id: id, owner: user._id });

    if (placeDoc) {

    placeDoc.set({
        title,address,photos:addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,price,
    });
        await placeDoc.save();
        res.json({message: 'Data Updated'});
    }
    
});


export {
    addPlaces, 
    getUserPlaces,
    getPlace,
    getPlaces,
    updatePlace
};