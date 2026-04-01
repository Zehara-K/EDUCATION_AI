export const generatePlanner = (req, res) => {
    const { subjects, examDate } = req.body;

    res.json({
        plan: [
            `Study ${subjects} daily`,
            `Revise before ${examDate}`,
            `Practice mock tests`
        ]
    });
};

export const studyAssistant = (req, res) => {
    const { topic } = req.body;

    res.json({
        explanation: `Simple explanation of ${topic}: This is an important concept for exams.`
    });
};

export const chatBot = (req, res) => {
    const { message } = req.body;

    res.json({
        reply: `AI: I understood "${message}"`
    });
};