// Skrevet av Sondre
export function parseHtmlToTitle(htmlContent) {
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
    let title;

    // Sjekk for heading 1-6
    for (let i = 1; i <= 6; i++) {
        const heading = doc.querySelector(`h${i}`);
        if (heading && heading.innerText.trim()) {
            title = heading.innerText.trim();
            break;
        }
    }
    
    // Setter standardtittel hvis ingen overskrift er funnet
    if (!title) {
        title = 'Skriv inn Spørsmålet med en av heading alternativene. Bruk paragraf som spørsmål';
    }
  
    const contentWithoutTitle = htmlContent.replace(/<h[1-6]>.*?<\/h[1-6]>/, '');

    return { title, content: contentWithoutTitle };
}
