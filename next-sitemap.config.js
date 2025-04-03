/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://gearsoftca.vercel.app', // URL base de tu sitio
    generateRobotsTxt: true, // Generar robots.txt
    sitemapSize: 5000, // Tamaño máximo de cada archivo sitemap
    changefreq: 'daily', // Frecuencia de cambio sugerida
    priority: 0.7, // Prioridad por defecto para las URLs
};