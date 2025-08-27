
const addressModel = require('../../models/address')

const addAddress = async(req,res)=>{
    try{
        const {userId , address , city , pincode,phone,notes} = req.body;

        if(!userId || !address || !city || !pincode || !phone || !notes){
            return res.status(400).json({success:false , message:'Missing Address Details'})
        
        }
        const newAddress = new addressModel({userId , address , city , pincode,phone,notes})

        await newAddress.save()
         res.status(200).json({success:true , message:'Address Added Successfully'})

    }
    catch(error){
        console.error(error)
        res.status(500).json({success:false , message:error.message})
    }
}


const fetchAddress = async(req,res)=>{
    try{
        const {userId} = req.params;
        if(!userId){
             return res.status(400).json({success:false , message:'User is Not Defined! Check login or Not'})
        }
        
        const addressList = await addressModel.find({userId})

        res.status(200).json({success:true , data:addressList})


    }
    catch(error){
        console.error(error)
        res.status(500).json({success:false , message:error.message})
    }
}


const updateAddress = async(req,res)=>{
    try{
         const {userId,addressId} = req.params;
         const formData = req.body;
         if(!userId || !addressId ){
             return res.status(404).json({success:false , message:'Cannot Find user id or address id'})
         }

         const address = await addressModel.findOneAndUpdate({_id:addressId , userId},formData ,{new:true})
         if(!address)
             return res.status(404).json({success:false , message:'Cannot Find Address'})

          res.status(200).json({success:true , data:address , message:'Address Edit Successfully'})


    }
    catch(error){
        console.error(error)
        res.status(500).json({success:false , message:error.message})
    }
}


const deleteAddress = async(req,res)=>{
    try{
         const {userId,addressId} = req.params;
         if(!userId || !addressId ){
             return res.status(404).json({success:false , message:'Cannot Find user id or address id'})
         }
          const address = await addressModel.findOneAndDelete({_id:addressId , userId})

           if(!address)
             return res.status(404).json({success:false , message:'Cannot Find Address'})

        res.status(200).json({success:true , data:address ,message:'Address Deleted Successfully'})


    }
    catch(error){
        console.error(error)
        res.status(500).json({success:false , message:error.message})
    }
}

module.exports = {addAddress,fetchAddress ,updateAddress,deleteAddress}