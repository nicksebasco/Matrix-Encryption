# Matrix-Encryption

A module for encrypting strings via matrix multiplication.  

<h3>Process:</h3>

1. The message *a string* is transformed into an array of words, which are in turn transformed into integer sequences corresponding the  position of there respective letters in the alphabet.  
2. The integer sequences are concatenated and broken up into a randomly selected number of rows which are then stored in an (m x n) matrix, <strong>A</strong>.  
3. Next, an (n x n) matrix <strong>B</strong>, is generated and used as a cipher which will encode matrix <strong>A</strong> via multiplication.  


This module uses functions from the *lodash* and *mathjs* libraries to abstract away the basic linear algebra and array transformations associated with this process.  Make sure both *lodash* and *mathjs* are installed before running this script.  Currently the script only encrypts alphabet characters (a-z), numbers and special characters will be deleted from the original message.
