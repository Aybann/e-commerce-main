import { Link } from "react-router-dom";
import AddCartButton from "./AddCartButton";
import starIcon from '../assets/star.png'

const Cards = ({item}) => {
  return ( 
    <div>
      <Link to={`/product/${item.id}`} className='bg-white border border-gray-100 flex justify-center w-full py-8 rounded-lg'>
        <img loading='lazy' src={item.image} alt="" className='w-full h-48 object-contain'/>
      </Link>
      <div className='py-4 flex min-h-[12em] flex-col'>
        <div className='flex  text-black font-semibold'>
          <p className='line-clamp-2 basis-[70%] '>{item.title}</p>
          <p className="basis-[30%] text-end ">${item.price}</p>
        </div>
        <p className=''>
          <img src={starIcon} alt="" className="w-4 inline my-2 mr-2 text-sm"/>
          ({item.rating.rate}) {item.rating.count}
        </p>
        <div className=" mt-auto">
          <AddCartButton quantity={1} item={item}/>
        </div>
      </div>
    </div>
  );
}
 
export default Cards;