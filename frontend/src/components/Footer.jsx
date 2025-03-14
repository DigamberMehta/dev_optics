export default function Footer() {
    return (
      <footer className="bg-black text-white py-10 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Eyeglasses */}
            <div>
              <h3 className="text-cyan-400 font-semibold">EYEGLASSES</h3>
              <ul className="space-y-2 text-sm mt-2">
                <li>Men</li>
                <li>Women</li>
                <li>Kids</li>
                <li>Fastrack</li>
                <li>Rimless</li>
              </ul>
            </div>
  
            {/* Sunglasses Section */}
            <div>
              <h3 className="text-cyan-400 font-semibold">SUNGLASSES</h3>
              <ul className="space-y-2 text-sm mt-2">
                <li>Men</li>
                <li>Women</li>
                <li>Rimless</li>
                <li>Fastrack</li>
              </ul>
            </div>
  
            {/* Contact Lenses */}
            <div>
              <h3 className="text-cyan-400 font-semibold">CONTACT LENSES</h3>
              <ul className="space-y-2 text-sm mt-2">
                <li>Bausch & Lomb</li>
                <li>Johnson & Johnson</li>
              </ul>
            </div>
  
            {/* Account */}
            <div>
              <h3 className="text-cyan-400 font-semibold">ACCOUNT</h3>
              <ul className="space-y-2 text-sm mt-2">
                <li>Our Policies</li>
                <li>My Account</li>
                <li>Create an Account</li>
                <li>Membership Pass</li>
                <li>Rewards Program</li>
              </ul>
            </div>
  
            {/* About Us */}
            <div>
              <h3 className="text-cyan-400 font-semibold">ABOUT US</h3>
              <ul className="space-y-2 text-sm mt-2">
                <li>Company Info</li>
                <li>Blog</li>
                <li>Contact Us</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
  
 
        </div>
  
         
 
      </footer>
    );
  }