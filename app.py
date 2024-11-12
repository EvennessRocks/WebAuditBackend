# app.py
from flask import Flask, request, jsonify
from scraper import scrape_webpage
from audit import audit_with_openai
from compliance import get_wcag_compliance_chart

# Initialize Flask app
app = Flask(__name__)

@app.route('/audit', methods=['POST'])
def audit():
    # Parse request data
    data = request.json
    url = data.get('url')  # URL to audit
    compliance_standard = data.get('compliance_standard', "WCAG")  # Default is WCAG
    conformance_level = data.get('conformance_level', "A")  # Default is A

    # Validate inputs
    if not url:
        return jsonify({"error": "URL is required"}), 400

    # Step 1: Scrape the webpage to retrieve HTML markup and CSS
    html_markup, css = scrape_webpage(url)
    if not html_markup:
        return jsonify({"error": "Failed to scrape the webpage"}), 500

    # Step 2: Get WCAG compliance chart
    wcag_compliance_chart = get_wcag_compliance_chart()

    # Step 3: Perform WCAG audit using OpenAI API with compliance standard and level
    audit_report = audit_with_openai(
        html_markup, css, wcag_compliance_chart, 
        compliance_standard=compliance_standard, 
        conformance_level=conformance_level
    )

    # Step 4: Return the audit result
    return jsonify({"audit_report": audit_report})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)