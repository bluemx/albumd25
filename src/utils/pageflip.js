// src/utils/pageflip.js
import { PageFlip } from '../vendor/page-flip.module.js';


export async function startFlip(thebookRef, onFlip) {

    const pageFlip = new PageFlip(thebookRef.value, {
        width: 550, // base page width
        height: 733, // base page height
        size: 'stretch',
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1350,
        maxShadowOpacity: 0.5, // Half shadow intensity
        showCover: true,
        //disableFlipByClick: true,
        useMouseEvents: false,
        mobileScrollSupport: false
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    
    if (onFlip) {
        pageFlip.on('flip', (e)=>{
            onFlip(e)
        });
    }
    return pageFlip;
}

export function goToPageFromHash(pageFlipInstance) {
    if (!pageFlipInstance) return;
    const hash = window.location.hash;
    const match = hash.match(/^#p(\d+)$/);
    if (match) {
        const pageNum = parseInt(match[1], 10);
        pageFlipInstance.turnToPage(pageNum);
    }
}
