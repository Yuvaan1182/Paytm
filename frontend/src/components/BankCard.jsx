export default function BankCard() {
    return (
      <div className="w-full max-w-sm mx-auto p-6">
        <div className="relative bg-gray-900 text-white rounded-2xl p-8 shadow-lg">
          {/* Card Chip */}
          <div className="w-12 h-8 bg-yellow-300 rounded-sm mb-4"></div>
  
          {/* Card Number */}
          <div className="text-lg tracking-widest font-mono mb-4">
            1234 5678 9012 3456
          </div>
  
          {/* Card Footer */}
          <div className="flex justify-between items-center text-sm font-light">
            <div>
              <div className="uppercase text-xs">Card Holder</div>
              <div className="font-medium">John Doe</div>
            </div>
            <div>
              <div className="uppercase text-xs">Expires</div>
              <div className="font-medium">12/27</div>
            </div>
          </div>
  
          {/* Logo */}
          <div className="absolute top-4 right-4">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="8" cy="12" r="4" />
              <circle cx="16" cy="12" r="4" fillOpacity="0.5" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
  