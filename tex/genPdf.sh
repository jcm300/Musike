#!/bin/bash

pdflatex -shell-escape main.tex
biber main
pdflatex -shell-escape main.tex

rm main.aux main.bbl main.bcf main.blg main.log main.out main.run.xml
rm -r _minted-main
