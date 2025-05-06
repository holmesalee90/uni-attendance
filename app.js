document.getElementById("absenceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const responseMessage = document.getElementById("responseMessage");
    responseMessage.innerHTML = "Submitting...";
    responseMessage.className = "loading";

    try {
        const studentId = document.getElementById("studentId").value.trim();
        const reason = document.getElementById("reason").value.trim();

        if (!studentId || !reason) {
            throw new Error("Please fill all fields");
        }

        const response = await fetch('https://your-function-url.azurewebsites.net/api/ProcessAbsence2', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentId, reason })
        });

        // First check if response exists
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Then parse JSON
        const result = await response.json();

        // Display success
        responseMessage.innerHTML = `
            <strong>Success!</strong><br>
            ${result.message}<br>
            Student ID: ${studentId}
        `;
        responseMessage.className = "success";

    } catch (error) {
        // Display error
        responseMessage.innerHTML = `
            <strong>Error!</strong><br>
            ${error.message}
        `;
        responseMessage.className = "error";
        console.error("Error:", error);
    }
});
