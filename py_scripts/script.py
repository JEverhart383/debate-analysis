import nltk, io, sys, json
from nltk import word_tokenize, wordpunct_tokenize
from normalize import *
from freqdist import *
from generatejson import *
from customstopwords import *


speaker_directory = sys.argv[1]


generate_json_results(speaker_directory)


# Initialize Results JSON
results = {	'speaker': speaker_directory, 
			'fifty_most_common': ' ', 
			'frequency_distribution': '', 
			'total_words' : '',
			'total_words_normalized' : ''
			}

# Get File and Read Raw Text 
file = io.open('./clinton/clinton-debate2.txt', 'r', encoding='utf8')
raw = file.read()

# Set Stopwords here and add own
# remove_custom_stopwords module expects a UTF8 list 

all_stopwords = remove_custom_stopwords((u'the', u'solo'))


# Tokenize raw input 
tokens = wordpunct_tokenize(raw)
results['total_words'] = len(tokens)


# Normalization
# Remove one char punctuation, numerals, send all strings to lower case, and 
# remove stopwords. Imports normalize_text_from_tokens from normalize 

normalized_text = normalize_text_from_tokens(tokens, all_stopwords)

results['total_words_normalized'] = len(normalized_text)

# Generate Freqeuency Distribution and 50 Most Common 
# Imports generate_freqdist_from_normalized_text from freqdist
freq_dist = generate_freqdist_from_normalized_text(normalized_text, results['speaker'])

results['fifty_most_common'] = freq_dist['fifty_most_common']
results['frequency_distribution'] = freq_dist['freq_dist']

with open('clinton-debate2-result.json', 'wb') as outfile:
	json.dump(results, outfile)







