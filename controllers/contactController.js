//get all contacts
// const getContacts=(req,res)=>{
//     res.send({message:"Get all contacts"});
// }
const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModels");

const getContacts = asyncHandler(async(req, res) => {
    const contacts=await Contact.find({user_id:req.user_id});
    res.json(contacts);
    // res.json({ message: "get contacts" })
});
//create contact
const createContact = asyncHandler(async(req, res) => {
    console.log("the req body is: ",req.body);
    const {name,email,phone}=req.body;
    if(!name||!email||!phone){
        res.status(400)
        throw new Error("all fields are necessary");
    } 
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id,
    });
    res.json(contact);
});

//get specific contact
const getContact = asyncHandler(async(req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.json(contact);
});

//get specific contact
const updateContact = asyncHandler(async(req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    } 
    if(contact.user_id.toString()!==req.user.id){
        res.status(402);
        throw new Error("User dont have permission to update other user contacts")
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
    )
    res.json(updatedContact);
    // res.json({ message: `update contact for ${req.params.id}` });
});

//get specific contact
// const deleteContact = (req, res) => {
//     res.json({ message: `update contact for ${req.params.id}` });
// }

const deleteContact = asyncHandler(async(req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    } 
    if(contact.user_id.toString()!==req.user.id){
        res.status(402);
        throw new Error("User dont have permission to delete other user contacts")
    }
    await contact.deleteOne({_id:req.params.id});
    res.json(contact);
});



module.exports = { getContact, createContact, getContacts, updateContact, deleteContact };

