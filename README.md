# 2016 Presidential Debate Analysis 
This project uses the NLTK Python library to analyze natural language samples from the 2016 Presidential Debates between Hillary Clinton and Donald Trump.

### Sources
Luckily there was a great source for the debate transcripts, [The American Presidency Project](http://www.presidency.ucsb.edu/debates.php) out of UCSB. I couldn't find a place to download the files, so I manually copied and pasted them into .txt files for processing. 

### Methodology and Visualization
For more information on the methodology used for this analysis, I'll post additional info on my blog highlighting the steps I took to normalize the text, which included stripping out stop words and other textual features specific to the transcripts used. 

The visualizations will be completed using d3 once I get all the Python structure working. 

#### Reusability 
This is not the first time I've undertaken a frequency analysis of this type before, and frankly I've gotten tired of having to rewrite Python code to do some of these really simple things in NLTK, so this project is a small step towards reusability. I've written the Python program in such a way that you should be able to take just those files, pass the `script.py` file a directory name, and it will normalize, analyze, and report in json format for all of the .txt files in that directory (error handling notwithstanding) 
