# PDF-Downloader

This is a Google Chrome Extension that automates downloading PDFs from websites that don't nomrally allow for downloading them such as ebscohost and eblib.

*Note*: this only downloads the PDFs and many websites separate books into an individual PDF for each page so compiling them after downloading is up to the user.

*Note*: if the PDF has restrictions other than opening the document, you can use [ghostscript](http://ghostscript.com/) to get rid of them with the following command `gswin64c.exe -q -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile="output.pdf" -c .setpdfwrite -f "input.pdf"`

###Currently Supported Websites
-EBSCOhost.com
-EBLib.com
