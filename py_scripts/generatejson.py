import nltk, io, os, sys, json
from nltk import word_tokenize, wordpunct_tokenize
from normalize import *
from freqdist import *
from generatejson import *
from customstopwords import *

def generate_json_results(directory_path):


	path = './' + directory_path
	listing = os.listdir(path)
	print(listing)
	for file in listing:
		file_name = file.split('.')[0]
		print "current file is " + file
		#read in the file 
		file_input = io.open(path + '/' + file, encoding='utf8')
		file_raw = file_input.read()


		# Initialize Results JSON
		results = {	'speaker': directory_path, 
					'fifty_most_common': ' ', 
					'frequency_distribution': '', 
					'total_words' : '',
					'set_total_words': '', 
					'total_words_normalized' : '', 
					'set_total_words_normalized' : ''
					}


		# Set Stopwords here and add own
		# remove_custom_stopwords module expects a UTF8 list 

		all_stopwords = remove_custom_stopwords((u'the', u'solo', u'...', u'clinton', u'trump'))


		# Tokenize raw input 
		tokens = wordpunct_tokenize(file_raw)
		results['total_words'] = len(tokens)
		results['set_total_words'] = len(sorted(set(tokens)))


		# Normalization
		# Remove one char punctuation, numerals, send all strings to lower case, and 
		# remove stopwords. Imports normalize_text_from_tokens from normalize 

		normalized_text = normalize_text_from_tokens(tokens, all_stopwords)

		results['total_words_normalized'] = len(normalized_text)
		results['set_total_words_normalized'] = len(sorted(set(normalized_text)))

		# Generate Freqeuency Distribution and 50 Most Common 
		# Imports generate_freqdist_from_normalized_text from freqdist
		freq_dist = generate_freqdist_from_normalized_text(normalized_text, results['speaker'])

		results['fifty_most_common'] = freq_dist['fifty_most_common']
		results['frequency_distribution'] = freq_dist['freq_dist']

		with open(path + '/' + file_name + '-result.json', 'wb') as outfile:
			json.dump(results, outfile)


