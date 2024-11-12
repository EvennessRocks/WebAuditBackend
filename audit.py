# audit.py

import openai
from config import OPENAI_API_KEY
import json

openai.api_key = OPENAI_API_KEY

def summarize_content(content, label):
    """Helper function to summarize large HTML or CSS content for the OpenAI prompt."""
    prompt = f"Please provide a summary of the key accessibility-relevant elements in the following {label} content:\n\n{content[:3000]}"
    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",
        prompt=prompt,
        max_tokens=500,
    )
    return response.choices[0].text.strip()

def audit_with_openai(html_markup, css_data, wcag_compliance, compliance_standard="WCAG", conformance_level="A", user_inputs=None):
    """
    Calls OpenAI API to audit the webpage's WCAG compliance using summarized HTML, CSS, and WCAG compliance data.
    """
    # Summarize HTML and CSS data if they are large
    html_summary = summarize_content(html_markup, "HTML")
    css_summary = summarize_content(css_data, "CSS")

    # Construct the primary prompt with summarized data
    prompt = (
        f"You are an independent accessibility auditor. Please evaluate the following webpage's compliance with {compliance_standard} standards "
        f"at conformance level {conformance_level}. Do not refer to any past interactions; this is a standalone audit request. "
        "Using the summarized HTML and CSS provided and based on the WCAG compliance chart, generate an audit report "
        "highlighting key accessibility issues.\n\n"
        f"WCAG Compliance Chart (Level {wcag_compliance.get('level', conformance_level)}):\n"
        f"{json.dumps(wcag_compliance, indent=2)[:1000]}  # Truncated for brevity.\n\n"
        f"User Inputs:\n{json.dumps(user_inputs, indent=2) if user_inputs else 'None'}\n\n"
        f"HTML Summary (excerpt):\n{html_summary[:1500]}  # Limited to the first 1500 characters.\n\n"
        f"CSS Summary (excerpt):\n{css_summary[:1500]}  # Limited to the first 1500 characters."
    )

    try:
        # Request audit report from OpenAI
        response = openai.Completion.create(
            engine="gpt-3.5-turbo-instruct",
            prompt=prompt,
            max_tokens=2000,
        )
        # Extract and return the audit report from the response
        audit_report = response.choices[0].text.strip()
        return audit_report
    except openai.OpenAIError as e:
        return f"Error: {e}"