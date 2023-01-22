import React, { createContext,useState,useEffect } from "react";

interface obj{
    id:number,
    name: string,
    price: number,
    imageUrl: string,
    quantity: number
}
type product =  {
    id:number,
    name: string,
    price: number,
    imageUrl: string,
}
interface contextState 
{ 
  isCartOpen: boolean,
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>,
  cartItems?:Array<obj>,
  addItemToCart:React.Dispatch<React.SetStateAction<any>>,
  removeItemToCart:React.Dispatch<React.SetStateAction<any>>
  clearItemfromCart:React.Dispatch<React.SetStateAction<any>>
  cartCount?: number,
  cartTotal?: number
}


const addCartItem = (cartItems:Array<obj>,productToAdd:product) => {


    const existingCartItem  = cartItems.find((cartItem)=> cartItem.id === productToAdd.id )

    if(existingCartItem) {
        return cartItems.map((cartItem)=> cartItem.id === productToAdd.id
         ? {...cartItem,quantity: cartItem.quantity+1} 
         :
         cartItem)
    }

    return [...cartItems,{...productToAdd, quantity:1}]
 
}

const removeCartItem = (cartItems:Array<obj>,cartItemToRemove:obj) => {
   
    const existingCartItem  = cartItems.find((cartItem)=> cartItem.id === cartItemToRemove.id )

    if(existingCartItem?.quantity === 1){
    return cartItems.filter(cartItem=> cartItem.id !== cartItemToRemove.id)
    }

    if(existingCartItem) {
        return cartItems.map((cartItem)=> cartItem.id === cartItemToRemove.id
         ? {...cartItem,quantity: cartItem.quantity-1} 
         :
         cartItem)
    }

}

const clearCartItem =(cartItems:Array<obj>,cartItemToClear:obj) => {
    return cartItems.filter(cartItem=> cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext<contextState> ({
    isCartOpen: false,
    setIsCartOpen : () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart:() => {},
    clearItemfromCart:() => {},
    cartCount: 0,
    cartTotal: 0
})


export const CartProvider = ({children}:any) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);


    useEffect(()=>{
        const newCartCount = cartItems.reduce((total,cartItem:obj)=>total + cartItem.quantity,0)
        setCartCount(newCartCount);
    },[cartItems])

    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total,cartItem:obj)=>total + cartItem.quantity*cartItem.price,0)
        setCartTotal(newCartTotal);
    },[cartItems])

    const addItemToCart = (productToAdd:product) => {
      setCartItems(addCartItem(cartItems as  Array<obj>,productToAdd as product)as any)
    }

    const removeItemToCart = (cartItemToRemove:product) => {
        setCartItems(removeCartItem(cartItems as  Array<obj>,cartItemToRemove as obj)as any)
      }

     const clearItemfromCart = (cartItemToClear:product) => {
        setCartItems(clearCartItem(cartItems as  Array<obj>,cartItemToClear as obj)as any)
      }  

    const value = {isCartOpen, setIsCartOpen,addItemToCart,removeItemToCart,cartItems,cartCount ,clearItemfromCart,cartTotal}
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}
