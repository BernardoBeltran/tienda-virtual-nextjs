import { useState } from "react";
import Image from "next/image";
import Layout from "@/components/layout";
import styles from "@/styles/guitarras.module.css";

// Obtenemos el parámetro guitarra devuelto en la petición a la API
export default function Producto({ guitarra, agregarCarrito }) {
    const [cantidad, setCantidad] = useState(0);
    const { nombre, descripcion, imagen, precio } = guitarra[0].attributes;

    // Manejador del evento submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que la cantidad seleccionada sea mayor que cero
        if (cantidad < 1) {
            alert("Seleccione la cantidad que desea comprar");

            return;
        }

        // Construir un objeto
        const guitarraSeleccionada = {
            id: guitarra[0].id,
            imagen: imagen.data.attributes.url,
            nombre,
            precio,
            cantidad,
        };

        // Pasando la información al context
        agregarCarrito(guitarraSeleccionada);
    };

    return (
        <Layout
            title={`Guitarra ${nombre}`}
            description={`GuitarCO, Comprar guitarra, ${nombre}`}
        >
            <div className={styles.guitarra}>
                <Image
                    src={imagen.data.attributes.url}
                    width={600}
                    height={400}
                    alt={`Imagen guitarra ${nombre}`}
                />

                <div className={styles.contenido}>
                    <h3>{nombre}</h3>
                    <p className={styles.descripcion}>{descripcion}</p>
                    <p className={styles.precio}>${precio}</p>
                    <form className={styles.formulario} onSubmit={handleSubmit}>
                        <label htmlFor="cantidad">Cantidad:</label>
                        <select
                            onChange={(e) => setCantidad(+e.target.value)}
                            id="cantidad"
                        >
                            <option value="0">-- Seleccione --</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <input type="submit" value="Agregar al Carrito" />
                    </form>
                </div>
            </div>
        </Layout>
    );
}

/**
 * ---Generación de sitio estatico---
 * Si una página tiene Rutas Dinámicas y usa getStaticProps, necesita
 * definir una lista de rutas que se generarán estáticamente. Es decir,
 * Cuando exporta una función llamada getStaticPaths desde una página
 * que usa rutas dinámicas, Next.js renderizará previamente de forma estática
 * todas las rutas especificadas por getStaticPaths.
 */
export async function getStaticPaths() {
    const respuesta = await fetch(`${process.env.API_URL}/guitarras`);
    const { data } = await respuesta.json();

    // Creamos un nuevo objeto llamado paths que devuelve un objeto params el cual
    // extrae el valor url de cada guitarra durante el recorrido del objeto data
    const paths = data.map((guitarra) => ({
        params: {
            url: guitarra.attributes.url,
        },
    }));

    console.log(paths);

    return {
        paths,
        fallback: false, // false: muestra página 404 si no existe la ruta
    };
}

/**
 * Cuando trabajamos con rutas dinámicas y queremos utilizar getStaticProps
 * para generar las rutas de forma estática durante cada compilación, es importante
 * utilizar en conjunto la función getStaticPaths que igualmente renderiza durante cada
 * compilación todas las rutas, a diferencia de getServerSideProps.
 * getStaticProps recibe  el parámetro url desde el objeto params devuelto en
 * la propiedad paths de la función getStaticPaths
 */
export async function getStaticProps({ params: { url } }) {
    console.log(url);

    const respuesta = await fetch(
        `${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`
    );

    // Extraemos la propiedad data desde la respuesta y le asignamos el alias guitarra
    const { data: guitarra } = await respuesta.json();

    // Retornamos la guitarra
    return {
        props: {
            guitarra,
        },
    };
}

// --- Renderizado del lado del servidor ---
// Obtener guitarra desde la API filtrando por url
// La función recibe información de la URL, extraemos desde la query el valor de url
// export async function getServerSideProps({ query: { url } }) {
//     console.log(url);

//     const respuesta = await fetch(
//         `${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`
//     );

//     // Extraemos la propiedad data desde la respuesta y le asignamos el alias guitarra
//     const { data: guitarra } = await respuesta.json();

//     // Retornamos la guitarra
//     return {
//         props: {
//             guitarra,
//         },
//     };
// }
