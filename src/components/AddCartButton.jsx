import { useStore } from "../zustand/store";

const AddCartButton = ({item, quantity}) => {
  const addCartItems = useStore(store => store.addCartItems)
  const editCartItem = useStore(store => store.editCartItem)
  const cartItems = useStore(store => store.cartItems)

  const handleAddCart = () => {
    const isItemInCart = cartItems.filter(cartItem => cartItem.id === item.id)
  
    if(isItemInCart.length === 0){
      addCartItems({...item, "quantity": quantity})
    } else {
      const updateItem = {...item, "quantity": isItemInCart[0].quantity + quantity}
      editCartItem(isItemInCart[0].id, updateItem)
    }
  }

  return ( 
    <>
      <button onClick={handleAddCart} className='cart-button'>
        Add to Cart
      </button>
    </>
  );
}
 
export default AddCartButton;