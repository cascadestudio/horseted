export const downloadDocument = (blob, documentName) => {
  const pdfBlob = new Blob([blob], { type: "application/pdf" });
  const url = URL.createObjectURL(pdfBlob);

  const a = document.createElement("a");
  a.href = url;
  a.download = documentName;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
