document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('absenceForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const studentId = document.getElementById('studentId').value.trim();
        const reason = document.getElementById('reason').value.trim();

        messageDiv.textContent = '';
        messageDiv.style.display = 'none';

        if (!studentId || !reason) {
            messageDiv.textContent = 'Please enter both Student ID and Reason.';
            messageDiv.style.display = 'block';
            messageDiv.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('https://<yourapp>.azurewebsites.net/api/ProcessAbsence2?code=vI_oKEXvf1VvW6HiEFXCYldFdut8TedSrBiiEGcclVGeAzFuP24jvA==', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId, reason })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                messageDiv.textContent = data.message || 'Absence submitted successfully.';
                messageDiv.style.display = 'block';
                messageDiv.style.color = 'green';
            } else {
                messageDiv.textContent = data.message || `Error: Server responded with status ${response.status}`;
                messageDiv.style.display = 'block';
                messageDiv.style.color = 'red';
            }
        } catch (error) {
            messageDiv.textContent = 'Error: ' + error.message;
            messageDiv.style.display = 'block';
            messageDiv.style.color = 'red';
            console.error('Request error:', error);
        }
    });
});
