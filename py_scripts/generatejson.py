import os, io

def generate_json_results(directory_path):

	
	path = './' + directory_path
	listing = os.listdir(path)
	print(listing)
	for file in listing:
		print "current file is " + file
		#read in the file 
		file_input = io.open(path + '/' + file, encoding='utf8')
		file_raw = file_input.read()


