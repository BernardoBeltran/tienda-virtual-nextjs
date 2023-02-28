import { Html, Head, Main, NextScript } from "next/document";

// Documento principal para definir la estructura general del proyecto
// información meta, estilos y fuentes externas
// Este archivo está por encima en el nivel y jerarquia del archivo _app.js
// y los archivos de la carpeta /pages

/**
 * _document.js es un archivo especial  que se utiliza para personalizar la
 * estructura HTML que se envía al navegador. Se ejecuta solo en el lado del
 * servidor y le permite personalizar la etiqueta <head> y el cuerpo de la página HTML.
 * Es útil para agregar metaetiquetas, hojas de estilo y scripts que deben
 * estar disponibles en todas las páginas de su aplicación.
 */
export default function Document() {
    return (
        <Html>
            <Head>
                <meta
                    name="description"
                    content="GuitarCO - Venta de guitarras y blog de música"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin={"true"}
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://necolas.github.io/normalize.css/8.0.1/normalize.css"
                />
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
