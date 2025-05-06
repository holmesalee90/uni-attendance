document.getElementById('submitBtn').addEventListener('click', async () => {
    const studentId = document.getElementById('studentId').value.trim();
    const reason = document.getElementById('reason').value.trim();
    const messageDiv = document.getElementById('message');

    messageDiv.innerHTML = ''; // clear old messages

    if (!studentId || !reason) {
        messageDiv.innerHTML = `<div class="alert alert-warning">Please fill in all fields.</div>`;
        return;
    }

    try {
        const response = await fetch('https://uni-attendance-api-eastus-2.azurewebsites.net/api/ProcessAbsence2?code=vI_oKEXvf1VvWl6HiEXFCyIdFut8Ted5rBiiEGccVlGeAzFuP24jvA==', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, reason })
        });

        const contentType = response.headers.get('content-type');
        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            if (data.success) {
                messageDiv.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
            } else {
                messageDiv.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
            }
        } else {
            throw new Error('Invalid server response: not JSON');
        }
    } catch (err) {
        console.error(err);
        messageDiv.innerHTML = `<div class="alert alert-danger">Error: ${err.message}</div>`;
    }
});
