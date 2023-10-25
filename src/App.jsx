import Footer from "./components/Footer"
import Navigation from "./components/Navigation"
import { lazy, Suspense, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
const Home = lazy(() => import("./pages/Home"))
const Product = lazy(() => import("./pages/Product"))
const Cart = lazy(() => import("./pages/Cart"))
const Deliver = lazy(() => import("./pages/Deliver"))
const Products = lazy(() => import("./pages/Products"))
import useFetch from './hooks/useFetch'
import { useStore } from "./zustand/store"

function App() {
  const { data, isPending, error } = useFetch('https://fakestoreapi.com/products')
  const items = useStore(store => store.items)
  const setItems = useStore(store => store.setItems)
  const searchKeyWord = useStore(store => store.searchKeyWord)

  useEffect(() => {
    setItems(data)
  })

  return (
    <div className="bg-gray-50 text-gray-600 min-h-screen relative">
      <div className=" bg-green-800 text-xs px-4  md:text-sm text-gray-200 py-2">
        <div className="flex justify-between max-w-[1240px] mx-auto">
          <p>0988782378</p>
          <p>Get 50% off on Selected Items | Shop Now</p>
          <div className="flex gap-4">
            <p>English</p>
            <p>Philippines</p>
          </div>
        </div>
      </div>
      <Navigation />
      <div className="max-w-[1240px] mx-auto px-4">
        <main>
          <Suspense fallback={<div>Loading....</div>}>
            <Routes>           
              <Route 
                path='/'  
                element={ 
                  <Home 
                  items={items}
                  isPending={isPending}
                  error={error}
                  />
                } 
              />
              <Route path='/product/:id'  element={<Product />} />  
              <Route path='/cart'  element={<Cart />} />  
              <Route 
                path='/products'  
                element={
                  <Products
                    searchData={searchKeyWord}
                    items={items}
                    isPending={isPending}
                    error={error}
                  />} 
              />              
              <Route path='/deliver'  element={<Deliver />} /> 
            </Routes>
          </Suspense> 
        </main>       
      </div>
      <Footer />  
    </div>
  )
}

export default App
