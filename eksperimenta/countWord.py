# Define the path to the external text file
file_path = "C:\\Users\\User\\Documents\\GitHub\\vortaro\\eoth-vortaro.js"

# Open the file and read its content
with open(file_path, "r", encoding="utf-8") as file:
    text = file.read()

# Split the text into lines
lines = text.split("\n")

# Create a dictionary to count starting letters
starting_letters_count = {}

# Iterate through each line
for line in lines:
    # Skip empty lines
    if line.strip() == "":
        continue
    # Get the first letter of the line and convert it to lowercase
    first_letter = line.strip()[0].lower()
    # Increment the count of the starting letter in the dictionary
    starting_letters_count[first_letter] = starting_letters_count.get(first_letter, 0) + 1

# Sort the starting letters by their counts from least to most
sorted_starting_letters = sorted(starting_letters_count.items(), key=lambda x: x[1])

# Print the sorted count of starting letters
for letter, count in sorted_starting_letters:
    print(f"Starting letter '{letter}' appears {count} times.")

# Print the total number of lines
total_lines = len(lines)
print(f"Total number of lines: {total_lines}")
