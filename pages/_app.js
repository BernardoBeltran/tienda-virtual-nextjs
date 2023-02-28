import "@/styles/globals.css";
import { useState, useEffect } from "react";

/**
 * _app.js es un archivo especial que se utiliza para inicializar
 * componentes y establecer el estado compartido (context) en todas las
 * páginas de su aplicación.Se ejecuta en el lado del servidor y del cliente.
 * Es útil para iniciar sesiones de usuario, establecer cookies, y realizar
 * otras acciones que deben estar disponibles en todas las páginas de su aplicación.
 *
 * Este archivo está en un nivel superior a los archivos de la carpeta /pages
 *
 */
export default function App({ Component, pageProps }) {
    // Obtener el valor del carrito desde LS
    const carritoLS =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("carrito")) ?? []
            : [];

    const [carrito, setCarrito] = useState(carritoLS);
    const [paginaLista, setPaginaLista] = useState(false);

    // Manejar problema de la hidratación,
    useEffect(() => {
        // Sólo hasta que el componente está listo, cambia el valor de paginaLista a true
        setPaginaLista(true);
    }, []);

    // Guardar el carrito en LS cundo el componente está listo y cada que carrito cambia
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    // Funciones CRUD del carrito
    const agregarCarrito = (guitarra) => {
        // Comprobar si la guitarra ya esta en el carrito...
        if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
            // Iterar para actualizar la cantidad
            const carritoActualizado = carrito.map((guitarraState) => {
                if (guitarraState.id === guitarra.id) {
                    guitarraState.cantidad = guitarra.cantidad;
                }
                return guitarraState;
            });
            // Se asigna al array
            setCarrito([...carritoActualizado]);
            localStorage.setItem("carrito", JSON.stringify(carrito));
        } else {
            // En caso de que el articulo no exista, es nuevo y se agrega
            setCarrito([...carrito, guitarra]);
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }
    };

    const eliminarProducto = (id) => {
        const carritoActualizado = carrito.filter(
            (producto) => producto.id != id
        );
        setCarrito(carritoActualizado);
        window.localStorage.setItem("carrito", JSON.stringify(carrito));
    };

    const actualizarCantidad = (guitarra) => {
        const carritoActualizado = carrito.map((guitarraState) => {
            if (guitarraState.id === guitarra.id) {
                guitarraState.cantidad = parseInt(guitarra.cantidad);
            }
            return guitarraState;
        });
        setCarrito(carritoActualizado);
        window.localStorage.setItem("carrito", JSON.stringify(carrito));
    };

    // Sólo renderiza si paginaLista es true, para evitar problema con hidratación
    return paginaLista ? (
        <Component
            {...pageProps}
            carrito={carrito}
            agregarCarrito={agregarCarrito}
            eliminarProducto={eliminarProducto}
            actualizarCantidad={actualizarCantidad}
        />
    ) : null;
}
