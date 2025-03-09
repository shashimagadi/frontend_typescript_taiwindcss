import React from 'react'

const Home = () => {
  return (
    <>
     <div 
      className="flex justify-center items-center p-4 md:pt-0 pt-[150px]"
     >
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Welcome to Our React Application
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Your one-stop solution for efficient and seamless navigation.
        </p>
        <p className="text-gray-500 leading-relaxed mb-6">
          Manage your data effortlessly with our platform. Navigate using the
          sidebar to create, read, update, or delete records as needed. We've
          built an intuitive and efficient interface to make your operations
          seamless and productive. Start exploring now and experience the ease
          of data management at your fingertips!
        </p>
        <div className="mt-6">
          <p className="text-gray-600">
            Need help? Visit our{" "}
            <span className="text-blue-500 font-semibold cursor-pointer hover:underline">
              Support Center
            </span>
            .
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home