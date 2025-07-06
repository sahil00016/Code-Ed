const aiService = require("../services/ai.service")


module.exports.getReview = async (req, res) => {
    const code = req.body.code;
    const prompt = req.body.prompt;

    if (!code) {
        return res.status(400).send("Prompt is required");
    }

    // Always generate the standard review
    const review = await aiService(code);

    let promptResponse = null;
    if (prompt && prompt.trim()) {
        // Generate a prompt-based answer
        const promptText = `Here is the code:\n\n\
${code}\n\n\
User prompt: ${prompt}\n\n\
Please answer the user's prompt based on the code above.`;
        promptResponse = await aiService(promptText);
    }

    res.json({
        review,
        promptResponse
    });
}