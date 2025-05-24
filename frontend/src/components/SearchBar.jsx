import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import search_icon from '../assets/search_icon.png'
import cross_icon from '../assets/cross_icon.png'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const { search,setSearch,showSearch,setShowSearch } = useContext(ShopContext)
    const [visible,setVisible] = useState(false)
    const location = useLocation()
    useEffect(()=>{
        if(location.pathname.includes('collection')){
            setVisible(true)
        }
        else{
            setVisible(false)
        }
    },[location])
  return showSearch && visible ? (
    <div className='border-t border-b text-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm text-gray-500' type="text" placeholder='Search' />
        <img src={search_icon} alt="search" className='w-4' />
      </div>
      <img onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer' src={cross_icon} alt="cancel" />
    </div>
  ) : null
}

export default SearchBar
