import React, { useState } from "react";
import { toast } from "sonner"; // Import Sonner

const lensTypes = [
  {
    value: "plano",
    name: "Plano",
    description: "Non-prescription lenses for style or protection.",
    image: "https://static.lenskart.com/media/desktop/img/pdp/zero_power.png",
  },
  {
    value: "single_vision",
    name: "Single Vision",
    description: "Lenses with a single prescription for distance or reading.",
    image: "https://static.lenskart.com/media/desktop/img/pdp/single_vision.png",
  },
  {
    value: "bifocal",
    name: "Bifocal",
    description: "Lenses with two prescriptions, typically for distance and reading.",
    image: "https://static.lenskart.com/media/desktop/img/pdp/bifocal.png",
  },
  {
    value: "progressive",
    name: "Progressive",
    description: "Lenses with a gradual change in prescription for all distances.",
    image: "https://static.lenskart.com/media/desktop/img/pdp/bifocal.png",
  },
  {
    value: "frame_only",
    name: "Frame Only",
    description: "Only the frame will be added to your cart, without any lenses.",
    image: "https://static.lenskart.com/media/desktop/img/pdp/frame_only.png", 
  },
];

const CustomizationSidebar = ({ product, onAddToCart, onClose }) => {
  const [lensType, setLensType] = useState(null); // Initialize as null
  const [showLensTypeSelection, setShowLensTypeSelection] = useState(true);
  const [power, setPower] = useState("");
  const [material, setMaterial] = useState("");
  const [wantTint, setWantTint] = useState(false);
  const [tintColor, setTintColor] = useState("none");
  const [hasAntiReflectiveCoating, setHasAntiReflectiveCoating] = useState(false);
  const [hasUvProtection, setHasUvProtection] = useState(false);
  const [isPolarized, setIsPolarized] = useState(false);
  const [hasBlueLightFilter, setHasBlueLightFilter] = useState(false);

  const handleLensTypeSelect = (type) => {
    setLensType(type);
    setShowLensTypeSelection(false);
  };

  const handleBackToLensType = () => {
    setLensType(null);
    setShowLensTypeSelection(true);
    setPower("");
    setMaterial("");
    setWantTint(false);
    setTintColor("none");
    setHasAntiReflectiveCoating(false);
    setHasUvProtection(false);
    setIsPolarized(false);
    setHasBlueLightFilter(false);
  };

  const handleAddToCart = () => {
    if (!lensType) {
      toast.error("Please select a lens type.");
      return;
    }

    if ((lensType === "single_vision" || lensType === "bifocal" || lensType === "progressive") && !power) {
      toast.error("Please enter the power for your lenses.");
      return;
    }

    if (lensType !== "frame_only" && !material) {
      toast.error("Please select a lens material.");
      return;
    }

    const customLensOptions = {
      lens_type: lensType,
    };

    if (lensType !== "frame_only") {
      customLensOptions.material = material;
      customLensOptions.has_anti_reflective_coating = hasAntiReflectiveCoating;
      customLensOptions.has_uv_protection = hasUvProtection;
      customLensOptions.is_polarized = isPolarized;
      customLensOptions.has_blue_light_filter = hasBlueLightFilter;
      customLensOptions.is_tinted = wantTint;
      customLensOptions.tint_color = wantTint ? tintColor : null;
      if (lensType === "single_vision" || lensType === "bifocal" || lensType === "progressive") {
        customLensOptions.power = parseFloat(power);
      }
    }

    onAddToCart(customLensOptions);
  };

  const FeatureItem = ({ label, value, state, setState }) => (
    <div
      className={`flex items-center space-x-2 p-3 border rounded-lg shadow-md cursor-pointer bg-white ${
        state ? "border-blue-500" : "border-gray-300"
      }`}
      onClick={() => setState(!state)}
    >
      <div className="flex-grow">{label}</div>
      {state && <i className="fa-solid fa-check text-blue-500"></i>}
    </div>
  );

  return (
    <div className="fixed top-0 right-0 h-full w-full md:w-[50%] bg-[#FBF9F7] shadow-xl p-8 z-50 transition-transform duration-300 ease-in-out transform translate-x-0 overflow-y-auto hide-scrollbar ">
      <button
        onClick={onClose}
        className="absolute top-4 right-5 text-gray-600 hover:text-gray-900"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <h2 className="text-2xl font-bold mb-4">Customize Your Lenses</h2>
      <p className="mb-4 text-gray-700">
        For: <strong>{product.name}</strong>
      </p>

      {showLensTypeSelection && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Lens Type</label>
          <div className="space-y-2">
            {lensTypes.map((lens) => (
              <div
                key={lens.value}
                className={`flex items-center space-x-4 p-4 border rounded-xl cursor-pointer bg-white ${
                  lensType === lens.value ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => handleLensTypeSelect(lens.value)}
              >
                {/* Display Lens Image */}
                <img
                  src={lens.image}
                  alt={lens.name}
                  className="w-8 h-8 object-contain rounded flex-shrink-0"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "fallback_image_url.png"; // Replace with your fallback image URL
                  }}
                />
                {/* Lens Name and Description */}
                <div>
                  <h3 className="text-md font-normal ">{lens.name}</h3>
                  <p className="text-sm text-gray-600">{lens.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!showLensTypeSelection && lensType !== null && (
        <div className="relative">
          <button
            onClick={handleBackToLensType}
            className="absolute top-[-110px] left-0 text-gray-600 hover:text-gray-900 mb-2"
          >
            <i className="fa-solid fa-arrow-left"></i> 
          </button>

          {/* Power Input for Single Vision, Bifocal and Progressive */}
          {(lensType === "single_vision" || lensType === "bifocal" || lensType === "progressive") && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1 ">Power</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 shadow-md"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                placeholder="e.g., -1.50"
              />
            </div>
          )}

          {/* Material Selection */}
          {lensType !== "frame_only" && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Material</label>
              <select
                className="w-full p-2 border rounded-lg shadow-md focus:ring focus:ring-blue-300"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              >
                <option value="">Select Material</option>
                <option value="polycarbonate">Polycarbonate</option>
                <option value="plastic">Plastic</option>
                <option value="glass">Glass</option>
                <option value="trivex">Trivex</option>
              </select>
            </div>
          )}

          {/* Tint Options */}
          {lensType !== "frame_only" && (
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="wantTint"
                className="mr-2 accent-blue-500"
                checked={wantTint}
                onChange={(e) => setWantTint(e.target.checked)}
              />
              <label htmlFor="wantTint" className="text-gray-700 font-medium">
                Want Tint?
              </label>
            </div>
          )}

          {wantTint && lensType !== "frame_only" && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Tint Color</label>
              <select
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                value={tintColor}
                onChange={(e) => setTintColor(e.target.value)}
              >
                <option value="none">None</option>
                <option value="gray">Gray</option>
                <option value="brown">Brown</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </select>
            </div>
          )}

          {/* Additional Features as Divs */}
          {lensType !== "frame_only" && (
            <div className="mb-6 space-y-2">
              <label className="block text-gray-700 font-medium mb-1">Additional Features</label>
              <FeatureItem
                label="Anti-Reflective Coating"
                state={hasAntiReflectiveCoating}
                setState={setHasAntiReflectiveCoating}
              />
              <FeatureItem
                label="UV Protection"
                state={hasUvProtection}
                setState={setHasUvProtection}
              />
              <FeatureItem
                label="Polarized"
                state={isPolarized}
                setState={setIsPolarized}
              />
              <FeatureItem
                label="Blue Light Filter"
                state={hasBlueLightFilter}
                setState={setHasBlueLightFilter}
              />
            </div>
          )}
        </div>
      )}

      {/* Add to Cart Button */}
      {!showLensTypeSelection && lensType !== null && (
        <button
          onClick={handleAddToCart}
          className="w-[40%] bg--600 text-white py-2 rounded bg-[#00BFCB] transition"
        >
          Add to Cart
        </button>
      )}
      {showLensTypeSelection && (
        <button
          onClick={onClose}
          className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
        >
          Close
        </button>
      )}
    </div>
  );
};

export default CustomizationSidebar;