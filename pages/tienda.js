import Guitarra from "@/components/guitarra";
import Layout from "@/components/layout";
import styles from "@/styles/grid.module.css";

export default function Tienda({ guitarras }) {
    return (
        <Layout
            title="Tienda Virtual"
            description="GuitarCO - Tienda virtual, tienda de guitarras"
        >
            <main className="contenedor">
                <h1 className="heading">Nuestra Colección</h1>

                <div className={styles.grid}>
                    {guitarras?.map((guitarra) => (
                        <Guitarra
                            key={guitarra.id}
                            guitarra={guitarra.attributes}
                        />
                    ))}
                </div>
            </main>
        </Layout>
    );
}

/**
 * SSG: Generación de Sitios Estáticos
 * Los datos necesarios para representar la página sólo estarán disponibles
 * en el momento de la compilación antes de la solicitud de un usuario. Es decir,
 * los últimos cambios en la API no se reflejarán hasta la siguiente compilación
 */
// export async function getStaticProps() {
//     const respuesta = await fetch(
//         `${process.env.API_URL}/guitarras?populate=imagen`
//     );
//     // Destructuramos la propiedad data y le asignamos el alias guitarras
//     const { data: guitarras } = await respuesta.json();

//     // props devuelve los datos que estarán disponibles en este componente
//     return {
//         props: {
//             guitarras,
//         },
//     };
// }

/**
 * SSR: Representación del Lado del Servidor
 * Los datos necesarios para representar la página estarán disponibles durante
 * cada solicitud de un usuario. Es decir, Cuando solicita esta página directamente,
 * "getServerSideProps" se ejecuta en el momento de la solicitud, y esta página
 * se renderizará previamente con los props devueltos.
 */
export async function getServerSideProps() {
    const respuesta = await fetch(
        `${process.env.API_URL}/guitarras?populate=imagen`
    );
    // Destructuramos la propiedad data y le asignamos el alias guitarras
    const { data: guitarras } = await respuesta.json();

    // props devuelve los datos que estarán disponibles en este componente
    return {
        props: {
            guitarras,
        },
    };
}
