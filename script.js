document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const qrColor = document.getElementById('qr-color');
    const bgColor = document.getElementById('bg-color');
    const qrStyle = document.getElementById('qr-style');
    const cornerStyle = document.getElementById('corner-style');
    const sizeSlider = document.getElementById('size-slider');
    const sizeValue = document.getElementById('size-value');
    const logoInput = document.getElementById('logo-input');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const themeSwitch = document.getElementById('theme-switch');
    const themeIcon = themeSwitch.querySelector('i');
    const themeText = themeSwitch.querySelector('span');

    let qrCode = null;

    // Initialize QR Code instance
    function initQRCode() {
        const container = document.getElementById('qr-code');
        container.innerHTML = ''; // Clear existing content
        
        qrCode = new QRCodeStyling({
            width: 300,
            height: 300,
            type: "canvas",
            data: "Enter text and click Generate",
            dotsOptions: {
                type: "squares",
                color: "#000000"
            },
            cornersSquareOptions: {
                type: "square",
                color: "#000000"
            },
            cornersDotOptions: {
                type: "square",
                color: "#000000"
            },
            backgroundOptions: {
                color: "#ffffff"
            },
            qrOptions: {
                errorCorrectionLevel: 'H'
            }
        });
        
        qrCode.append(container);
    }

    // Generate QR code with current settings
    function generateQR() {
        if (!qrCode) return;
        
        const config = {
            width: parseInt(sizeSlider.value),
            height: parseInt(sizeSlider.value),
            data: textInput.value || 'https://example.com',
            dotsOptions: {
                type: qrStyle.value,
                color: qrColor.value
            },
            cornersSquareOptions: {
                type: cornerStyle.value,
                color: qrColor.value
            },
            cornersDotOptions: {
                type: cornerStyle.value,
                color: qrColor.value
            },
            backgroundOptions: {
                color: bgColor.value
            }
        };
        
        try {
            qrCode.update(config);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    }

    // Theme switching
    function toggleTheme() {
        const body = document.body;
        const isDark = body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme', !isDark);
        
        // Update button icon and text
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        themeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Load saved theme
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Dark Mode';
        } else {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light Mode';
        }
    }

    // Size slider value display
    sizeSlider.addEventListener('input', () => {
        sizeValue.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;
    });

    // Logo handling
    logoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                qrCode.update({
                    image: e.target.result,
                    imageOptions: {
                        imageSize: 0.2,
                        margin: 10
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    });

    // Event listeners
    generateBtn.addEventListener('click', generateQR);
    downloadBtn.addEventListener('click', () => {
        qrCode.download({ name: 'qr-code', extension: 'png' });
    });
    themeSwitch.addEventListener('click', toggleTheme);

    // Initialize
    initQRCode();
    loadTheme();
});
