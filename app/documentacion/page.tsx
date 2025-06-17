import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import React from "react";
import Image from "next/image";

export default function Documentacion() {
  return (
    <>
      <NavBar />
      <main className="bg-[var(--theme-background)] text-[var(--theme-text)] p-8">
        <div className="container mx-auto my-10 md:my-20">
          <h1 className="text-3xl font-bold text-[var(--theme-text)] mb-8 text-center">
            Documentación
          </h1>
          <p className="text-lg text-[var(--theme-text)] opacity-90 mb-12 text-justify">
            Este espacio está dedicado al desarrollo y la formación continua de nuestro equipo. Aquí encontrará documentación, tutoriales y recursos para mejorar sus habilidades en programación y diseño. ¡Colaboremos y compartamos conocimientos para construir un equipo aún más fuerte!
          </p>

          <section id="curso-de-programacion-basica" className="mb-12 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-6 text-center">
                Recursos del Curso de Programación Básica
            </h2>
            <ul className="space-y-4 text-[var(--brand-dark-blue)] opacity-90">
                <li>
                <a
                    href="https://drive.google.com/file/d/1JHzDf3b5qkFaxw9mUEDLE9fgtliRwNfi/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                >Presentación del curso</a>
                </li>
                <li>
                <a
                    href="https://code.visualstudio.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                >Visual Studio Code (Editor de código)</a>
                </li>
                <li>
                <a
                    href="https://sqlitebrowser.org/dl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                >SQLite Database Browser (Gestor de bases de datos)</a>
                </li>
                <li>
                <a
                    href="https://excalidraw.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                >Excalidraw (Mapas mentales y pizarra)</a>
                </li>
                <li>
                <a
                    href="https://drive.google.com/drive/u/0/folders/1VVpmGGL3RA4k6rlPKwV19adtb3AU8Yd6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                >Material del curso</a>
                </li>
                <li>
                <a
                    href="https://spotify-a2u.pages.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                >Página de muestra (Copia de Spotify)</a>
                </li>
            </ul>
          </section>
          <section id="proyectos-e-informacion-extra" className="mb-12 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-6 text-center">
              Proyectos e Información Extra
            </h2>
            <div className="flex flex-col md:flex-row gap-8 text-[var(--brand-dark-blue)] opacity-90">
              <ul className="space-y-4 flex-1">
                <li>
                  <a
                    href="https://developer.mozilla.org/es/docs/Learn_web_development/Core/Structuring_content"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    Documentación para el desarrollo web
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.aprendejavascript.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    Curso de JavaScript de Midudev
                  </a>
                </li>
                <li>
                  <a
                    href="https://developer.android.com/codelabs/basic-android-kotlin-compose-sql?hl=es-419&continue=https%3A%2F%2Fdeveloper.android.com%2Fcourses%2Fpathways%2Fandroid-basics-compose-unit-6-pathway-1%3Fhl%3Des-419%23codelab-https%3A%2F%2Fdeveloper.android.com%2Fcodelabs%2Fbasic-android-kotlin-compose-sql#0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    Curso de SQL de Google en Español
                  </a>
                </li>
                <li>
                  <a
                    href="https://sqlbolt.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    Práctica de SQL Interactiva (Inglés)
                  </a>
                </li>
                <li>
                  <a
                    href="https://developer.android.com/courses/android-basics-compose/course?hl=es-419"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    Documentación de Android Compose
                  </a>
                </li>
                <li>
                  <a
                    href="https://vscode.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    Visual Studio Code Online
                  </a>
                </li>
                <li>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.foxdebug.acodefree&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    App para editar código en teléfono
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.canva.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    Página de Canva
                  </a>
                </li>
                <li>
                  <a
                    href="https://nodejs.org/es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    Página de Node.js
                  </a>
                </li>
                <li>
                  <a
                    href="https://expressjs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    Página de Express.js
                  </a>
                </li>
              </ul>
              <div className="flex-1">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/LNKgPyYYlRw"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                ></iframe>
              </div>
            </div>
          </section>
          <section id="frameworks-utilizados" className="mb-12 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-6 text-center">
              Frameworks Utilizados en la Empresa
            </h2>
            <div className="flex flex-col md:flex-row gap-8 text-[var(--brand-dark-blue)] opacity-90">
              <ul className="space-y-4 flex-1">
                <li>
                  <a
                    href="https://angular.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    Angular
                  </a>
                </li>
                <li>
                  <a
                    href="https://es.react.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    React
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    Tailwind CSS
                  </a>
                </li>
                <li>
                  <a
                    href="https://astro.build/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    Astro
                  </a>
                </li>
                <li>
                  <a
                    href="https://nextjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    Next.js
                  </a>
                </li>
                <li>
                  <a
                    href="https://reactnative.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    React Native
                  </a>
                </li>
                <li>
                  <a
                    href="https://expo.dev/go"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
                  >
                    Expo Go
                  </a>
                </li>
              </ul>
              <div className="flex-1 flex justify-center items-center">
                <Image
                  src="/images/Frameworks.jpg"
                  alt="Frameworks"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>
          <section id="guias-rapidas" className="mb-12 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-6 text-center">
              Guías Rápidas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[var(--brand-dark-blue)] opacity-90">
              <a
                href="https://www.creative-tim.com/twcomponents/cheatsheet"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-dark-blue)] text-[var(--color-white)] px-4 py-2 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
              >
                Tailwind CSS Cheatsheet
              </a>
              <a
                href="https://watercss.kognise.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-dark-blue)] text-[var(--color-white)] px-4 py-2 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
              >
                Water CSS
              </a>
              <a
                href="https://boltcss.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-dark-blue)] text-[var(--color-white)] px-4 py-2 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
              >
                Bolt CSS
              </a>
              <a
                href="https://vercel.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-dark-blue)] text-[var(--color-white)] px-4 py-2 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
              >
                Vercel
              </a>
              <a
                href="https://sites.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-dark-blue)] text-[var(--color-white)] px-4 py-2 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
              >
                Google Sites
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-dark-blue)] text-[var(--color-white)] px-4 py-2 rounded-lg shadow-md text-center hover:bg-[var(--color-black)] transition"
              >
                GitHub
              </a>
            </div>
          </section>
          <section id="aprende-jugando" className="mb-12 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-6 text-center">
              Aprende Jugando
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[var(--brand-dark-blue)] opacity-90">
              <div className="rounded-lg shadow-lg overflow-hidden">
                <iframe
                  src="https://flexboxfroggy.com/#es"
                  title="Flexbox Froggy"
                  width="100%"
                  height="400"
                  className="rounded-lg"
                  style={{ border: "none" }}
                ></iframe>
                <div className="bg-[var(--color-dark-blue)] text-[var(--color-white)] text-center py-2">
                  <a
                    href="https://flexboxfroggy.com/#es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Juega y Aprende CSS Flexbox
                  </a>
                </div>
              </div>
              <div className="rounded-lg shadow-lg overflow-hidden">
                <iframe
                  src="https://cssgridgarden.com/#es"
                  title="CSS Grid Garden"
                  width="100%"
                  height="400"
                  className="rounded-lg"
                  style={{ border: "none" }}
                ></iframe>
                <div className="bg-[var(--color-dark-blue)] text-[var(--color-white)] text-center py-2">
                  <a
                    href="https://cssgridgarden.com/#es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Juega y Aprende CSS Grid
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section id="guia-aprendizaje-microsoft" className="mb-12 p-6 bg-[var(--brand-white)] rounded-[var(--radius-lg)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--brand-dark-blue)] mb-6 text-center">
              Guía de Aprendizaje de Programación de Microsoft
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8 text-[var(--brand-dark-blue)] opacity-90">
              <div className="flex-1 flex justify-center">
                <Image
                  src="/images/Microsoft.jpg"
                  alt="Microsoft Learn"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg"
                  priority
                />
              </div>
              <div className="flex-1 text-center">
                <a
                  href="https://learn.microsoft.com/es-es/training/browse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--color-dark-blue)] text-[var(--color-white)] px-6 py-3 rounded-lg shadow-md hover:bg-[var(--color-black)] transition"
                >
                  Explorar Microsoft Learn
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}