import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-gray-200 py-6 mt-10 rounded-3xl">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-5">
        <img src="./logo.png" alt="Logo"  className="h-12 w-auto" />

        <ul className="flex gap-6 text-sm">
          
          <li><a href="#" className="hover:text-yellow-700 ">GO TO THE TOP </a></li>
          <li><a href="mailto:jitdeadshot@outlook.com" className="hover:text-yellow-700">Contact</a></li>
        </ul>
        <p className="text-xs text-gray-400">Made with ❤️ by swaranjit</p>
      </div>
      <div className="text-center mt-2">
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} Movie DB. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
