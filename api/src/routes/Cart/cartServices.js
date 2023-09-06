//CONTROLLERS FOR CART
const express = require("express");
const router = express.Router();
const {Cart, Cart_buy} = require("../../db/models/Cart");

//ADD PRODUCTS
const add = async (req, res)=>{
  const {bookId} = req.params;
  const userId = req.user.userId; //chequear como lo recibe.
  try {
    if(!userId) res.status(400).json({ message: "User ID not provided." });
    
    let actualCartBuy = await Cart_buy.findOne({where: {cartId: userId, bookId}});

    if(!actualCartBuy){
      actualCartBuy = await Cart_buy.create({
        cartId: userId,
        bookId,
        amount: 1,
      })
    }else {
      actualCartBuy.amount += 1;
      await actualCartBuy.save();
    }

    let cart = await Cart.findOne({where: {userId}, include: [Cart_buy]});

    if(!cart){
      cart = await Cart.create({
        userId,
        count: 0, //==>
        amount: actualCartBuy.amount, //no se cual es precio o cantidad;
      })
    }

    cart.cart_buys = [actualCartBuy];
    await cart.save();

    res.status(200).json({message: "book addded succesfully"});
  } catch (error) {
    console.log("error trying to add products to the cart", error);
  }
}

module.exports = {add};