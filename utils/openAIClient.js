const { Configuration, OpenAIApi } = require('openai');
const OpenAI = require('openai');

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Using the environment variable for security
});

// const openai = new OpenAIApi(config÷uration);

exports.summarizeResults = async (results) => {
  const violationDescriptions = results.violations.map(violation => {
    return `Issue: ${violation.description} (Impact: ${violation.impact}).`;
  }).join("\n");

  const passDescriptions = results.passes.map(pass => {
    return `Good Practice: ${pass.description}.`;
  }).join("\n");

  const fullPrompt = `
    Here is an accessibility audit report from axe-core:
    
    Issues Found:
    ${violationDescriptions}

    Good Practices:
    ${passDescriptions}

    Please provide a concise summary that highlights both areas for improvement and commendable practices, focusing on what the website owners should prioritize fixing and what they're doing well to support accessibility.
    Also closely look at the tags and only analyze those that have wcag in them. Only mention wcag in the summary if possible, no other ones.
    Also don't say that an audit was provided to you. Just give me a summary back.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: fullPrompt },
    ],
  });

  return response.choices[0].message.content.trim();
};