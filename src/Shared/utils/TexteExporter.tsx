// À installer avant :
// npm install docx jspdf

import { Document, Packer, Paragraph } from "docx";
import { jsPDF } from "jspdf";

type ExportResult = { success: true } | { success: false; error: string };

// Class pour exporter du texte en différents formats
export class FileExporter {
  // Vérifie le texte et retourne un message d'erreur ou null si valide
  static #validateText(text: string | null | undefined): string | null {
    if (text === null || text === undefined) {
      return "Il n'y a pas de texte.";
    }
    //Considérer chaîne vide comme invalide
    if (typeof text === "string" && text.trim() === "") {
      return "Le texte est vide.";
    }
    return null;
  }

  // Méthode utilitaire privée pour déclencher le téléchargement
  static #downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  /**
   * Export en .txt
   * Retourne Promise<ExportResult>
   */
  async exportTxt(filename: string, text: string | null | undefined): Promise<ExportResult> {
    const err = FileExporter.#validateText(text);
    if (err) return { success: false, error: err };

    const finalName = filename.endsWith(".txt") ? filename : `${filename}.txt`;
    const blob = new Blob([text!], {
      type: "text/plain;charset=utf-8",
    });

    try {
      FileExporter.#downloadBlob(blob, finalName);
      return { success: true };
    } catch (e) {
      return { success: false, error: "Erreur lors du téléchargement du fichier." };
    }
  }

  /**
   * Export en .docx
   * Retourne Promise<ExportResult>
   */
  async exportDocx(filename: string, text: string | null | undefined): Promise<ExportResult> {
    const err = FileExporter.#validateText(text);
    if (err) return { success: false, error: err };

    const finalName = filename.endsWith(".docx") ? filename : `${filename}.docx`;

    try {
      const paragraphs = (text as string)
        .split("\n")
        .map((line) => new Paragraph(line));

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      FileExporter.#downloadBlob(blob, finalName);
      return { success: true };
    } catch (e) {
      return { success: false, error: "Erreur lors de la génération du .docx." };
    }
  }

  /**
   * Export en .pdf
   * Retourne Promise<ExportResult>
   */
  async exportPdf(filename: string, text: string | null | undefined): Promise<ExportResult> {
    const err = FileExporter.#validateText(text);
    if (err) return { success: false, error: err };

    const finalName = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;

    try {
      const pdf = new jsPDF();
      const marginLeft = 10;
      const marginTop = 10;
      const maxWidth = 180;

      const lines = pdf.splitTextToSize(text as string, maxWidth);
      pdf.text(lines, marginLeft, marginTop);
      pdf.save(finalName);
      return { success: true };
    } catch (e) {
      return { success: false, error: "Erreur lors de la génération du PDF." };
    }
  }
}
