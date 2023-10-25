import headerImage from '../assets/malvestida-u79wy47kvVs-unsplash.jpg'
import imageJewelry from '../assets/klara-kulikova-X3bRB6-r1a8-unsplash.jpg'
import imageMen from '../assets/nordwood-themes-Nv4QHkTVEaI-unsplash.jpg'
import Cards from '../components/Cards';
import { Link, NavLink } from 'react-router-dom'
import RefreshButton from '../components/RefreshButton';

const Home = ({items, isPending, error}) => {
  const filters = [
    "Electronics",
    "Clothing",
    "Jewelry",
    "Gadgets",
    "Outfit",
  ]

  return ( 
    <>
      <header 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.41), rgba(0, 0, 0, 0.541)),url(${headerImage})`
        }}
        className='px-5 py-14 md:p-16 rounded-md relative bg-center bg-cover'
      >
        <h1 className='text-3xl md:text-5xl text-white font-bold md:w-[20ch] mb-4'>
          Get Up to 50% Off On Selected Items!
        </h1>
        <div className='flex pt-4 items-center gap-4'>
          <NavLink to={'/products'} className='primary-button'>
            Shop Now
          </NavLink>
          <NavLink to={'/products'} className='underline  font-semibold italic text-white'>
            What's New!
          </NavLink>
        </div>   
      </header>
      <section className='my-10'>
        <div className='flex flex-col  md:flex-row justify-between'>
          <ul className='flex flex-wrap items-center gap-4'>
            {
              filters && filters.map((filter, index) => (
                <li key={index} className='p-2 px-5 text-sm font-semibold rounded-3xl bg-gray-100 w-fit'>{filter}</li>
              ))
            }
          </ul>
        </div>
        {
          isPending && <div className='flex justify-center mt-10 h-32'>Loading...</div>
        }
        {
          error && 
            <div className='flex justify-center mt-10 h-32'>
              <div className='flex items-center flex-col gap-2'>
                <span className='text-xl '>Ops! Something Went Wrong!</span>
                <RefreshButton />
              </div>
            </div>
        }
        {
          items &&
            <>
              <header className='my-10'>
                <h2 className='text-3xl text-black font-bold'>Hot Deals</h2>
              </header>
              <div id='deals' className='grid grid-col-1 md:grid-col-2 lg:grid-cols-4 gap-8'>
                {
                  items && items.slice(5,9).map((item, index) => (
                    <Cards key={index} item={item}/>
                  ))
                }
              
              </div>
              <header className='my-10'>
                <h2  className='text-3xl text-black font-bold'>What's New</h2>
              </header>
              <div id='new' className='grid grid-col-1 md:grid-col-2 lg:grid-cols-4 gap-4'>
                {
                  items && items.slice(0,4).map((item, index) => (
                    <Cards key={index} item={item}/>
                  ))
                }
              </div>
              <header className='my-10'>
                <h2  className='text-3xl text-black font-bold'>Popular Categories</h2>
              </header>
              <section>
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                    <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
                      <div className="max-w-md mx-auto text-center lg:text-left">
                        <header>
                          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Products</h2>
                          <p className="my-4 text-gray-500">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
                            rerum quam amet provident nulla error!
                          </p>
                        </header>
                        <Link
                          to={'/products'}
                          className="primary-button "
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                    <div className="lg:col-span-2 lg:py-8">
                      <ul className="grid grid-cols-2 gap-4">
                        <li>
                          <div href="#" className="block group">
                            <img
                              src={imageJewelry}
                              alt=""
                              className="object-cover w-full rounded aspect-square"
                            />

                            <div className="mt-3">
                              <h3
                                className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4"
                              >
                                Jewelry
                              </h3>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div href="#" className="block group">
                            <img
                              src={imageMen}
                              alt=""
                              className="object-cover w-full rounded aspect-square"
                            />

                            <div className="mt-3">
                              <h3
                                className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4"
                              >
                                Mens clothing
                              </h3>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </>
        }
      </section>
    </>
  );
}
 
export default Home;