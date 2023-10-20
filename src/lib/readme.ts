export const downloadtoMd = (readmeContent: string) => {
  // Create a Blob with the README content
  const blob = new Blob([readmeContent], { type: "text/markdown" });

  // Create a temporary URL for the Blob
  const url = window.URL.createObjectURL(blob);

  // Create a link element to trigger the download
  const a = document.createElement("a");
  a.href = url;
  a.download = "README.md";

  // Trigger the download
  a.click();

  // Release the Blob and URL resources
  window.URL.revokeObjectURL(url);
};
