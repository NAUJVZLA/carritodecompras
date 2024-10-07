'use client';

import { useState } from 'react';

interface ProductFiltersProps {
    categories: string[];
    onCategoryChange: (category: string) => void;
    onSearchChange: (search: string) => void;
    onSortChange: (sort: string) => void;
    onPriceRangeChange: (min: number, max: number) => void;
}

export function ProductFilters({
    categories,
    onCategoryChange,
    onSearchChange,
    onSortChange,
    onPriceRangeChange,
}: ProductFiltersProps) {
    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('1000');

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4" >
            <div className="mb-4" >
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    onChange={(e) => onSearchChange(e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            < div className="mb-4" >
                <label className="block text-sm font-medium mb-2" > Categorías </label>
                < select
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                >
                    <option value="" > Todas las categorías </option>
                    {
                        categories.map((category) => (
                            <option key={category} value={category} >
                                {category}
                            </option>
                        ))
                    }
                </select>
            </div>

            < div className="mb-4" >
                <label className="block text-sm font-medium mb-2" > Ordenar por </label>
                < select
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                >
                    <option value="" > Sin ordenar </option>
                    < option value="price-asc" > Precio: Menor a Mayor </option>
                    < option value="price-desc" > Precio: Mayor a Menor </option>
                    < option value="name-asc" > Nombre: A - Z </option>
                    < option value="name-desc" > Nombre: Z - A </option>
                </select>
            </div>

            < div className="mb-4" >
                <label className="block text-sm font-medium mb-2" > Rango de Precio </label>
                < div className="flex gap-2" >
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => {
                            setMinPrice(e.target.value);
                            onPriceRangeChange(Number(e.target.value), Number(maxPrice));
                        }}
                        className="w-1/2 px-4 py-2 border rounded-lg"
                        placeholder="Min"
                    />
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => {
                            setMaxPrice(e.target.value);
                            onPriceRangeChange(Number(minPrice), Number(e.target.value));
                        }}
                        className="w-1/2 px-4 py-2 border rounded-lg"
                        placeholder="Max"
                    />
                </div>
            </div>
        </div>
    );
}