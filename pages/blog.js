import Layout from "@/components/layout";
import Post from "@/components/post";
import styles from "@/styles/grid.module.css";

export default function Blog({ posts }) {
    return (
        <Layout
            title="Blog"
            description="GuitarCO - Blog de música, venta de guitarras, consejos"
        >
            <main className="contenedor">
                <h1 className="heading">Blog</h1>
                <div className={styles.grid}>
                    {posts?.map((post) => (
                        <Post key={post.id} post={post.attributes} />
                    ))}
                </div>
            </main>
        </Layout>
    );
}

// Obtener los posts desde la API
export async function getStaticProps() {
    const respuesta = await fetch(
        `${process.env.API_URL}/posts?populate=imagen`
    );
    // Desestructuramos la propiedad data y le asignamos el alias posts
    const { data: posts } = await respuesta.json();

    // props devuelve los datos que estarán disponibles en este componente
    return {
        props: {
            posts,
        },
    };
}
