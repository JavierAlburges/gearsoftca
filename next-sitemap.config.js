/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://gearsoftca.vercel.app', // URL base de tu sitio
    generateRobotsTxt: true, // Generar robots.txt
    sitemapSize: 100000, // Asegurar que todas las rutas quepan en un solo archivo
    changefreq: 'daily', // Frecuencia de cambio sugerida
    priority: 0.7, // Prioridad por defecto para las URLs
};