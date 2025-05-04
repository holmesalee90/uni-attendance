document.getElementById("absenceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const studentId = document.getElementById("studentId").value;
    const reason = document.getElementById("reason").value;
    
    // TEST: Verify form works
    console.log("Submitting:", studentId, reason); 
    alert("Form connected! Next step: Azure Function.");
});
