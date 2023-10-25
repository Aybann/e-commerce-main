import { useState } from 'react';
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom';
import AddCartButton from '../components/AddCartButton';
import starIcon from '../assets/star.png'
import packageIcon from '../assets/bx-package.svg'
import truckIcon from '../assets/bxs-truck.svg'
import RefreshButton from '../components/RefreshButton';

const Product = () => {
  const { id } = useParams()
  const { data, isPending, error} = useFetch('https://fakestoreapi.com/products/' + id)
  const [quantity, setQuantity] = useState(1)


  const handleIncrement = () => {
    setQuantity(prev => {
      return prev !== 12 ? prev + 1 : prev
    })
  }

  const handleDecrement = () => {
    setQuantity(prev => {
      return prev !== 1 ? prev - 1 : prev
    })
  }

  return ( 
    <>
      {
        isPending && <div className='flex justify-center my-10'>Loading...</div>
      }
      {
        error &&  
        <div className='flex justify-center mt-10 h-32'>
          <div className='flex items-center flex-col gap-2'>
            <span className='text-xl'>Ops! Something Went Wrong!</span>
            <RefreshButton />
          </div>
        </div>
      }
      {
        data && 
          <>
            <section className='flex flex-col md:flex-row gap-10 my-10'>
              <div className='basis-1/2'>
                <img src={data.image} alt="" className='rounded-md'/>
              </div>
              <div className='basis-1/2 flex flex-col gap-4'>
                <div>
                  <p className='text-4xl text-black font-bold'>{data.title}</p>
                  <p className='my-2 max-w-[60ch]'>{data.description}</p>
                  <p className=''>
                    <img src={starIcon} alt="" className="w-5 inline my-2 mr-2 text-sm"/>
                    ({data.rating.rate}) {data.rating.count}
                  </p>
                  <p className='text-2xl text-black font-bold'>${data.price}</p>
                  
                </div>
                <div>
                  <div className='flex gap-2'>
                    <div className='flex justify-between items-center gap-4 font-semibold px-8 py-2 bg-gray-200 w-[7em] rounded-3xl text-green-950 mb-5 text-xl'>
                      <button onClick={handleDecrement} className=''>-</button>
                      <p className='text-base'>{quantity}</p>
                      <button onClick={handleIncrement} >+</button>
                    </div>
                    <p className='w-[20ch] text-sm font-semibold ml-2'>Only <span className='text-yellow-400'> 12 Items</span> Left! Don't miss it</p>
                  </div>         
                  <div>                      
                    <AddCartButton quantity={quantity} item={data}/>                 
                  </div>
                </div>     
                <div className='flex mt-4'>
                  <div className='border border-gray-200 p-4 flex gap-2 items-start'>
                    <img src={truckIcon} alt="" className='w-4 mt-1'/>
                    <div>
                      <p className='text-black font-semibold'>Free Delivery</p>
                      <p className='text-sm underline'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                  </div>
                  <div className='border border-gray-200 p-4 flex gap-2 items-start'>
                    <img src={packageIcon} alt="" className='w-4 mt-1'/>
                    <div>
                      <p className='text-black font-semibold'>Return Delivery</p>
                      <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing <span className='underline'>Details</span> </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
      }
      
    </>
  );
}
 
export default Product;