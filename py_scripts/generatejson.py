import os

def generate_json_results(directory_path):
	files = []
	for fn in os.listdir(directory_path):
		files.append(fn)
	
	print(directory_path) 
