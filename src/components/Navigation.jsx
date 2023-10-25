import searchIcon from '../assets/bx-search.svg'
import userIcon from '../assets/bxs-user.svg'
import cartIcon from '../assets/bxs-cart.svg'
import logo from '../assets/logo.png'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { useStore } from "../zustand/store";
import { useRef } from 'react';

const Navigation = () => {
  const searchInput = useRef()
  const cartItems = useStore(store => store.cartItems)
  const toDeliverItems = useStore(store => store.toDeliverItems)
  const setKeyword = useStore(store => store.setKeyword)
  const navigate = useNavigate()

  const handleNavigateToCart = () => {
    navigate('/cart')
  }

  const handleSearchItems = () => {
    setKeyword(searchInput.current.value)
    navigate('/products')
  }


  return ( 
    <div className="mx-auto w-full md:max-w-screen-xl py-4 px-4 sm:px-6 lg:px-8 font-semibold">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div className="flex gap-4 flex-row mb-4 items-center md:mb-0 md:gap-8">
          <div className="text-2xl md:text-3xl text-black font-bold">
            <NavLink to={'/'}>
              <img src={logo} alt="" className='w-5 md:w-8 inline mr-1'/>
              Trend
            </NavLink>          
          </div>
          <nav>
            <ul className="flex gap-2 sm:gap-4 md:gap-8">
              <li><NavLink to={'/products'}>Products</NavLink></li>
              <li><NavLink to={"/#deals"}>Deals</NavLink></li>
              <li><NavLink to={"/#new"}>What's New</NavLink></li>           
            </ul>
          </nav>
        </div>
        <div className="flex md:items-center">
          <div className="px-4 py-3 bg-gray-100 rounded-md shadow-sm overflow-hidden mr-4 font-normal w-full md:w-72 outline-black flex justify-between relative">
            <input ref={searchInput} type="search" name="product" id="" placeholder="Looking for a Product?" className="bg-transparent border-none p-0 mr-2 w-52" />
            <button type='button' onClick={handleSearchItems} className='bg-green-800 hover:bg-green-700 transition-colors absolute right-0 top-0 bottom-0 w-12'>
              <img src={searchIcon} className='w-5 mx-auto invert'/>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 relative group cursor-pointer">
              <img src={userIcon} className='w-5'/>
              <span className="hidden md:block">Ivan</span>
              <div className='hidden group-hover:flex absolute top-6 -right-2 bg-white border border-gray-400 z-20 px-8 py-4 rounded-md flex-col gap-2 w-fit'>
                <Link 
                  to={'/deliver'}
                  className='relative'
                > 
                  <span>Deliver</span>
                  { 
                    toDeliverItems.length !== 0 &&
                      <div className='bg-red-500 rounded-full text-xs px-[.5rem] py-[0.2rem]  flex justify-center items-center text-white absolute -left-3 -top-3'>
                        {toDeliverItems.length}
                      </div>
                  }
                </Link>
                <button>Logout</button>
              </div>
            </div>
            <button onClick={handleNavigateToCart} className="flex items-center gap-2 relative">
              <img src={cartIcon} className='w-5'/>
              <span className="hidden md:block">Cart</span>
              { 
                cartItems.length !== 0 &&
                  <div className='bg-red-500 rounded-full text-xs px-[.5rem] py-[0.2rem]  flex justify-center items-center text-white absolute -left-3 -top-3'>
                    {cartItems.length}
                  </div>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Navigation;