export default function EyewearForEveryone() {
    const frameShapes = [
      { name: "Eye Glasses", img: "https://static.zennioptical.com/marketing/homepage/componentsRedesign/FPO/products-eyeglasses.png" },
      { name: "Blue Light", img: "https://static.zennioptical.com/marketing/homepage/category/bluelight.jpg" },
      { name: "Sunglasses", img: "https://static.zennioptical.com/marketing/homepage/componentsRedesign/FPO/products-sunglasses.png" },
      { name: "Transitions", img: "https://static.zennioptical.com/marketing/homepage/componentsRedesign/FPO/products-transitions.png" },
      { name: "Sports", img: "https://static.zennioptical.com/marketing/campaign/sports_glasses/2024/HP/102224_Sports-Performance_category_Desktop_Site-Nav.png" },
      { name: "Designer", img: "https://static.zennioptical.com/marketing/homepage/componentsRedesign/FPO/products-designer-brands.png" },
    ];
  
    return (
      <div className="text-center bg-white mt-12 frame">
        <h2 className="text-4xl font-bold mb-2">Eyewear for Everyone</h2>
        <p className="text-gray-600 mb-6">
          Discover Zenni’s high-quality glasses made for every vision need, every day.
        </p>
  
        <div className="grid grid-cols-3 gap-4 lg:flex lg:justify-between mb-6">
          {frameShapes.map((shape) => (
            <div 
              key={shape.name} 
              className="flex flex-col items-center px-4 lg:px-6 border border-transparent hover:border-black rounded-lg p-3 transition-all duration-200"
            >
              <img src={shape.img} alt={shape.name} className="w-24 h-12 mb-2" />
              <p className="text-sm font-medium hover:underline">{shape.name}</p>
            </div>
          ))}
          <div className="col-span-3 text-center lg:order-last lg:flex lg:items-center">
            <button className="bg-black text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 mx-auto lg:mx-0">
              Shop all <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    );
  }