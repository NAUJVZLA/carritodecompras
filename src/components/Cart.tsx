import { useCart } from "@/app/page/CartContext";

export function Cart() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

    return (
        <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-bold mb-4">Carrito de Compras</h2>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 mb-4 border-b pb-4">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-20 h-20 object-contain"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-blue-600">${item.price}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="px-2 py-1 bg-gray-200 rounded"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-2 py-1 bg-gray-200 rounded"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="ml-4 text-red-500"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 text-xl font-bold">
                        Total: ${getCartTotal().toFixed(2)}
                    </div>
                </>
            )}
        </div>
    );
}
