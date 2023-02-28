import Layout from "@/components/layout";
import Image from "next/image";
import styles from "@/styles/nosotros.module.css";

export default function Nosotros() {
    return (
        <Layout
            title="Nosotros"
            description="GuitarCO - Sobre nosotros tienda de música"
        >
            <main className="contenedor">
                <h1 className="heading">Nosotros</h1>
                <div className={styles.contenido}>
                    <Image
                        src="/img/nosotros.jpg"
                        width={1000}
                        height={800}
                        alt="Imagen sobre nosotros"
                    />
                    <div>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Doloremque repellendus autem veniam
                            repudiandae sequi. Quaerat iste eos molestiae minus
                            maxime vero iure nostrum alias, repellat, voluptatum
                            illo est corporis dicta?
                        </p>

                        <p>
                            Amet totam, voluptas iure perferendis error
                            doloremque. Nostrum, consequuntur placeat. Corporis
                            consectetur repellendus assumenda, explicabo
                            recusandae placeat sapiente.
                        </p>

                        <p>
                            Amet consectetur adipisicing elit. Doloremque
                            repellendus autem veniam repudiandae sequi. Quaerat
                            iste eos molestiae minus maxime vero iure nostrum
                            alias, repellat, voluptatum illo est corporis dicta?
                        </p>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
