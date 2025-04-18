import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api';

const ENUMS = {
  PRODUCT_TYPES: ['', 'frame', 'prescription_glasses', 'sunglasses', 'blue_light_glasses', 'computer_glasses', 'prescription_sunglasses', 'Eyeglasses', 'Reading_Glasses', 'Contact_Lenses', 'Accessories'],
  GENDERS: ['', 'men', 'women', 'kid', 'unisex'],
  FRAME_TYPES: ['', 'glasses', 'sunglasses', 'sports', 'fashion'],
  RIM_DETAILS: ['', 'Full Rim', 'Half Rim', 'Rimless', 'Semi-Rimless', 'Other'],
  LENS_TYPES: ['', 'single_vision', 'bifocal', 'progressive', 'other', 'plano'],
  LENS_MATERIALS: ['', 'polycarbonate', 'plastic', 'glass', 'trivex'],
  TINT_COLORS: ['', 'none', 'gray', 'brown', 'green', 'blue'],
};

const FormInput = ({ id, label, type = 'text', value, onChange, required, ...props }) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    {type === 'textarea' ? (
      <Textarea id={id} name={id} value={value} onChange={onChange} {...props} />
    ) : (
      <Input id={id} name={id} type={type} value={value} onChange={onChange} required={required} {...props} />
    )}
  </div>
);

const FormSelect = ({ id, label, value, onChange, options, required, placeholder }) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <Select name={id} value={value || ''} onValueChange={onChange} required={required}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.filter(opt => opt !== '').map(opt => (
          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const FormCheckbox = ({ id, label, checked, onCheckedChange }) => (
  <div className="flex items-center space-x-2">
    <Checkbox id={id} name={id} checked={checked} onCheckedChange={onCheckedChange} />
    <Label htmlFor={id}>{label}</Label>
  </div>
);

const fieldConfig = {
  product: [
    { type: 'input', id: 'name', label: 'Name', required: true },
    { type: 'textarea', id: 'description', label: 'Description' },
    { type: 'number', id: 'price', label: 'Price', step: '0.01', required: true },
    { type: 'select', id: 'product_type', label: 'Product Type', options: ENUMS.PRODUCT_TYPES, required: true, placeholder: 'Select product type' },
    { type: 'input', id: 'images', label: 'Images (comma-separated URLs)' },
    { type: 'select', id: 'gender', label: 'Gender', options: ENUMS.GENDERS, placeholder: 'Select gender' },
    { type: 'checkbox', id: 'new_arrivals', label: 'New Arrival' },
    { type: 'checkbox', id: 'frequently_bought', label: 'Frequently Bought' },
  ],
  frame: [
    { type: 'number', id: 'temple_length', label: 'Temple Length', step: '0.01' },
    { type: 'number', id: 'bridge_width', label: 'Bridge Width', step: '0.01' },
    { type: 'number', id: 'lens_width', label: 'Lens Width', step: '0.01' },
    { type: 'number', id: 'lens_height', label: 'Lens Height', step: '0.01' },
    { type: 'input', id: 'material', label: 'Material' },
    { type: 'input', id: 'color', label: 'Colors (comma-separated)' },
    { type: 'input', id: 'style', label: 'Style' },
    { type: 'select', id: 'frame_type', label: 'Frame Type', options: ENUMS.FRAME_TYPES, placeholder: 'Select frame type' },
    { type: 'select', id: 'rim_details', label: 'Rim Details', options: ENUMS.RIM_DETAILS, placeholder: 'Select rim details' },
  ],
  lens: [
    { type: 'select', id: 'lens_type', label: 'Lens Type', options: ENUMS.LENS_TYPES, placeholder: 'Select lens type' },
    { type: 'checkbox', id: 'is_prescription', label: 'Is Prescription' },
    { type: 'select', id: 'material', label: 'Material', options: ENUMS.LENS_MATERIALS, placeholder: 'Select material' },
    { type: 'number', id: 'power', label: 'Power', step: '0.01' },
    { type: 'checkbox', id: 'has_anti_reflective_coating', label: 'Anti-Reflective Coating' },
    { type: 'checkbox', id: 'has_uv_protection', label: 'UV Protection' },
    { type: 'checkbox', id: 'is_polarized', label: 'Polarized' },
    { type: 'checkbox', id: 'has_blue_light_filter', label: 'Blue Light Filter' },
    { type: 'checkbox', id: 'is_photochromic', label: 'Photochromic (Transitions)' },
    { type: 'checkbox', id: 'is_tinted', label: 'Is Tinted' },
    { type: 'select', id: 'tint_color', label: 'Tint Color', options: ENUMS.TINT_COLORS, placeholder: 'Select tint color' },
    { type: 'input', id: 'blue_light_filter_strength', label: 'Blue Light Filter Strength' },
    { type: 'input', id: 'coating_type', label: 'Coating Type' },
  ],
};

function AdminAddProduct() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    product_type: '',
    images: '',
    gender: '',
    new_arrivals: false,
    frequently_bought: false,
  });

  const [frameData, setFrameData] = useState({
    temple_length: '',
    bridge_width: '',
    lens_width: '',
    lens_height: '',
    material: '',
    color: '',
    style: '',
    frame_type: '',
    rim_details: '',
  });

  const [lensData, setLensData] = useState({
    lens_type: '',
    is_prescription: false,
    material: '',
    power: '',
    has_anti_reflective_coating: false,
    has_uv_protection: false,
    is_polarized: false,
    has_blue_light_filter: false,
    is_photochromic: false,
    is_tinted: false,
    tint_color: '',
    blue_light_filter_strength: '',
    coating_type: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (setter) => (e) => {
    const { name, value, type, checked } = e.target;
    setter(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSelectChange = (setter, field) => (value) => {
    setter(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (setter, field) => (checked) => {
    setter(prev => ({ ...prev, [field]: checked }));
  };

  const renderField = (field, state, setter) => {
    switch (field.type) {
      case 'select':
        return (
          <FormSelect
            key={field.id}
            id={field.id}
            label={field.label}
            value={state[field.id]}
            onChange={handleSelectChange(setter, field.id)}
            options={field.options}
            required={field.required}
            placeholder={field.placeholder}
          />
        );
      case 'checkbox':
        return (
          <FormCheckbox
            key={field.id}
            id={field.id}
            label={field.label}
            checked={!!state[field.id]}
            onCheckedChange={handleCheckboxChange(setter, field.id)}
          />
        );
      case 'textarea':
        return (
          <FormInput
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            value={state[field.id]}
            onChange={handleChange(setter)}
            required={field.required}
          />
        );
      default:
        return (
          <FormInput
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            value={state[field.id]}
            onChange={handleChange(setter)}
            required={field.required}
            step={field.step}
            min={field.type === 'number' && field.step ? "0" : undefined}
          />
        );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Authentication required.');
      setIsLoading(false);
      return;
    }

    const processedProductData = {
      ...productData,
      images: productData.images.split(',').map(img => img.trim()).filter(img => img),
    };

    const processedFrameData = {
      ...frameData,
      color: frameData.color.split(',').map(c => c.trim()).filter(c => c),
    };

    const shouldSendFrame = Object.values(processedFrameData).some(v => v !== '' && v !== null && v !== undefined && (!Array.isArray(v) || v.length > 0));
    const shouldSendLens = Object.values(lensData).some(v => v !== '' && v !== null && v !== undefined && v !== false);

    const payload = {
      product: processedProductData,
      ...(shouldSendFrame && { frame: processedFrameData }),
      ...(shouldSendLens && { lens: lensData }),
    };

    try {
      const response = await axios.post(`${API_URL}/admin/products`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage(`Product "${response.data.product.name}" added successfully! ID: ${response.data.product.product_id}`);
    } catch (err) {
      console.error('Error adding product:', err.response || err);
      const errorData = err.response?.data;
      let errorMessage = 'An unexpected error occurred.';
      if (errorData) {
        if (errorData.message) {
          errorMessage = errorData.message;
        }
        if (errorData.errors && Array.isArray(errorData.errors)) {
          errorMessage += ` Details: ${errorData.errors.join(', ')}`;
        } else if (errorData.error) {
          errorMessage += ` Details: ${errorData.error}`;
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-[80%] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {successMessage && (
              <Alert variant="default" className="mb-6 border-green-500 text-green-700">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="py-3">
                <Accordion type="single" collapsible defaultValue="product-details" className="w-full  text-lg">
                  <AccordionItem value="product-details" className="">
                    <AccordionTrigger className="text-lg font-semibold">Product Details</AccordionTrigger>
                    <AccordionContent className="px-2" >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {fieldConfig.product.map(field =>
                          renderField(field, productData, setProductData)
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="frame-details">
                    <AccordionTrigger className="text-lg font-semibold">Frame Details (Optional)</AccordionTrigger>
                    <AccordionContent className="px-2" >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {fieldConfig.frame.map(field =>
                          renderField(field, frameData, setFrameData)
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="lens-details">
                    <AccordionTrigger className="text-lg font-semibold">Lens Details (Optional)</AccordionTrigger>
                    <AccordionContent className="px-2" >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {fieldConfig.lens.map(field =>
                          renderField(field, lensData, setLensData)
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding Product...
                  </>
                ) : (
                  'Add Product'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminAddProduct;