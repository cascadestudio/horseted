export const downloadDocument = (blob, documentName, type = "application/pdf") => {
  const pdfBlob = new Blob([blob], { type });
  const url = URL.createObjectURL(pdfBlob);

  const a = document.createElement("a");
  a.href = url;
  a.download = documentName;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
