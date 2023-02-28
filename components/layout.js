import Head from "next/head";
import Footer from "./footer";
import Header from "./header";

/**
 * Componente para definir el Layout de la aplicación, recibe como argumento
 * children, title y description por defecto como string vacío.
 * Esto permite definir dinamicamente dichos parámetros durante la definición del
 * Layout en cada ruta de la aplicación
 */
export default function Layout({ children, title = "", description = "" }) {
    return (
        <>
            <Head>
                <title>{`GuitarCO - ${title}`}</title>
                <meta name="description" content={description} />
            </Head>
            <Header />

            {children}

            <Footer />
        </>
    );
}
