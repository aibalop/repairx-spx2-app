export class PdfUtil {

    static download(data: Blob, filename: string = 'archivo-generado') {
        const blob = new Blob([data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${filename}.pdf`;
        link.click();
    }

    static print(data: Blob) {
        const blob = new Blob([data], { type: 'application/pdf' });
        const blobURL = URL.createObjectURL(blob);

        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);

        iframe.style.display = 'none';
        iframe.src = blobURL;
        iframe.onload = function () {
            setTimeout(function () {
                iframe.focus();
                iframe.contentWindow.print();
            }, 1);
        };
    }

}
