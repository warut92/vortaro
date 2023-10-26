import os.path
import argparse
from datetime import datetime

def get_js_modification_time(js_file_path):
    modification_time = os.path.getmtime(js_file_path)
    modification_time = datetime.fromtimestamp(modification_time)
    print(f"{modification_time}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Get modification time of a JavaScript file.')
    parser.add_argument('js_file_path', type=str, help='Path to the JavaScript file')

    args = parser.parse_args()
    get_js_modification_time(args.js_file_path)
