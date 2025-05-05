document.getElementById("absenceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const responseMessage = document.getElementById("responseMessage");
    const submitButton = document.querySelector("#absenceForm button[type='submit']");
    
    // Set loading state
    responseMessage.textContent = "Submitting...";
    responseMessage.className = "loading";
    submitButton.disabled = true;

    try {
        // Get and validate form values
        const studentId = document.getElementById("studentId").value.trim();
        const reason = document.getElementById("reason").value.trim();

        if (!studentId || !reason) {
            throw new Error("Please fill in all fields");
        }

        // Azure Function details
        const FUNCTION_URL = "https://uni-attendance-api-eastus-2.azurewebsites.net/api/ProcessAbsence2";
        const FUNCTION_KEY = "yPVGBRzdsjRFZ55qxIJKY60fW1VvUTaBCncKa-QFA2ddAzFugacuOQ==";

        // Make the request
        const response = await fetch(`${FUNCTION_URL}?code=${FUNCTION_KEY}`, {
            method: "POST",
            body: JSON.stringify({ studentId, reason }),
            headers: { "Content-Type": "application/json" }
        });

        // Handle response
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || "Submission failed");
        }

        // Success handling
        responseMessage.innerHTML = `
            <strong>Success!</strong><br>
            ${result.message || "Absence recorded"}<br>
            <small>Student ID: ${studentId}</small>
        `;
        responseMessage.className = "success";
        document.getElementById("absenceForm").reset();

    } catch (error) {
        // Error handling
        responseMessage.innerHTML = `
            <strong>Error!</strong><br>
            ${error.message}
        `;
        responseMessage.className = "error";
        console.error("Submission error:", error);
        
    } finally {
        submitButton.disabled = false;
    }
});
