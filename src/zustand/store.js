import { create } from "zustand"

const store = (set) => ({
  items: [],
  setItems: (newItems) => 
    set((store) => ({items: newItems })),
  searchKeyWord: '',
  setKeyword: (word) => 
    set((store) => ({searchKeyWord: word })),
  cartItems: [],
  addCartItems: (newItems) => 
    set((store) => ({cartItems: [ newItems, ...store.cartItems ] })),
  deleteCartItems: (itemId) => 
    set((store) => ({cartItems: store.cartItems.filter(item => item.id !== itemId) })),
  removeCartItems: () => 
    set((store) => ({cartItems: [] })),
  editCartItem: (itemId, updateItem) => 
    set((store) => ({
      cartItems: store.cartItems.map(item => 
        item.id === itemId 
        ? updateItem
        : item
      )
    })),
  toDeliverItems: [],
  adToDeliverItems: (newItem) => 
    set((store) => ({toDeliverItems: [newItem, ...store.toDeliverItems ] }))
})


export const useStore = create(store)