import sys
import json
from fuzzywuzzy import fuzz

def keyword_matching(user_query, json_data, keywords_file_path):
    # Load the JSON data
    try:
        data = json.loads(json_data)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON data: {str(e)}")
        return []

    # Read the keywords from the file
    with open(keywords_file_path, 'r') as file:
        keywords = [keyword.strip().lower() for keyword in file.readlines()]

    matches = []

    for item in data:
        # Check if the user query fuzzy matches the 'nomP' or 'description' fields
        if isinstance(item, dict) and 'nomP' in item and 'description' in item:
            if any(fuzz.partial_ratio(user_query, item['nomP'].lower()) >= 75 for keyword in keywords) or any(fuzz.partial_ratio(user_query, item['description'].lower()) >= 75 for keyword in keywords):
                matches.append(item)

    return matches

# Get the command-line arguments
user_query = sys.argv[1]
json_data = sys.argv[2]
keywords_file_path = 'C:/Users/MSI/Desktop/PFE/Realisation/Backend/marketplace/src/keyword-matching/keywords.txt'

# Perform the keyword matching
matches = keyword_matching(user_query, json_data, keywords_file_path)

# Output the matches as JSON
output_json = json.dumps(matches)
print(output_json)
