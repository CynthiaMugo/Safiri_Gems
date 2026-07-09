import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";


const CartContext = createContext();


export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {

    const savedCart = localStorage.getItem(
      "safiriCart"
    );

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });


  // Persist cart whenever it changes
  useEffect(() => {

    localStorage.setItem(
      "safiriCart",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);



  function addToCart(product) {

    setCartItems((prevItems) => {

      const existingItem = prevItems.find(
        (item) => item.id === product.id
      );


      if (existingItem) {

        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );

      }


      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
        },
      ];

    });

  }

  function removeFromCart(productId) {

    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => item.id !== productId
      )
    );

  }

  function updateQuantity(productId, quantity) {

    if (quantity < 1) return;


    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );

  }

  function clearCart() {

    setCartItems([]);

    localStorage.removeItem(
      "safiriCart"
    );

  }

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce(
    (count, item) =>
      count + item.quantity,
    0
  );



  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}
export function useCart() {

  return useContext(CartContext);

}