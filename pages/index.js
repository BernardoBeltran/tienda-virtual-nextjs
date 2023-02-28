import Curso from "@/components/curso";
import Guitarra from "@/components/guitarra";
import Layout from "@/components/layout";
import Post from "@/components/post";
import styles from "@/styles/grid.module.css";

export default function Home({ guitarras, posts, curso }) {
    return (
        <>
            <Layout
                title="Inicio"
                description="Venta de guitarras, blog de música, instrumentos"
            >
                <main className="contendor">
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

                <Curso curso={curso.attributes} />

                <section className="contenedor">
                    <h2 className="heading">Blog</h2>

                    <div className={styles.grid}>
                        {posts?.map((post) => (
                            <Post key={post.id} post={post.attributes} />
                        ))}
                    </div>
                </section>
            </Layout>
        </>
    );
}

// Obtener guitarras y posts desde la API
export async function getStaticProps() {
    // API URL's
    const urlGuitarras = `${process.env.API_URL}/guitarras?pagination[pageSize]=6&populate=imagen`;
    const urlPosts = `${process.env.API_URL}/posts?populate=imagen`;
    const urlCurso = `${process.env.API_URL}/curso?populate=imagen`;

    const [resGuitarras, resPosts, resCurso] = await Promise.all([
        fetch(urlGuitarras),
        fetch(urlPosts),
        fetch(urlCurso),
    ]);

    const [{ data: guitarras }, { data: posts }, { data: curso }] =
        await Promise.all([
            resGuitarras.json(),
            resPosts.json(),
            resCurso.json(),
        ]);

    return {
        props: {
            guitarras,
            posts,
            curso,
        },
    };
}
