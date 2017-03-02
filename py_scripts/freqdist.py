import nltk
def generate_freqdist_from_normalized_text(normalized_text, speaker):

	results_object = {'freq_dist': '',
					  'fifty_most_common': ''};

	text = nltk.Text(normalized_text)
	freq_dist = nltk.FreqDist(normalized_text)

	# convert to dicts for conversion to json 
	new_list = []
	for word,freq in freq_dist.iteritems():
		new_word = {'word': word, 
					'frequency': freq, 
					'speaker': speaker, 
					'length': len(word)
					}
		new_list.append(new_word)


	new_list_common_fifty = []

	for word, freq in freq_dist.most_common(50):
		
		concordance = text.concordance(word)

		new_word = {'word': word, 
					'frequency': freq, 
					'speaker': speaker, 
					'length': len(word), 
					'concordance': concordance
					}
		new_list_common_fifty.append(new_word)

	results_object['freq_dist'] = new_list	
	results_object['fifty_most_common'] = new_list_common_fifty

	return results_object