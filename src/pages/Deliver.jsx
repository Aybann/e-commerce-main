import { useStore } from "../zustand/store";
import { Link } from "react-router-dom";

const Deliver = () => {
  const toDeliverItems = useStore(store => store.toDeliverItems)

  return ( 
    <>
      <section>
        <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 relative ">
          <div className="mx-auto max-w-4xl">
            <header>
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">On to Deliver Items</h1>
            </header>
            <div className="mt-8">
              <ul className="space-y-4 flex flex-col gap-8">
                {
                  toDeliverItems.length !== 0 
                  ? toDeliverItems.map((toDeliverItem, index) => (
                      <li key={index}>
                        <div className="mb-4 text-sm">
                          <p>Purchase made on <span className="font-semibold text-black">{toDeliverItem.date}</span></p>
                          <p>Total amount to pay <span className="font-semibold text-black">${toDeliverItem.total}</span></p>
                          <p>Purchase Code <span className="font-semibold text-black">{toDeliverItem.code}</span></p>
                        </div>
                        <ul>
                          {
                            toDeliverItem.purchases.map((item, index) => (
                              <li key={index} >
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
                                  </div>
                                </div>
                              </li>  
                            )) 
                          }
                        </ul>
                      </li>
                    ))
                  : <li 
                      className="flex flex-col gap-2 justify-center items-center h-32">
                      <p className='text-xl '>There's no Items to Receive!</p>
                      <div className="flex gap-2">
                        <Link to={'/products'} className="secondary-button">Shop Products</Link>
                        <Link to={'/cart'} className="secondary-button">Checkout Cart</Link>
                      </div>
                    </li>
                } 
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
 
export default Deliver;