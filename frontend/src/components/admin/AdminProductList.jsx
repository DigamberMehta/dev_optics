import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_URL = 'http://localhost:3000/api';

function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err.response || err);
        const errorMsg = err.response?.data?.message || err.message || 'Failed to load products.';
        setError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <span className="ml-4 text-lg">Loading Products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <p className="text-xl text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            onClick={() => setViewMode('grid')}
            size="icon"
          >
            <LayoutGrid />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
            size="icon"
          >
            <List />
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.product_id} className="flex flex-col overflow-hidden">
              <CardHeader className="p-0 relative">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-contain"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {product.new_arrivals && <Badge variant="destructive">New</Badge>}
                  {product.frequently_bought && <Badge variant="secondary">Popular</Badge>}
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg font-semibold mb-1 truncate">{product.name}</CardTitle>
                <CardDescription className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</CardDescription>
                <p className="text-lg font-bold text-primary mb-2">
                ₹{product.price ? parseFloat(product.price).toFixed(2) : 'N/A'}
                </p>
                <div className="flex flex-wrap gap-1 text-xs">
                  {product.product_type && <Badge variant="outline">{product.product_type.replace(/_/g, ' ')}</Badge>}
                  {product.gender && <Badge variant="outline">{product.gender}</Badge>}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" variant="outline">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <Card key={product.product_id} className="flex flex-col sm:flex-row overflow-hidden">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full sm:w-48 h-48 object-contain"
                />
              ) : (
                <div className="w-full sm:w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 mt-1 mb-2">{product.description}</CardDescription>
                  <div className="flex flex-wrap gap-1 text-xs mb-2">
                    {product.product_type && <Badge variant="outline">{product.product_type.replace(/_/g, ' ')}</Badge>}
                    {product.gender && <Badge variant="outline">{product.gender}</Badge>}
                    {product.new_arrivals && <Badge variant="destructive">New</Badge>}
                    {product.frequently_bought && <Badge variant="secondary">Popular</Badge>}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-bold text-primary">₹{product.price ? parseFloat(product.price).toFixed(2) : 'N/A'}</p>
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProductList;
