'use client';

import { useState } from 'react';
import { Cart } from '@/components/Cart';
import { ProductFilters } from '@/components/ProductFilters';
import { useCart } from '../page/CartContext';
import { useProducts } from '@/hooks/useProducts';


export default function ProductList() {
    const { products, loading, error, categories } = useProducts();
    const { addToCart } = useCart();

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

    const productsPerPage = 12;

    // Aplicar filtros y ordenamiento
    const filteredProducts = products
        .filter((product) => {
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
            return matchesCategory && matchesSearch && matchesPrice;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'name-asc':
                    return a.title.localeCompare(b.title);
                case 'name-desc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });

    // Paginación
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-red-600 text-xl">Error: {error}</div>
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Lista de Productos</h1>
                <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                    {filteredProducts.length} productos encontrados
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-1">
                    <ProductFilters
                        categories={categories}
                        onCategoryChange={setSelectedCategory}
                        onSearchChange={setSearchTerm}
                        onSortChange={setSortBy}
                        onPriceRangeChange={(min, max) => setPriceRange({ min, max })}
                    />
                    <div className="sticky top-4 mt-4">
                        <Cart />
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentProducts.map((product) => (
                            <div
                                key={product.id}
                                className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-all duration-300"
                            >
                                <div className="relative pb-2">
                                    <span className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        ID: {product.id}
                                    </span>
                                </div>
                                <div className="group relative">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-48 object-contain mb-4 group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                                </div>
                                <h2 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[3.5rem]">
                                    {product.title}
                                </h2>
                                <p className="text-gray-600 mb-2 line-clamp-3 min-h-[4.5rem]">
                                    {product.description}
                                </p>
                                <p className="text-xl font-bold text-blue-600">
                                    ${product.price.toFixed(2)}
                                </p>
                                <div className="mt-2 mb-4">
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {product.category}
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        addToCart(product);
                                        // Mostrar notificación de éxito
                                    }}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                                >
                                    Agregar al Carrito
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Paginación */}
                    <div className="mt-8 flex justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 border rounded-lg ${currentPage === i + 1 ? 'bg-blue-600 text-white' : ''
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}