import React from 'react'

const Spinner = () => {
  return (
       <div className="flex flex-col items-center mt-12">
      <div className="w-16 h-16 border-4 border-solid rounded-full border-indigo-600 animate-spin"></div>
      <p className="text-white mt-4 text-lg italic">Loading movies...</p>
    </div>
  )
}

export default Spinner