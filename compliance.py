import json

def get_wcag_compliance_chart(file_path="./wcag_compliance_2.json"):
    """
    Loads the WCAG compliance data from a JSON file.
    """
    try:
        with open(file_path, 'r') as f:
            wcag_compliance = json.load(f)
        return wcag_compliance
    except Exception as e:
        return f"Error loading WCAG compliance data: {e}"