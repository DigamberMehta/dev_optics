import React, { useState } from "react";

const CustomizationSidebar = ({ product, onAddToCart, onClose }) => {
  const [lensType, setLensType] = useState("plano");
  const [power, setPower] = useState("");
  const [material, setMaterial] = useState("");
  const [wantTint, setWantTint] = useState(false);
  const [tintColor, setTintColor] = useState("none");
  const [hasAntiReflectiveCoating, setHasAntiReflectiveCoating] = useState(false);
  const [hasUvProtection, setHasUvProtection] = useState(false);
  const [isPolarized, setIsPolarized] = useState(false);
  const [hasBlueLightFilter, setHasBlueLightFilter] = useState(false);

  const handleAddToCart = () => {
    const customLensOptions = {
      lens_type: lensType,
      material,
      has_anti_reflective_coating: hasAntiReflectiveCoating,
      has_uv_protection: hasUvProtection,
      is_polarized: isPolarized,
      has_blue_light_filter: hasBlueLightFilter,
      is_tinted: wantTint,
      tint_color: wantTint ? tintColor : null,
    };
    if (lensType === "single_vision" || lensType === "bifocal") {
      customLensOptions.power = parseFloat(power);
    }
    onAddToCart(customLensOptions);
  };

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl p-6 z-50 transition-transform duration-300 ease-in-out transform translate-x-0">
      <button
        onClick={onClose}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-900"
      >
        ✖
      </button>
      <h2 className="text-2xl font-bold mb-4">Customize Your Lenses</h2>
      <p className="mb-4 text-gray-700">For: <strong>{product.name}</strong></p>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Lens Type</label>
        <select
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          value={lensType}
          onChange={(e) => setLensType(e.target.value)}
        >
          <option value="plano">Plano (Non-Prescription)</option>
          <option value="single_vision">Single Vision</option>
          <option value="bifocal">Bifocal</option>
          <option value="progressive">Progressive</option>
          <option value="other">Other</option>
        </select>
      </div>

      {(lensType === "single_vision" || lensType === "bifocal") && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Power</label>
          <input
            type="number"
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            placeholder="e.g., -1.50"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Material</label>
        <select
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
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

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="wantTint"
          className="mr-2 accent-blue-500"
          checked={wantTint}
          onChange={(e) => setWantTint(e.target.checked)}
        />
        <label htmlFor="wantTint" className="text-gray-700 font-medium">Want Tint?</label>
      </div>

      {wantTint && (
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

      <div className="grid grid-cols-2 gap-2 mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="accent-blue-500"
            checked={hasAntiReflectiveCoating}
            onChange={(e) => setHasAntiReflectiveCoating(e.target.checked)}
          />
          <span>Anti-Reflective Coating</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="accent-blue-500"
            checked={hasUvProtection}
            onChange={(e) => setHasUvProtection(e.target.checked)}
          />
          <span>UV Protection</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="accent-blue-500"
            checked={isPolarized}
            onChange={(e) => setIsPolarized(e.target.checked)}
          />
          <span>Polarized</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="accent-blue-500"
            checked={hasBlueLightFilter}
            onChange={(e) => setHasBlueLightFilter(e.target.checked)}
          />
          <span>Blue Light Filter</span>
        </label>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CustomizationSidebar;
