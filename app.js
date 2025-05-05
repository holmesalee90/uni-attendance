document.getElementById("absenceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const responseMessage = document.getElementById("responseMessage");
    responseMessage.textContent = "Submitting...";
    responseMessage.className = "";

    try {
        const studentId = document.getElementById("studentId").value.trim();
        const reason = document.getElementById("reason").value.trim();

        if (!studentId || !reason) {
            throw new Error("Please fill in all fields");
        }

        const functionUrl = "https://uni-attendance-api-eastus-2.azurewebsites.net/api/ProcessAbsence2";
        const functionKey = "YOUR_FUNCTION_KEY"; // Get from Azure Portal

        const response = await fetch(`${functionUrl}?code=${functionKey}`, {
            method: "POST",
            body: JSON.stringify({ studentId, reason }),
            headers: { "Content-Type": "application/json" }
        });

        // First check if response has content
        const text = await response.text();
        let data;
        
        try {
            data = text ? JSON.parse(text) : {};
        } catch (e) {
            console.warn("Response wasn't JSON:", text);
            data = { message: text };
        }

        if (!response.ok) {
            throw new Error(data.message || `Request failed with status ${response.status}`);
        }

        responseMessage.textContent = data.message || "Absence submitted successfully!";
        responseMessage.className = "success";
        document.getElementById("absenceForm").reset();

    } catch (error) {
        console.error("Submission error:", error);
        responseMessage.textContent = `Error: ${error.message}`;
        responseMessage.className = "error";
    }
});
