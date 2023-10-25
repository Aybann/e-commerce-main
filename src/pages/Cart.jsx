import { useState, useRef, useMemo } from "react";
import { useStore } from "../zustand/store";
import { Link } from "react-router-dom";

const Cart = () => {
  const [discount, setDiscount] = useState(0)
  const inputRef = useRef()
  const cartItems = useStore(store => store.cartItems)
  const deleteCartItems = useStore(store => store.deleteCartItems)
  const removeCartItems = useStore(store => store.removeCartItems)
  const adToDeliverItems = useStore(store => store.adToDeliverItems)

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => (total + item.price) * item.quantity, 0)
  },[cartItems])
 


  const handleDeleteItems = (id) => {
    deleteCartItems(id)
  }

  const handleDiscount = (e) => {
    e.preventDefault()
    if(inputRef.current.value === 'Ivan') {
      setDiscount(0.20)
    } else {
      alert(`code ${inputRef.current.value} not available`)
    }
    inputRef.current.value = ''
  }

  const generateDateTime = () => {
    const currentDate = new Date()
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }
    return currentDate.toLocaleString('en-US', options)
  }

  const generateCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  }

  const handleCheckOut = () => {
    adToDeliverItems({'date': generateDateTime(), 'code': generateCode(), "purchases": cartItems, "total": totalPrice.toFixed(2)})
    removeCartItems()
  }
 
  return (  
    <>
      <section>
        <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 relative ">
          <div className="mx-auto max-w-4xl">
            <header>
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart and Items</h1>
            </header>
            <div className="mt-8">
              <ul className="space-y-4">
                {
                  cartItems.length !== 0 
                  ? cartItems.map(item => (
                      <li key={item.id} >
                        <div 
                          className="flex items-center justify-between"
                        >
                          <Link
                            to={`/product/${item.id}`}
                            className="flex items-center gap-4 "
                          >
                            <div className="bg-white p-4 h-16 w-16 rounded">
                              <img
                                src={item.image}
                                alt=""
                                className=" object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 md:w-[28ch]">
                                {item.title}
                              </h3>
                              <div className="mt-0.5 space-y-px text-sm text-gray-600">
                                Price: ${item.price}
                              </div>
                            </div>
                          </Link>
                          <div className="flex flex-1 items-center justify-end  gap-2">
                            <form>
                              <label htmlFor="Line1Qty" className="sr-only"> Quantity </label>
                              <input
                                type="number"
                                min="1"
                                defaultValue={item.quantity}
                                id="Line1Qty"
                                className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                              />
                            </form>
                            <button type="button" onClick={e => handleDeleteItems(item.id)} className="text-gray-600 transition hover:text-red-600">
                              <span className="sr-only">Remove item</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>          
                    ))
                   : <li 
                        className="flex flex-col gap-2 justify-center items-center h-32">
                      <p className='text-xl '>Your Cart is empty!</p>
                      <Link to={'/products'} className="secondary-button">Shop Products</Link>
                    </li>
                } 
              </ul>
              <div className="mt-8 flex flex-col md:flex-row justify-between border-t border-gray-100 pt-8 sticky top-0 bottom-0 py-4 bg-gray-50">
                <form onSubmit={handleDiscount}>
                  <label 
                    htmlFor=""
                    className="text-sm text-gray-700 "
                  >
                    Add Code to Activate Discount
                  </label>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Use Promo Code Ivan" 
                      className="px-4 py-3 rounded-md mr-4 font-normal block border border-gray-300 bg-transparent p-0 outline-none mb-4 mt-2"
                      ref={inputRef}
                    />
                    <input type="submit" value="Add Code" className="primary-button"/>
                  </div>
                </form>
                <div className="mt-6 md:w-screen md:max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>${(totalPrice).toFixed(2)}</dd>
                    </div>

                    {
                      discount === 0
                      ? 
                        <>
                          <div className="flex justify-between !text-base font-medium">
                            <dt>Total</dt>
                            <dd>${(totalPrice).toFixed(2)}</dd>
                          </div>
                        </>
                      :
                        <>
                          <div className="flex justify-between">
                            <dt>Discount</dt>
                            <dd>20%</dd>
                          </div>

                          <div className="flex justify-between !text-base font-medium">
                            <dt>Total</dt>
                            <dd>${(totalPrice - (totalPrice * discount)).toFixed(2)}</dd>
                          </div>
                        </>
                    }
                  </dl>
                  {
                     discount !== 0 &&
                      <div className="flex justify-end">
                        <span
                          className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="-ms-1 me-1.5 h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                            />
                          </svg>
                          <p className="whitespace-nowrap text-xs">Discounts Applied</p>
                        </span>
                      </div>
                  }
                  <div className="flex justify-end">
                    <button
                      onClick={handleCheckOut}
                      className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
 
export default Cart;