'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/products';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) throw new Error('Error al cargar los productos');
                const data: Product[] = await response.json();

                // Duplicamos los productos para tener más variedad
                const extendedProducts = [...data, ...data.map(product => ({
                    ...product,
                    id: product.id + data.length, // Aseguramos IDs únicos
                    price: product.price * (0.8 + Math.random() * 0.4) // Variamos los precios
                }))];

                // Obtenemos categorías únicas
                const uniqueCategories = Array.from(new Set(extendedProducts.map(p => p.category)));

                setProducts(extendedProducts);
                setCategories(uniqueCategories);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error, categories };
};