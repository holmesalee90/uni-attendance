document.getElementById("absenceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const responseMessage = document.getElementById("responseMessage");
    responseMessage.textContent = "Submitting...";
    responseMessage.className = "loading";

    try {
        // Get form values
        const studentId = document.getElementById("studentId").value.trim();
        const reason = document.getElementById("reason").value.trim();

        // Validate inputs
        if (!studentId || !reason) {
            throw new Error("Please fill in all fields");
        }

        // Your Azure Function details
        const FUNCTION_URL = "https://uni-attendance-api-eastus-2.azurewebsites.net/api/ProcessAbsence2";
        const FUNCTION_KEY = "yPVGBRzdsjRFZ55qxIJKY60fW1VvUTaBCncKa-QFA2ddAzFugacuOQ==";

        // Make the request
        const response = await fetch(`${FUNCTION_URL}?code=${FUNCTION_KEY}`, {
            method: "POST",
            body: JSON.stringify({
                studentId: studentId,
                reason: reason
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Handle response
        const responseText = await response.text();
        let responseData;
        
        try {
            responseData = responseText ? JSON.parse(responseText) : {};
        } catch {
            responseData = { message: responseText };
        }

        if (!response.ok) {
            throw new Error(responseData.message || `Request failed with status ${response.status}`);
        }

        // Success handling
        responseMessage.textContent = responseData.message || "Absence submitted successfully!";
        responseMessage.className = "success";
        document.getElementById("absenceForm").reset();

    } catch (error) {
        // Error handling
        console.error("Submission error:", error);
        responseMessage.textContent = `Error: ${error.message}`;
        responseMessage.className = "error";
    }
});
