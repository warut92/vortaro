import time

# Load dictionary data
print("พจนานุกรมเอสเปรันโต-ไทย 2568 ฉบับทดลอง")
def load_dictionary(filename="eoth-vortaro.js"):
    dictionary = {}
    with open(filename, "r", encoding="utf-8") as file:
        for line in file:
            if " " in line:
                word, meaning = line.strip().split(" ", 1)
                dictionary[word.lower()] = meaning
    return dictionary

# Live search function
def live_search(dictionary):
    while True:
        query = input("ค้นหา: ").strip().lower()
        if query == "x":
            break

        results = {word: meaning for word, meaning in dictionary.items() if query in word}

        if results:
            for word, meaning in results.items():
                print(f"{word} : {meaning}")
        else:
            print("ไม่พบคำค้นหา")
        time.sleep(0.5)  # Delay to simulate live search

# Run the program
dictionary = load_dictionary()
live_search(dictionary)
