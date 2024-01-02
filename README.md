To setup:
In root directory of this project, move a "ratings.csv" file from your letterboxd export. 

To make list from a ratings filter, run the following: 
$ npm run ratingsFilter

To make a list from all films, not including rewatches, in a given year, run the following: 
$ npm run yearEndListMaker

(EXPERIMENTAL) To compare two lists such that one list marks how items have changed:
First, move your two lists to compare into the "comparisonFiles folder". Make sure the newer list is alphabetically named after the older list. 
Then, run the following:
$ npm run compareLists
Your list with added descriptions is created with the name "comparison.csv" in the newLists folder

To use the file created: 
Create a list on letterboxd, use the import option, and upload the .csv file written by this program

