document.getElementById("absenceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = document.querySelector('#absenceForm button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
        const response = await fetch(
            "https://uni-attendance-api-eastus-2.azurewebsites.net/api/ProcessAbsence?code=k4E62ZAkEayZc2mVjq85eGwtONaGOkFsJM1FcLK6OvDrAzFuwiGa1g==",
            {
                method: "POST",
                body: JSON.stringify({
                    studentId: document.getElementById("studentId").value.trim(),
                    reason: document.getElementById("reason").value.trim()
                }),
                headers: { 
                    "Content-Type": "application/json",
                    "X-Azure-Functions-Key": "k4E62ZAkEayZc2mVjq85eGwtONaGOkFsJM1FcLK6OvDrAzFuwiGa1g=="
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.text();
        alert(result || "Request submitted successfully!");
        
    } catch (error) {
        console.error("Submission error:", error);
        alert(`Failed to submit: ${error.message}`);
        
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
    }
});
