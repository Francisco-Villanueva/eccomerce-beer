//CONTROLLERS FOR CART
const express = require("express");
const router = express.Router();
const {Cart, Cart_buy} = require("../../db/models/Cart");

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
        count: 0,
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

//REMOVE PRODUCTS
const remove = async (req, res)=>{
  const {bookId, userId} = req.params;

  try {
    if(!userId) res.status(400).json({ message: "User ID not provided." });
    
    let actualCartBuy = await Cart_buy.findOne({where: {cartId: userId, bookId}});
    
    if(!actualCartBuy) res.status(404).json({message: "error trying to remove book"})

    if(actualCartBuy.amount > 1){
      actualCartBuy.amount -= 1;
      await actualCartBuy.save();
    }else{
      await actualCartBuy.destroy();
    }

    const cart = await Cart.findOne({ where: { userId }, include: [Cart_buy] });

    if (cart) {
      cart.cart_buys = await Cart_buy.findAll({ where: { cartId: userId } });
      await cart.save();
    }

    return res.status(200).json({ message: "Product removed from the cart successfully." });
  } catch (error) {
    console.log("error trying to remove the product from the cart", error);
  }
}

//EDIT AMOUNT OF PRODUCTS
const editAmount = async (req, res)=>{
  const {bookId, userId} = req.params;
  //const newAmount = req.body; //recibe nueva cantidad por req.body?

  try {
    if(!userId) res.status(400).json({ message: "User ID not provided." });
    
    let actualCartBuy = await Cart_buy.findOne({where: {cartId: userId, bookId}});
    if(!actualCartBuy || newAmount <= 0) res.status(404).json({message: "error trying to change the product's amount"});

    actualCartBuy.amount = newAmount;
    actualCartBuy.save();

    const cart = await Cart.findOne({ where: { userId }, include: [Cart_buy] });

    if (cart) {
      cart.cart_buys = await Cart_buy.findAll({ where: { cartId: userId } });
      await cart.save();
    }

    return res.status(200).json({ message: "Product'amount changed successfully."});
  } catch (error) {
    console.log("error trying to change the product's amount", error);
  }
}

module.exports = {add, remove, editAmount};