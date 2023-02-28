import Layout from "@/components/layout";
import Link from "next/link";

export default function Pagina404() {
    return (
        <Layout title="Error 404">
            <p className="error">¡Ups! Página No Encontrada</p>
            <Link className="error-enlace" href="/">
                Regresar al Inicio
            </Link>
        </Layout>
    );
}
