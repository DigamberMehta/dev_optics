import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Package2,
  ShoppingCart,
  Package,
  PlusCircle
} from 'lucide-react';
import AdminAddProduct from './AdminAddProduct';
import AdminOrders from './AdminOrders';
import AdminProductList from './AdminProductList';



const AdminPanel = () => {
  const [activeComponent, setActiveComponent] = useState('orders');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'orders':
        return <AdminOrders />;
      case 'products':
        return <AdminProductList />;
      case 'addProduct':
        return <AdminAddProduct />;
      default:
        return <AdminOrders />;
    }
  };

  return (
    <div className="mt-32">
      <div className="flex w-full min-h-screen">
        {/* Sidebar */}
        <div className="w-64 border-r bg-white flex-shrink-0">
          <div className="flex flex-col gap-2 p-4 h-full">
            <div className="flex items-center gap-2 px-2 py-4">
              <Package2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">Admin Dashboard</span>
            </div>

            <nav className="grid gap-1">
              <Button 
                variant={activeComponent === 'orders' ? 'secondary' : 'ghost'}
                onClick={() => setActiveComponent('orders')}
                className="justify-start gap-3"
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
              </Button>

              <Button 
                variant={activeComponent === 'products' ? 'secondary' : 'ghost'}
                onClick={() => setActiveComponent('products')}
                className="justify-start gap-3"
              >
                <Package className="h-4 w-4" />
                Products
              </Button>

              <Button 
                variant={activeComponent === 'addProduct' ? 'secondary' : 'ghost'}
                onClick={() => setActiveComponent('addProduct')}
                className="justify-start gap-3"
              >
                <PlusCircle className="h-4 w-4" />
                Add Product
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-8">
          <Card className="min-h-[calc(100vh-4rem)]">
            <CardHeader>
              <CardTitle className="text-2xl">
                {activeComponent === 'orders' && 'Order Management'}
                {activeComponent === 'products' && 'Product Inventory'}
                {activeComponent === 'addProduct' && 'Add New Product'}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {renderComponent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
