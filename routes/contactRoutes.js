const express = require("express");
const { createContact, getContact, getContacts, updateContact, deleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

// router.get("/",(req,res)=>{
//     res.json({message:"Get all contacts"});
// })

router.use(validateToken);

router.get("/", getContacts);


// router.post("/",(req,res)=>{
//     res.json({message:"Create contact"});
// })

router.post("/", createContact);

// router.get("/",getContacts).post("/",createContact);


// router.get("/:id",(req,res)=>{
//     res.json({message:`Get contact for ${req.params.id}`});
// })

router.get("/:id", getContact);


// router.put("/:id",(req,res)=>{
//     res.json({message:`update contact for ${req.params.id}`});
// })

router.put("/:id", updateContact);

// router.delete("/:id",(req,res)=>{
//     res.send({message:`Delete contact for ${req.params.id}`});
// })

router.delete("/:id", deleteContact);



module.exports = router;


