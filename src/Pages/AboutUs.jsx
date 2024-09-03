import React from 'react';
// import imgbook from '../assets/v2.png'
// import imgbook2 from '../assets/v.png'

 function AboutUs() {
  return (
    <div className=''>
    <section class=" text-gray-700 container mx-auto py-16 px-4 md:px-16">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4 text-gray-700">Join Our Community Today!</h1>
        <p class="text-lg text-[#777]">Whether you're an avid reader or looking for the perfect gift, here the ideal place to find books that inspire you.</p>
      </div>
      
      <div class="space-y-12">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
    
          <div class="md:w-5/12"> 
            <h2 class="text-2xl font-bold mb-4">Competitive Prices</h2>
            <p class="text-[#777] mb-6 text-center md:text-left">We aim to make reading accessible to everyone, so we offer competitive prices and great deals on our book collection  Based on your interests and preferences, we provide personalized recommendations to help you discover new books you might love.</p>
          </div>
          
         
          <div class="md:w-5/12 max-w-sm">
            {/* <img class=" border-none " src={imgbook} alt="Verse Finder Image"/> */}
            <img src="https://i.pinimg.com/564x/5b/0c/9c/5b0c9c7020833819ec2710fb1d6a5cd4.jpg" alt="" />
          </div>
        </div>
    
        <div class="flex flex-col md:flex-row-reverse items-center md:items-start md:justify-between">
          <div class="md:w-5/12"> 
            <h2 class="text-2xl font-bold mb-4">Easy Search and Purchase</h2>
            <p class="text-[#777] mb-6 text-center md:text-left">With our user-friendly website design, you can quickly and easily search for the books you want. Enjoy a seamless shopping experience, from selecting your book to checkout, with flexible shipping options to meet your needs.</p>
          </div>
          
      
          <div class="md:w-5/12 max-w-sm">
            {/* <img class="rounded border-none w-[600px] h-full mt-[-40px]" src={imgbook2} alt="Bible Trivia Image"/> */}
            <img src="https://i.pinimg.com/236x/ab/fe/6e/abfe6e8a83999b31b7e92ba79dfdb106.jpg" alt="" />
          </div>
        </div>
      </div>
{/*     
     
      <div class="bg-gray-100 text-gray-700 text-center py-4 mt-12 rounded-md">
        <p class="text-sm">This section is inspired by <a href="https://thebiblechat.com" class="text-blue-500 hover:underline">thebiblechat.com</a> official website.</p>
      </div> */}
    
    </section></div>
  )
}

export default AboutUs