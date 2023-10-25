import { useState, useMemo } from "react";
import Cards from "../components/Cards";
import shortUpIcon from "../assets/bx-sort-up.svg"
import shortDownIcon from "../assets/bx-sort-down.svg"
import filterIcon from "../assets/bx-filter.svg"
import RefreshButton from '../components/RefreshButton';

const Products = ({searchData, items, isPending, error}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenSort, setIsOpenSort] = useState(false)
  const [filterSelected, setIFilterSelected] = useState([])
  const filters = [
    "electronics",
    "men's clothing",
    "women's clothing",
    "jewelery",
  ]


  const filteredProducts = useMemo(() => { 
    return items?.filter(item => {
      return  filterSelected.length === 0 
        ? 
          item.title.toLowerCase().includes(searchData.toLowerCase()) || item.category.includes(searchData.toLowerCase())
        : 
          (item.title.toLowerCase().includes(searchData.toLowerCase()) || item.category.includes(searchData.toLowerCase())) && filterSelected.includes(item.category)
    })
  },[filterSelected, searchData, items])

  const handleSortPrice = () => {
    if(isOpenSort) {
      filteredProducts?.sort((a,b) => a.price - b.price) 
      setIsOpenSort(false)
    } else {
      filteredProducts?.sort((a,b) => b.price - a.price) 
      setIsOpenSort(true)
    }
  }

  const handleOpenFiltered = () => {
    setIsOpen(prev => {
      return prev = !prev
    })
  }

  const handleAddFilter = (filter) => {
    if(!filterSelected.includes(filter)) {
      setIFilterSelected(prev => {
        return prev = [...prev, filter]
      })
    }
  }

  const handleRemoveFilter = (filter) => {
    setIFilterSelected(prev => {
      return prev = prev.filter(item => filter !== item)
    })
  }

  return ( 
    <>
      <header className="my-5 text-4xl font-bold text-black">
        {
          searchData.length !== 0 
          ? <> Search Results for "{searchData}"</>
          : <> Amazing Products! </>
        }
      </header>
      <div className='flex flex-col md:flex-row justify-between'>
        <div className='flex gap-4'>
          <button 
            onClick={handleOpenFiltered}
            className="bg-gray-100 text-gray-900 text-sm rounded-3xl font-semibold w-fit p-2 px-7 md:mt-0 relative h-fit"
          >
            All Filters
            <img src={filterIcon} alt="" className="ml-2 inline" />
            <ul className={`${isOpen ? 'absolute' : 'hidden'} top-12 left-0 right-0 h-fit bg-white rounded-md border border-gray-400 text-center py-2 z-20`}>
              {
                filters && filters.map((filter, index) => (
                  <li key={index} className='py-2 px-5 text-sm '>
                    <div onClick= {e => handleAddFilter(filter)} type="button" className="capitalize">
                      {filter}
                    </div>
                  </li>
                ))
              }
            </ul>
          </button>
          <ul className='flex flex-wrap justify-start items-center gap-4'>
            {
              filterSelected && filterSelected.map((filter, index) => (
                <li key={index} className='p-2 px-5 text-sm font-semibold rounded-3xl bg-white w-fit'>
                  <button onClick= {e => handleRemoveFilter(filter)} type="button">
                    {filter} <span className="font-bold ml-4">x</span>
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        <button       
          onClick={handleSortPrice} 
          className="border border-gray-700 text-gray-900 text-sm rounded-3xl font-semibold w-fit p-2 px-6 md:mt-0 relative h-fit mt-5"
        >
          Sort
          <img src={isOpenSort ? shortDownIcon : shortUpIcon } alt="" className="ml-2 w-5 inline" />
        </button>
      </div>
      {
        isPending && <div className='flex justify-center my-10 h-32'>Loading...</div>
      }
      {
        error 
        ? 
          <div className='flex justify-center mt-10 h-32'>
            <div className='flex items-center flex-col gap-2'>
              <span className='text-xl '>Ops! Something Went Wrong!</span>
              <RefreshButton />
            </div>
          </div>
        : 
          <div className='flex flex-col md:flex-row justify-between'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-10 '>
              {
                filteredProducts && filteredProducts.length !== 0 
                  ? 
                    <>
                      {
                        filteredProducts.map((item, index) => (
                          <Cards key={index} item={item}/>
                        ))
                      }
                    </>
                  : <>
                     
                    </>
              }
            </div>
          </div>
      }     
    </>
  );
}
 
export default Products;