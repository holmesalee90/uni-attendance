document.getElementById("absenceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(
            "https://uni-attendance-api.azurewebsites.net/api/ProcessAbsence?code=YOUR_FUNCTION_KEY",
            {
                method: "POST",
                body: JSON.stringify({
                    studentId: document.getElementById("studentId").value,
                    reason: document.getElementById("reason").value
                }),
                headers: { "Content-Type": "application/json" }
            }
        );
        alert(await response.text()); // This should show the response
    } catch (err) {
        alert("Error submitting form!");
        console.error(err);
    }
});
