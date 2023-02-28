/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Propiedad para habilitar el formato .avif y .webp, en teoría el navegador
    // elige por defecto el formato que soporta y que sea de menor tamaño
    images: {
        formats: ["image/avif", "image/webp"],

        // Habilitar dominios para para renderizar imagenes externas
        // En este caso, habilitamos el dominio de cloudinary
        domains: ["res.cloudinary.com"],
    },
};

module.exports = nextConfig;
