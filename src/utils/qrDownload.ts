export const downloadQRCode = ({ format, qrSize, bgColor }: { format: 'svg' | 'png'; qrSize: number; bgColor: string }) => {
  const svgElement = document.querySelector('#qr-code-svg svg');
  if (!svgElement) return;

  if (format === 'svg') {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr-code.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    // Create canvas with higher resolution for better quality
    const scale = 2;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = qrSize * scale;
    canvas.height = qrSize * scale;

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Convert SVG to data URL
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert to PNG and download
      canvas.toBlob(
        blob => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = 'qr-code.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(pngUrl);
          }
        },
        'image/png',
        1.0,
      );
      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      console.error('Failed to load QR code image');
      URL.revokeObjectURL(url);
    };

    img.src = url;
  }
};
