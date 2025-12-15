
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('purchase-form');
    const modal = document.getElementById('pix-modal');
    const closeModal = document.getElementById('close-modal');
    const pixCodeInput = document.getElementById('pix-code-input');
    const copyBtn = document.getElementById('copy-btn');
    const submitBtn = document.getElementById('submit-btn');

    // Fake PIX Code for demo purposes
    const FAKE_PIX_CODE = "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913Fulano de Tal6008BRASILIA62070503***630460F4";

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Loading state
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> GERANDO PIX...';
        submitBtn.disabled = true;

        // Simulate API Request delay
        setTimeout(() => {
            // Success State
            modal.classList.remove('hidden');
            pixCodeInput.value = FAKE_PIX_CODE;
            
            // Reset button
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;
            
            startTimer();
        }, 1500); // 1.5s delay to feel "real"
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close modal if clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Copy to Clipboard Logic
    copyBtn.addEventListener('click', () => {
        pixCodeInput.select();
        pixCodeInput.setSelectionRange(0, 99999); // For mobile
        
        navigator.clipboard.writeText(pixCodeInput.value).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> COPIADO';
            copyBtn.style.background = '#00c851';
            copyBtn.style.color = '#fff';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
                copyBtn.style.color = '';
            }, 2000);
        });
    });

    // Timer Logic for urgency
    function startTimer() {
        let duration = 600; // 10 minutes
        const display = document.querySelector('#countdown');
        
        let timer = duration, minutes, seconds;
        const interval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(interval);
                display.textContent = "EXPIRADO";
                display.style.color = "red";
            }
        }, 1000);
    }
});
