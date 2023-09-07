//CONTROLLERS FOR CART
const express = require("express");
const router = express.Router();
const {Cart, Cart_buy} = require("../../db/models");

//ADD PRODUCTS
const add = async (req, res)=>{
  const {bookId, userId} = req.params;
  try {
    if(!userId) res.status(400).json({ message: "User ID not provided." });
    
    let actualCartBuy = await Cart_buy.findOne({where: {cartId: userId, bookId}});

    if(!actualCartBuy){
      actualCartBuy = await Cart_buy.create({
        cartId: userId,
        bookId,
        count: 1,
      })
    }else {
      actualCartBuy.count += 1;
      await actualCartBuy.save();
    }

    let cart = await Cart.findOne({where: {userId}});

    if(!cart){
      cart = await Cart.create({
        userId,
      })
    }

    await cart.addCart_buy(actualCartBuy);

    res.status(200).json({message: "book addded succesfully"});
  } catch (error) {
    console.log("error trying to add products to the cart", error);
  }
}

//REMOVE PRODUCTS
const remove = async (req, res)=>{
  const {bookId, userId} = req.params;

  try {
    if(!userId) res.status(400).json({ message: "User ID not provided." });
    
    let actualCartBuy = await Cart_buy.findOne({where: {cartId: userId, bookId}});
    
    if(!actualCartBuy) res.status(404).json({message: "error trying to remove book"})

    if(actualCartBuy.count > 1){
      actualCartBuy.count -= 1;
      await actualCartBuy.save();
    }else{
      await actualCartBuy.destroy();
    }

    const cart = await Cart.findOne({ where: { userId }});

    if (cart) {
      // cart.cart_buys = await Cart_buy.findAll({ where: { cartId: userId } });
      // await cart.save();
    }

    return res.status(200).json({ message: "Product removed from the cart successfully." });
  } catch (error) {
    console.log("error trying to remove the product from the cart", error);
  }
}

//EDIT AMOUNT OF PRODUCTS
const editAmount = async (req, res)=>{
  const {bookId, userId} = req.params;
  const newCount = req.body; //recibe nueva cantidad por req.body?

  try {
    if(!userId) res.status(400).json({ message: "User ID not provided." });
    
    let actualCartBuy = await Cart_buy.findOne({where: {cartId: userId, bookId}});
    if(!actualCartBuy || newCount <= 0) res.status(404).json({message: "error trying to change the product's amount"});

    actualCartBuy.count = newCount;
    actualCartBuy.save();

    const cart = await Cart.findOne({ where: { userId }});

    if (cart) {
      // cart.cart_buys = await Cart_buy.findAll({ where: { cartId: userId } });
      // await cart.save();
    }

    return res.status(200).json({ message: "Product'amount changed successfully."});
  } catch (error) {
    console.log("error trying to change the product's amount", error);
  }
}

module.exports = {add, remove, editAmount};