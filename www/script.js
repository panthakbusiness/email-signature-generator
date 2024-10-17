
document.getElementById('signature-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const jobTitle = document.getElementById('job-title').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const companyLogo = document.getElementById('company-logo').files[0];
    const font = document.getElementById('font').value;
    const color = document.getElementById('color').value;
    const fontSize = document.getElementById('font-size').value;
    const language = document.getElementById('language').value;
    const filePlacement = document.getElementById('file-placement').value;

    let logoURL = '';
    if (companyLogo) {
        const reader = new FileReader();
        reader.onload = function(e) {
            logoURL = e.target.result;
            generateSignature(name, jobTitle, email, phone, logoURL, font, color, fontSize, language, filePlacement);
        };
        reader.readAsDataURL(companyLogo);
    } else {
        generateSignature(name, jobTitle, email, phone, logoURL, font, color, fontSize, language, filePlacement);
    }
});

function generateSignature(name, jobTitle, email, phone, logoURL, font, color, fontSize, language, filePlacement) {
    const signaturePreview = document.getElementById('signature-preview');
    const logoHTML = logoURL ? `<img src="${logoURL}" alt="Company Logo" style="max-width: 100px; display: block; margin-bottom: 10px;">` : '';
    const signatureHTML = `
        <div style="font-family: ${font}; color: ${color}; font-size: ${fontSize}px; line-height: 1.5;">
            ${filePlacement === 'above' ? logoHTML : ''}
            <strong>${name}</strong><br>
            ${jobTitle}<br>
            <a href="mailto:${email}">${email}</a><br>
            ${phone}
            ${filePlacement === 'below' ? logoHTML : ''}
        </div>
    `;
    signaturePreview.innerHTML = signatureHTML;
}

document.getElementById('copy-button').addEventListener('click', function() {
    const signaturePreview = document.getElementById('signature-preview');
    const range = document.createRange();
    range.selectNode(signaturePreview);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Signature copied to clipboard!');
});
