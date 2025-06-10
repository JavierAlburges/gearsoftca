"use client";
import React from "react";
import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 24,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1e3a8a",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#1e3a8a",
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    color: "#22223b",
    marginBottom: 8,
    textAlign: "justify",
  },
  note: {
    fontSize: 12,
    color: "#4f4f4f",
    marginTop: 24,
    textAlign: "center",
    fontStyle: "italic",
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Ejemplo de PDF - GearSoftCA</Text>
        <Text style={styles.subtitle}>Visión</Text>
        <Text style={styles.text}>
          Ser la empresa líder en Venezuela y Latinoamérica, reconocida por nuestra innovación constante y la calidad de nuestro trabajo en todas las plataformas para nuestros clientes.
        </Text>
        <Text style={styles.subtitle}>Misión</Text>
        <Text style={styles.text}>
          Desarrollar soluciones de software innovadoras, personalizadas y de alta calidad en todas las plataformas, superando las expectativas de nuestros clientes e impulsando su crecimiento.
        </Text>
        <Text style={styles.note}>
          Este es un ejemplo de cómo crear y descargar un PDF en React usando @react-pdf/renderer.
        </Text>
        {/* Sección de firmas */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 60 }}>
          <View style={{ width: "40%" }}>
            <Text>______________________________</Text>
            <Text style={{ textAlign: "left", marginTop: 4, fontSize: 12 }}>Firma del Gerente de Proyecto</Text>
          </View>
          <View style={{ width: "40%", alignItems: "flex-end" }}>
            <Text>______________________________</Text>
            <Text style={{ textAlign: "right", marginTop: 4, fontSize: 12 }}>Firma del Cliente</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

const PDFDemo = () => {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <h2 className="text-2xl font-bold text-[var(--color-dark-blue)]">Ejemplo PDF: Misión y Visión</h2>
      <div className="w-full h-[600px] border rounded overflow-hidden shadow-lg">
        <PDFViewer width="100%" height="100%">
          <MyDocument />
        </PDFViewer>
      </div>
      <PDFDownloadLink document={<MyDocument />} fileName="mision-vision-gearsoftca.pdf">
        {({ loading }) => (
          <button className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition">
            {loading ? "Generando PDF..." : "Descargar PDF"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default PDFDemo;
